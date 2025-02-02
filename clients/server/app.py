from fastapi import FastAPI, HTTPException, Depends, Header
from datetime import datetime
from typing import Dict, List, Optional
import uvicorn

app = FastAPI()

# Import test data
TEST_USERS = [
    {"id": 1, "name": "Alice", "email": "alice@example.com", "is_subscribed": False},
    {"id": 2, "name": "Bob", "email": "bob@example.com", "is_subscribed": True},
]

TEST_SUBSCRIPTIONS = [
    {
        "user_id": 2,
        "plan": "Paumalu Plus",
        "start_date": datetime(2025, 1, 1),
        "end_date": datetime(2025, 12, 31)
    },
]

# Premium features
PREMIUM_FEATURES = {
    "ai_analysis": {
        "name": "AI Analysis",
        "description": "Advanced AI-powered data analysis",
        "endpoint": "/v1/premium/ai-analysis"
    },
    "priority_support": {
        "name": "Priority Support",
        "description": "24/7 priority customer support",
        "endpoint": "/v1/premium/support"
    },
    "custom_exports": {
        "name": "Custom Exports",
        "description": "Advanced data export capabilities",
        "endpoint": "/v1/premium/exports"
    }
}


async def verify_subscription(authorization: Optional[str] = Header(None)):
    """Verify user's subscription status"""
    if not authorization:
        raise HTTPException(
            status_code=401, detail="Authorization header missing")

    # In real life, this would verify the JWT token
    # For demo, we'll use user_id from the header
    try:
        user_id = int(authorization)
        user = next((u for u in TEST_USERS if u["id"] == user_id), None)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        if not user["is_subscribed"]:
            raise HTTPException(
                status_code=403, detail="Paumalu Plus subscription required")
        return user
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization")


@app.get("/")
async def root():
    return {"message": "Paumalu Plus API"}


@app.get("/v1/checkout-links/{checkout_id}/redirect")
async def checkout_redirect(checkout_id: str):
    """Simulate checkout redirect for testing"""
    return {
        "checkout_id": checkout_id,
        "status": "success",
        "redirect_url": "http://localhost:3032/success"
    }


@app.get("/v1/subscriptions/{user_id}")
async def get_subscription(user_id: int):
    """Get subscription status for a user"""
    user = next((u for u in TEST_USERS if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    subscription = next(
        (s for s in TEST_SUBSCRIPTIONS if s["user_id"] == user_id), None)
    return {
        "user": user,
        "subscription": subscription,
        "is_active": user["is_subscribed"]
    }


@app.get("/v1/premium/features")
async def list_premium_features(user: dict = Depends(verify_subscription)):
    """List all available premium features"""
    return {
        "user": user,
        "features": PREMIUM_FEATURES
    }


@app.get("/v1/premium/ai-analysis")
async def ai_analysis(user: dict = Depends(verify_subscription)):
    """Example premium feature: AI Analysis"""
    return {
        "feature": "AI Analysis",
        "status": "active",
        "user": user,
        "sample_analysis": {
            "data_points": 1000,
            "insights": ["Trend A", "Pattern B", "Correlation C"],
            "confidence": 0.95
        }
    }


@app.get("/v1/premium/support")
async def priority_support(user: dict = Depends(verify_subscription)):
    """Example premium feature: Priority Support"""
    return {
        "feature": "Priority Support",
        "status": "active",
        "user": user,
        "support": {
            "priority_level": "high",
            "response_time": "< 1 hour",
            "support_channels": ["chat", "email", "phone"]
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
