# Rental Orders API (`/api/rentals`)

> **Auth Required:** All endpoints require a valid JWT cookie.

## 1. Place Order
- **Endpoint:** `POST /api/rentals`
- **Description:** Place a new rental order for a gear item. Available stock is automatically decremented.
- **Request Body:**
  ```json
  {
    "gearItemId": "cmr8abc123",
    "quantity": 2,
    "startDate": "2026-07-10T00:00:00.000Z",
    "endDate": "2026-07-15T00:00:00.000Z"
  }
  ```

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Order placed successfully",
    "data": {
      "id": "cmr8order001",
      "customerId": "cmr8cust001",
      "gearItemId": "cmr8abc123",
      "quantity": 2,
      "status": "PLACED",
      "startDate": "2026-07-10T00:00:00.000Z",
      "endDate": "2026-07-15T00:00:00.000Z",
      "totalAmount": 250.00
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (item not found)
  ```json
  {
    "success": false,
    "message": "Item not found",
    "data": {}
  }
  ```
  - `500 Internal Server Error` (not enough stock)
  ```json
  {
    "success": false,
    "message": "Not enough stock",
    "data": {}
  }
  ```

---

## 2. Get My Orders
- **Endpoint:** `GET /api/rentals`
- **Description:** Get all rental orders placed by the logged-in customer.
- **Request Body:** None

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Orders retrieved successfully",
    "data": [
      {
        "id": "cmr8order001",
        "customerId": "cmr8cust001",
        "gearItemId": "cmr8abc123",
        "quantity": 2,
        "status": "PLACED",
        "startDate": "2026-07-10T00:00:00.000Z",
        "endDate": "2026-07-15T00:00:00.000Z",
        "totalAmount": 250.00,
        "gearItem": {
          "id": "cmr8abc123",
          "name": "Trek Mountain Bike",
          "description": "High-performance mountain bike",
          "brand": "Trek",
          "image": "https://example.com/bike.jpg",
          "rentalPrice": 25.00,
          "stock": 5,
          "availableQty": 3,
          "providerId": "cmr7uzkdz0000slylzyv4bsys",
          "categoryId": "cmr8cat001",
          "createdAt": "2026-07-05T14:00:00.000Z",
          "updatedAt": "2026-07-05T14:00:00.000Z"
        }
      }
    ]
  }
  ```

---

## 3. Get Order by ID
- **Endpoint:** `GET /api/rentals/:id`
- **Description:** Get a specific rental order by ID. Only the customer who placed the order can view it.
- **URL Params:** `id` — rental order ID

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Order retrieved successfully",
    "data": {
      "id": "cmr8order001",
      "customerId": "cmr8cust001",
      "gearItemId": "cmr8abc123",
      "quantity": 2,
      "status": "PLACED",
      "startDate": "2026-07-10T00:00:00.000Z",
      "endDate": "2026-07-15T00:00:00.000Z",
      "totalAmount": 250.00,
      "gearItem": {
        "id": "cmr8abc123",
        "name": "Trek Mountain Bike",
        "description": "High-performance mountain bike",
        "brand": "Trek",
        "image": "https://example.com/bike.jpg",
        "rentalPrice": 25.00,
        "stock": 5,
        "availableQty": 3,
        "providerId": "cmr7uzkdz0000slylzyv4bsys",
        "categoryId": "cmr8cat001",
        "createdAt": "2026-07-05T14:00:00.000Z",
        "updatedAt": "2026-07-05T14:00:00.000Z",
        "catagory": {
          "name": "Bikes",
          "description": "All types of bikes"
        },
        "provider": {
          "id": "cmr7uzkdz0000slylzyv4bsys",
          "email": "tanvir@gmail.com",
          "name": "Tanvir Islam",
          "role": "PROVIDER",
          "status": "ACTIVE",
          "createdAt": "2026-07-05T14:00:00.000Z",
          "updatedAt": "2026-07-05T14:00:00.000Z"
        }
      }
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (not your order)
  ```json
  {
    "success": false,
    "message": "You can't access this order!",
    "data": {}
  }
  ```
