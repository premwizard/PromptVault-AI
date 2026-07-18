// Mock Prompts
export const MOCK_PROMPTS = [
  {
    id: '1',
    title: 'SEO Blog Post Writer',
    description: 'Write comprehensive SEO-optimized blog posts with keyword research insights',
    category: 'Writing',
    aiModel: 'GPT-4',
    tags: ['seo', 'blog', 'marketing'],
    content: 'You are a professional SEO blog post writer. Create 2000+ word blog posts that rank highly in search engines...',
    favorited: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    usageCount: 342,
  },
  {
    id: '2',
    title: 'Code Reviewer',
    description: 'Analyze code and provide detailed reviews with suggestions for improvement',
    category: 'Development',
    aiModel: 'Claude 3',
    tags: ['code', 'review', 'development'],
    content: 'You are an expert code reviewer. Analyze the provided code and give constructive feedback...',
    favorited: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-22'),
    usageCount: 521,
  },
  {
    id: '3',
    title: 'Content Ideation',
    description: 'Generate creative content ideas for any niche or industry',
    category: 'Brainstorm',
    aiModel: 'GPT-4',
    tags: ['content', 'ideas', 'creative'],
    content: 'Generate 10 unique and engaging content ideas for the following topic...',
    favorited: false,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18'),
    usageCount: 287,
  },
  {
    id: '4',
    title: 'Product Description Pro',
    description: 'Create compelling product descriptions that convert',
    category: 'Marketing',
    aiModel: 'GPT-3.5',
    tags: ['product', 'description', 'ecommerce'],
    content: 'Write a compelling product description for an ecommerce store...',
    favorited: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-21'),
    usageCount: 198,
  },
  {
    id: '5',
    title: 'Data Analyst Assistant',
    description: 'Analyze data and provide actionable insights',
    category: 'Analysis',
    aiModel: 'Claude 3',
    tags: ['data', 'analysis', 'insights'],
    content: 'Analyze the provided dataset and identify key trends...',
    favorited: false,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-19'),
    usageCount: 445,
  },
  {
    id: '6',
    title: 'Design Brief Generator',
    description: 'Create comprehensive design briefs for creative projects',
    category: 'Design',
    aiModel: 'Gemini Pro',
    tags: ['design', 'brief', 'creative'],
    content: 'Generate a detailed design brief for a new brand identity project...',
    favorited: false,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-20'),
    usageCount: 156,
  },
];

// Mock Collections
export const MOCK_COLLECTIONS = [
  {
    id: 'c1',
    name: 'Marketing Prompts',
    description: 'All prompts related to marketing and content creation',
    icon: 'Rocket',
    promptCount: 12,
    createdAt: new Date('2024-01-01'),
    color: 'blue',
  },
  {
    id: 'c2',
    name: 'Development Tools',
    description: 'Programming and development-focused prompts',
    icon: 'Code',
    promptCount: 8,
    createdAt: new Date('2024-01-02'),
    color: 'purple',
  },
  {
    id: 'c3',
    name: 'Business Analysis',
    description: 'Data and business intelligence prompts',
    icon: 'BarChart3',
    promptCount: 5,
    createdAt: new Date('2024-01-03'),
    color: 'cyan',
  },
  {
    id: 'c4',
    name: 'Creative Writing',
    description: 'Fiction, poetry, and creative writing prompts',
    icon: 'PenTool',
    promptCount: 15,
    createdAt: new Date('2024-01-04'),
    color: 'pink',
  },
];

// Mock User
export const MOCK_USER = {
  id: 'user1',
  name: 'Alex Jordan',
  email: 'alex@promptvault.ai',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  tier: 'Pro',
  joinedAt: new Date('2023-06-15'),
  bio: 'AI enthusiast and prompt engineer',
};

// Mock Statistics
export const MOCK_STATS = {
  totalPrompts: 342,
  favoritePrompts: 28,
  collections: 4,
  usageThisMonth: 1247,
  usageLastMonth: 892,
  saveTimeHours: 156,
};

// Mock Activity
export const MOCK_ACTIVITY = [
  {
    id: 'a1',
    type: 'prompt_created',
    title: 'Created "SEO Blog Post Writer"',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: 'Plus',
  },
  {
    id: 'a2',
    type: 'prompt_favorited',
    title: 'Favorited "Code Reviewer"',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    icon: 'Heart',
  },
  {
    id: 'a3',
    type: 'collection_created',
    title: 'Created collection "Marketing Prompts"',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    icon: 'Folder',
  },
  {
    id: 'a4',
    type: 'prompt_updated',
    title: 'Updated "Data Analyst Assistant"',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    icon: 'Edit',
  },
  {
    id: 'a5',
    type: 'prompt_shared',
    title: 'Shared 3 prompts with team',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    icon: 'Share',
  },
];

// Mock Testimonials
export const MOCK_TESTIMONIALS = [
  {
    id: 't1',
    author: 'Sarah Chen',
    role: 'Content Manager',
    company: 'Tech StartUp Inc',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    quote: 'PromptVault has completely transformed how I create content. My productivity is up 300%!',
    rating: 5,
  },
  {
    id: 't2',
    author: 'Marcus Johnson',
    role: 'Lead Developer',
    company: 'Cloud Systems',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    quote: 'The code review prompts save me hours every week. Highly recommended for any developer.',
    rating: 5,
  },
  {
    id: 't3',
    author: 'Emma Williams',
    role: 'Creative Director',
    company: 'Design Studio Pro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    quote: 'Finally, a prompt library that understands creativity. Absolutely game-changing.',
    rating: 5,
  },
];

// Mock FAQ
export const MOCK_FAQ = [
  {
    id: 'f1',
    question: 'What is PromptVault AI?',
    answer: 'PromptVault AI is a comprehensive prompt library and management system designed to help you create, organize, and share high-quality prompts for AI models. It includes tools for prompt editing, categorization, and analytics.',
  },
  {
    id: 'f2',
    question: 'How do I get started?',
    answer: 'Simply sign up for an account, explore our library of prompts, and start creating your own. You can organize prompts into collections and share them with your team.',
  },
  {
    id: 'f3',
    question: 'Can I use my own custom prompts?',
    answer: 'Absolutely! You can create custom prompts from scratch or use our template system to get started quickly. All prompts are fully customizable.',
  },
  {
    id: 'f4',
    question: 'Is there team collaboration?',
    answer: 'Yes! Pro and Enterprise plans include team collaboration features. Share prompts with teammates, collaborate on edits, and track usage across your team.',
  },
  {
    id: 'f5',
    question: 'What AI models are supported?',
    answer: 'We support GPT-4, GPT-3.5, Claude 3, Gemini Pro, Llama 2, and more. Each prompt can be optimized for different models.',
  },
  {
    id: 'f6',
    question: 'How is my data protected?',
    answer: 'Your data is encrypted both in transit and at rest. We comply with SOC 2 Type II and GDPR standards to ensure maximum security.',
  },
];

// Mock Pricing
export const MOCK_PRICING = [
  {
    id: 'p1',
    name: 'Starter',
    price: 29,
    description: 'Perfect for individuals',
    features: [
      'Up to 100 prompts',
      '5 collections',
      'Basic analytics',
      'Community access',
    ],
    cta: 'Get Started',
  },
  {
    id: 'p2',
    name: 'Pro',
    price: 99,
    description: 'For power users',
    features: [
      'Unlimited prompts',
      'Unlimited collections',
      'Advanced analytics',
      'Team collaboration (3 members)',
      'Priority support',
      'API access',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    id: 'p3',
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Advanced security',
    ],
    cta: 'Contact Sales',
  },
];
