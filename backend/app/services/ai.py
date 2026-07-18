import os
from pydantic import BaseModel
import instructor
from openai import AsyncOpenAI
from app.core.config import settings

# Initialize instructor with OpenAI async client
# You can swap out the client for other providers (e.g. Anthropic) if they support OpenAI compat
client = instructor.patch(AsyncOpenAI(api_key=settings.OPENAI_API_KEY))

class AIProviderOptions(BaseModel):
    provider: str = "openai"
    model: str = "gpt-4o"
    temperature: float = 0.7
    max_tokens: int = 1500

class AIService:
    @staticmethod
    async def get_embedding(text: str) -> list[float]:
        # Simple text embedding wrapper
        response = await client.embeddings.create(
            input=text,
            model="text-embedding-3-small"
        )
        return response.data[0].embedding
        
    @staticmethod
    async def generate_text(prompt: str, options: AIProviderOptions) -> str:
        # Instructor text generation
        # NOTE: This uses OpenAI format, in real implementation we map 'provider' to the correct client
        response = await client.chat.completions.create(
            model=options.model,
            messages=[{"role": "user", "content": prompt}],
            temperature=options.temperature,
            max_tokens=options.max_tokens,
        )
        return response.choices[0].message.content
        
    @staticmethod
    async def generate_structured(prompt: str, response_model, options: AIProviderOptions):
        # Instructor structured generation using Pydantic models
        response = await client.chat.completions.create(
            model=options.model,
            response_model=response_model,
            messages=[{"role": "user", "content": prompt}],
            temperature=options.temperature,
        )
        return response
