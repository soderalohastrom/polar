# Mock Payment Handler for Paumalu Plus

class MockPaymentProcessor:
    """Simulates payment processing for Paumalu Plus."""

    def __init__(self):
        self.payments = []

    def process_payment(self, user_id: int, amount: float, currency: str):
        """Simulates processing a payment."""
        payment = {
            "user_id": user_id,
            "amount": amount,
            "currency": currency,
            "status": "completed",
            "date": "2025-02-02T00:00:00Z",  # Simulated timestamp
        }
        self.payments.append(payment)
        return payment

    def get_payment_status(self, user_id: int):
        """Simulates retrieving payment status for a user."""
        payment = next(
            (p for p in self.payments if p["user_id"] == user_id), None)
        return payment["status"] if payment else "not_found"


# Instantiate the mock payment processor
mock_payment_processor = MockPaymentProcessor()
