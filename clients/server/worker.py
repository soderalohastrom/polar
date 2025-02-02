import asyncio
from datetime import datetime
from typing import Dict, List

# Mock subscription processing


async def process_subscription(user_id: int, subscription_data: Dict):
    """Simulate subscription processing"""
    print(f"Processing subscription for user {user_id}")
    print(f"Subscription data: {subscription_data}")
    await asyncio.sleep(2)  # Simulate processing time
    print(f"Subscription processed successfully for user {user_id}")
    return True

# Mock payment processing


async def process_payment(payment_data: Dict):
    """Simulate payment processing"""
    print(f"Processing payment: {payment_data}")
    await asyncio.sleep(1)  # Simulate processing time
    print(f"Payment processed successfully: {
          payment_data['amount']} {payment_data['currency']}")
    return True


async def main():
    """Main worker loop"""
    print("Paumalu Plus worker started")
    while True:
        try:
            # Simulate processing test data
            test_subscription = {
                "user_id": 2,
                "plan": "Paumalu Plus",
                "start_date": datetime.now(),
                "end_date": datetime(2025, 12, 31)
            }

            test_payment = {
                "user_id": 2,
                "amount": 99.99,
                "currency": "USD",
                "status": "pending"
            }

            # Process test subscription and payment
            await process_subscription(2, test_subscription)
            await process_payment(test_payment)

            # Wait before next iteration
            await asyncio.sleep(10)
        except Exception as e:
            print(f"Error in worker: {e}")
            await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(main())
