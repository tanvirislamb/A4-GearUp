# Gear API (`/api/gear`)

## 1. Get All Gear
- **Endpoint:** `GET /api/gear`
- **Description:** Retrieve all gear items with optional filters and pagination. No authentication required.
- **Query Parameters (all optional):**
  | Parameter  | Type   | Description                                    |
  |------------|--------|------------------------------------------------|
  | `search`   | string | Search by name, description, or brand          |
  | `catagory` | string | Filter by category name (case-insensitive)     |
  | `brand`    | string | Filter by brand name (case-insensitive)        |
  | `price`    | number | Filter by max rental price (lte)               |
  | `page`     | number | Page number (default: 1)                       |
  | `limit`    | number | Items per page (default: 10)                   |

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Gear retrieved successfully",
    "data": {
      "meta": {
        "page": 1,
        "limit": 10,
        "total": 2,
        "totalPages": 1
      },
      "data": [
        {
          "id": "cmr8abc123",
          "name": "Trek Mountain Bike",
          "description": "High-performance mountain bike for trails",
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
            "name": "Bikes"
          },
          "provider": {
            "id": "cmr7uzkdz0000slylzyv4bsys",
            "name": "Tanvir Islam",
            "email": "tanvir@gmail.com"
          }
        }
      ]
    }
  }
  ```

## 2. Get Gear by ID
- **Endpoint:** `GET /api/gear/:id`
- **Description:** Get a single gear item by its ID, including reviews. No authentication required.
- **URL Params:** `id` — gear item ID

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Gear retrieved successfully",
    "data": {
      "id": "cmr8abc123",
      "name": "Trek Mountain Bike",
      "description": "High-performance mountain bike for trails",
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
      },
      "reviews": [
        {
          "comment": "Great bike!",
          "rating": 5,
          "customer": {
            "id": "cmr8cust001",
            "name": "Arafat Islam",
            "email": "arafat@gmail.com"
          }
        }
      ]
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (gear not found)
  ```json
  {
    "success": false,
    "message": "Gear not found",
    "data": {}
  }
  ```
