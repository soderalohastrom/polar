# Test Data for Paumalu Plus
import pytest
from datetime import datetime

# Mock User Data
TEST_USERS = [
    {"id": 1, "name": "Alice", "email": "alice@example.com", "is_subscribed": False},
    {"id": 2, "name": "Bob", "email": "bob@example.com", "is_subscribed": True},
]

# Mock Subscription Data
TEST_SUBSCRIPTIONS = [
    {"user_id": 2, "plan": "Paumalu Plus", "start_date": datetime(
        2025, 1, 1), "end_date": datetime(2025, 12, 31)},
]

# Mock Payment Data
TEST_PAYMENTS = [
    {"user_id": 2, "amount": 99.99, "currency": "USD",
        "status": "completed", "date": datetime(2025, 1, 1)},
]


@pytest.fixture
def mock_users():
    return TEST_USERS


@pytest.fixture
def mock_subscriptions():
    return TEST_SUBSCRIPTIONS


@pytest.fixture
def mock_payments():
    return TEST_PAYMENTS

# Test Cases


def test_paumalu_plus_subscription(mock_users, mock_subscriptions):
    """Test that users with Paumalu Plus subscriptions are correctly identified."""
    user = next((u for u in mock_users if u["id"] == 2), None)
    subscription = next(
        (s for s in mock_subscriptions if s["user_id"] == 2), None)
    assert user is not None
    assert subscription is not None
    assert user["is_subscribed"] == True


def test_paumalu_plus_payments(mock_payments):
    """Test that payments for Paumalu Plus are correctly recorded."""
    payment = next((p for p in mock_payments if p["user_id"] == 2), None)
    assert payment is not None
    assert payment["amount"] == 99.99
    assert payment["status"] == "completed"
