# Payment API (`/api/payments` & `/api/payment`)

> **Auth Required:** All endpoints (except the webhook) require a valid JWT cookie.

## 1. Create Payment (Stripe Checkout)
- **Endpoint:** `POST /api/payments/create`
- **Description:** Creates a Stripe Checkout session for a confirmed rental order. Returns a `sessionUrl` to redirect the customer to Stripe's payment page. The order must be in `CONFIRMED` status before payment can be initiated.
- **Request Body:**
  ```json
  {
    "rentalOrderId": "cmr8order001",
    "method": "STRIPE"
  }
  ```
  > Only `"STRIPE"` is supported as the payment method.

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Payment intent created successfully",
    "data": {
      "payment": {
        "id": "cmr8pay001",
        "customerId": "cmr8cust001",
        "rentalOrderId": "cmr8order001",
        "transactionId": "cs_test_a1S4b5Ypp...",
        "amount": 250.00,
        "method": "STRIPE",
        "status": "PENDING",
        "paidAt": null,
        "createdAt": "2026-07-08T14:00:00.000Z",
        "updatedAt": "2026-07-08T14:00:00.000Z"
      },
      "sessionId": "cs_test_a1S4b5Ypp...",
      "sessionUrl": "https://checkout.stripe.com/c/pay/cs_test_..."
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (order not found)
  ```json
  {
    "success": false,
    "message": "Rental order not found",
    "data": {}
  }
  ```
  - `500 Internal Server Error` (not your order)
  ```json
  {
    "success": false,
    "message": "You are not authorized to pay for this order",
    "data": {}
  }
  ```
  - `500 Internal Server Error` (payment already exists)
  ```json
  {
    "success": false,
    "message": "Payment already exists for this rental order",
    "data": {}
  }
  ```
  - `500 Internal Server Error` (order not confirmed yet)
  ```json
  {
    "success": false,
    "message": "Order must be confirmed before payment",
    "data": {}
  }
  ```

---

## 2. Stripe Webhook (Confirm Payment)
- **Endpoint:** `POST /api/payment/confirm`
- **Description:** Stripe webhook endpoint to confirm payment. Called automatically by Stripe — **not called by the client**. Requires the raw request body and the `stripe-signature` header for signature verification. On `checkout.session.completed`, updates payment status to `COMPLETED` and rental order status to `PAID`. On `checkout.session.expired`, updates payment status to `FAILED`.
- **Headers:**
  ```
  stripe-signature: t=...,v1=...
  Content-Type: application/json
  ```
- **Request Body:** Raw Stripe event payload (Buffer)

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Webhook processed successfully",
    "data": {
      "received": true,
      "type": "checkout.session.completed"
    }
  }
  ```

- **Possible Errors:**
  - `400 Bad Request` (missing signature)
  ```json
  {
    "success": false,
    "message": "Missing stripe-signature header",
    "data": {}
  }
  ```
  - `400 Bad Request` (invalid signature)
  ```json
  {
    "success": false,
    "message": "Webhook signature verification failed: ...",
    "data": {}
  }
  ```

---

## 3. Get My Payment History
- **Endpoint:** `GET /api/payments`
- **Description:** Get all payments made by the logged-in customer, ordered by newest first.
- **Request Body:** None

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Payment history retrieved successfully",
    "data": [
      {
        "id": "cmr8pay001",
        "customerId": "cmr8cust001",
        "rentalOrderId": "cmr8order001",
        "transactionId": "pi_3abc...",
        "amount": 250.00,
        "method": "STRIPE",
        "status": "COMPLETED",
        "paidAt": "2026-07-08T14:30:00.000Z",
        "createdAt": "2026-07-08T14:00:00.000Z",
        "updatedAt": "2026-07-08T14:30:00.000Z",
        "rentalOrder": {
          "id": "cmr8order001",
          "customerId": "cmr8cust001",
          "gearItemId": "cmr8abc123",
          "quantity": 2,
          "status": "PAID",
          "startDate": "2026-07-10T00:00:00.000Z",
          "endDate": "2026-07-15T00:00:00.000Z",
          "totalAmount": 250.00,
          "gearItem": {
            "id": "cmr8abc123",
            "name": "Trek Mountain Bike",
            "brand": "Trek",
            "rentalPrice": 25.00
          }
        }
      }
    ]
  }
  ```

---

## 4. Get Payment Details
- **Endpoint:** `GET /api/payments/:id`
- **Description:** Get a specific payment by its ID. Only the customer who made the payment can view it.
- **URL Params:** `id` — payment ID

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Payment details retrieved successfully",
    "data": {
      "id": "cmr8pay001",
      "customerId": "cmr8cust001",
      "rentalOrderId": "cmr8order001",
      "transactionId": "pi_3abc...",
      "amount": 250.00,
      "method": "STRIPE",
      "status": "COMPLETED",
      "paidAt": "2026-07-08T14:30:00.000Z",
      "createdAt": "2026-07-08T14:00:00.000Z",
      "updatedAt": "2026-07-08T14:30:00.000Z",
      "rentalOrder": {
        "id": "cmr8order001",
        "customerId": "cmr8cust001",
        "gearItemId": "cmr8abc123",
        "quantity": 2,
        "status": "PAID",
        "startDate": "2026-07-10T00:00:00.000Z",
        "endDate": "2026-07-15T00:00:00.000Z",
        "totalAmount": 250.00,
        "gearItem": {
          "id": "cmr8abc123",
          "name": "Trek Mountain Bike",
          "brand": "Trek",
          "rentalPrice": 25.00
        }
      }
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (payment not found)
  ```json
  {
    "success": false,
    "message": "Payment not found",
    "data": {}
  }
  ```
  - `500 Internal Server Error` (not your payment)
  ```json
  {
    "success": false,
    "message": "You are not authorized to view this payment",
    "data": {}
  }
  ```
