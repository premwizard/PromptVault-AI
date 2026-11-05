from fastapi.testclient import TestClient

from app.db.session import get_db
from app.main import app

client = TestClient(app)


class MockDB:
    async def execute(self, query: str) -> None:
        pass


async def override_get_db():
    yield MockDB()


def test_health_check() -> None:
    app.dependency_overrides[get_db] = override_get_db
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["database"] == "connected"
    app.dependency_overrides.clear()
