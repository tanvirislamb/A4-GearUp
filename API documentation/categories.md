# Categories API (`/api/categories`)

## 1. Get All Categories
- **Endpoint:** `GET /api/categories`
- **Description:** Retrieve all gear categories. No authentication required.
- **Request Body:** None

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Categories fetched successfully",
    "data": [
      {
        "id": "cmr8cat001",
        "name": "Bikes",
        "description": "All types of bikes",
        "createdAt": "2026-07-05T14:00:00.000Z",
        "updatedAt": "2026-07-05T14:00:00.000Z"
      },
      {
        "id": "cmr8cat002",
        "name": "Camping Gear",
        "description": "Tents, sleeping bags, and more",
        "createdAt": "2026-07-05T14:00:00.000Z",
        "updatedAt": "2026-07-05T14:00:00.000Z"
      }
    ]
  }
  ```
