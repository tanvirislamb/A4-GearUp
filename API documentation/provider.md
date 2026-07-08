# Provider API (`/api/provider`)

> **Auth Required:** All endpoints require a valid JWT cookie.
> **Role Required:** `PROVIDER`

## 1. Create Gear
- **Endpoint:** `POST /api/provider/gear`
- **Description:** Create a new gear listing. Only accessible by providers.
- **Request Body:**
  ```json
  {
    "name": "Trek Mountain Bike",
    "description": "High-performance mountain bike for trails",
    "brand": "Trek",
    "image": "https://example.com/bike.jpg",
    "rentalPrice": 25.00,
    "stock": 5,
    "availableQty": 5,
    "categoryId": "cmr8cat001"
  }
  ```
  > `image` is optional.

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Gear created successfully",
    "data": {
      "id": "cmr8abc123",
      "name": "Trek Mountain Bike",
      "description": "High-performance mountain bike for trails",
      "brand": "Trek",
      "image": "https://example.com/bike.jpg",
      "rentalPrice": 25.00,
      "stock": 5,
      "availableQty": 5,
      "providerId": "cmr7uzkdz0000slylzyv4bsys",
      "categoryId": "cmr8cat001",
      "createdAt": "2026-07-08T14:00:00.000Z",
      "updatedAt": "2026-07-08T14:00:00.000Z",
      "catagory": {
        "id": "cmr8cat001",
        "name": "Bikes",
        "description": "All types of bikes"
      },
      "provider": {
        "id": "cmr7uzkdz0000slylzyv4bsys",
        "name": "Tanvir Islam",
        "email": "tanvir@gmail.com"
      }
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (not a provider)
  ```json
  {
    "success": false,
    "message": "You are not authorized to create gear",
    "data": {}
  }
  ```

---

## 2. Update Gear
- **Endpoint:** `PUT /api/provider/gear/:id`
- **Description:** Fully update a gear item. Only the provider who created it can update it.
- **URL Params:** `id` — gear item ID
- **Request Body:**
  ```json
  {
    "name": "Trek Mountain Bike Pro",
    "description": "Updated description",
    "brand": "Trek",
    "image": "https://example.com/bike2.jpg",
    "rentalPrice": 30.00,
    "stock": 10,
    "availableQty": 8,
    "categoryId": "cmr8cat001"
  }
  ```

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Gear updated successfully",
    "data": {
      "id": "cmr8abc123",
      "name": "Trek Mountain Bike Pro",
      "description": "Updated description",
      "brand": "Trek",
      "image": "https://example.com/bike2.jpg",
      "rentalPrice": 30.00,
      "stock": 10,
      "availableQty": 8,
      "providerId": "cmr7uzkdz0000slylzyv4bsys",
      "categoryId": "cmr8cat001",
      "createdAt": "2026-07-08T14:00:00.000Z",
      "updatedAt": "2026-07-08T15:00:00.000Z"
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (gear not found or not authorized)
  ```json
  {
    "success": false,
    "message": "Gear not found",
    "data": {}
  }
  ```
  ```json
  {
    "success": false,
    "message": "You are not authorized to update this gear",
    "data": {}
  }
  ```

---

## 3. Delete Gear
- **Endpoint:** `DELETE /api/provider/gear/:id`
- **Description:** Delete a gear item. Only the provider who created it can delete it.
- **URL Params:** `id` — gear item ID
- **Request Body:** None

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Gear deleted successfully"
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error`
  ```json
  {
    "success": false,
    "message": "No gear found",
    "data": {}
  }
  ```
  ```json
  {
    "success": false,
    "message": "You are not authorized to delete this gear",
    "data": {}
  }
  ```

---

## 4. Get Provider Orders
- **Endpoint:** `GET /api/provider/orders`
- **Description:** Get all rental orders for gear listed by the logged-in provider.
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
        "customer": {
          "name": "Arafat Islam",
          "email": "arafat@gmail.com"
        },
        "gearItem": {
          "name": "Trek Mountain Bike",
          "brand": "Trek",
          "rentalPrice": 25.00,
          "image": "https://example.com/bike.jpg"
        }
      }
    ]
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (not a provider)
  ```json
  {
    "success": false,
    "message": "You are not authorized to access this resource",
    "data": {}
  }
  ```

---

## 5. Update Order Status
- **Endpoint:** `PATCH /api/provider/orders/:id`
- **Description:** Update the status of a rental order. Only the provider who owns the gear can update the status.
- **URL Params:** `id` — rental order ID
- **Request Body:**
  ```json
  {
    "status": "CONFIRMED"
  }
  ```
  > Valid statuses: `PLACED`, `CONFIRMED`, `PAID`, `PICKED_UP`, `RETURNED`, `CANCELLED`

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Order status updated successfully",
    "data": {
      "id": "cmr8order001",
      "customerId": "cmr8cust001",
      "gearItemId": "cmr8abc123",
      "quantity": 2,
      "status": "CONFIRMED",
      "startDate": "2026-07-10T00:00:00.000Z",
      "endDate": "2026-07-15T00:00:00.000Z",
      "totalAmount": 250.00
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error`
  ```json
  {
    "success": false,
    "message": "You can't update this",
    "data": {}
  }
  ```
