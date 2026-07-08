# Admin API (`/api/admin`)

> **Auth Required:** All endpoints require a valid JWT cookie.
> **Role Required:** `ADMIN`

## 1. Get All Users
- **Endpoint:** `GET /api/admin/users`
- **Description:** Retrieve all users excluding admins.
- **Request Body:** None

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "User fetched successfully",
    "data": [
      {
        "id": "cmr8cust001",
        "email": "arafat@gmail.com",
        "name": "Arafat Islam",
        "role": "CUSTOMER",
        "status": "ACTIVE",
        "createdAt": "2026-07-05T14:00:00.000Z",
        "updatedAt": "2026-07-05T14:00:00.000Z"
      },
      {
        "id": "cmr7uzkdz0000slylzyv4bsys",
        "email": "tanvir@gmail.com",
        "name": "Tanvir Islam",
        "role": "PROVIDER",
        "status": "ACTIVE",
        "createdAt": "2026-07-05T14:00:00.000Z",
        "updatedAt": "2026-07-05T14:00:00.000Z"
      }
    ]
  }
  ```

---

## 2. Update User Status
- **Endpoint:** `PATCH /api/admin/users/:id`
- **Description:** Update a user's status (e.g., suspend or reactivate a user).
- **URL Params:** `id` — user ID
- **Request Body:**
  ```json
  {
    "status": "SUSPENDED"
  }
  ```
  > Valid statuses: `ACTIVE`, `SUSPENDED`

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "User updated successfully",
    "data": {
      "id": "cmr8cust001",
      "email": "arafat@gmail.com",
      "name": "Arafat Islam",
      "role": "CUSTOMER",
      "status": "SUSPENDED",
      "createdAt": "2026-07-05T14:00:00.000Z",
      "updatedAt": "2026-07-08T14:00:00.000Z"
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (user not found)
  ```json
  {
    "success": false,
    "message": "User not found",
    "data": {}
  }
  ```

---

## 3. Get All Gear
- **Endpoint:** `GET /api/admin/gear`
- **Description:** Retrieve all gear items across all providers, including category and provider info.
- **Request Body:** None

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Gear retrieved successfully",
    "data": [
      {
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
    ]
  }
  ```

---

## 4. Get All Rentals
- **Endpoint:** `GET /api/admin/rentals`
- **Description:** Retrieve all rental orders across all customers, including gear item and provider info.
- **Request Body:** None

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Rentals retrieved successfully",
    "data": [
      {
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
          "description": "High-performance mountain bike",
          "brand": "Trek",
          "image": "https://example.com/bike.jpg",
          "rentalPrice": 25.00,
          "stock": 5,
          "availableQty": 3,
          "providerId": "cmr7uzkdz0000slylzyv4bsys",
          "categoryId": "cmr8cat001",
          "provider": {
            "id": "cmr7uzkdz0000slylzyv4bsys",
            "email": "tanvir@gmail.com",
            "name": "Tanvir Islam",
            "role": "PROVIDER",
            "status": "ACTIVE"
          }
        }
      }
    ]
  }
  ```
