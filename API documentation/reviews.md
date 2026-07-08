# Reviews API (`/api/reviews`)

> **Auth Required:** All endpoints require a valid JWT cookie.

## 1. Submit a Review
- **Endpoint:** `POST /api/reviews`
- **Description:** Submit a review for a gear item. The logged-in customer must have an existing rental order for the gear item and that order must have a status of `RETURNED` before a review can be submitted. Rating must be an integer between 1 and 5.
- **Request Body:**
  ```json
  {
    "gearItemId": "cmr8abc123",
    "rating": 5,
    "comment": "Amazing bike, very well maintained!"
  }
  ```
  > `comment` is optional.

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Review submitted successfully",
    "data": {
      "id": "cmr8rev001",
      "customerId": "cmr8cust001",
      "gearItemId": "cmr8abc123",
      "rating": 5,
      "comment": "Amazing bike, very well maintained!",
      "createdAt": "2026-07-08T14:00:00.000Z"
    }
  }
  ```

- **Possible Errors:**
  - `500 Internal Server Error` (no rental found for this gear item)
  ```json
  {
    "success": false,
    "message": "You have not rented this item",
    "data": {}
  }
  ```
  - `500 Internal Server Error` (item not returned yet)
  ```json
  {
    "success": false,
    "message": "You must return the item before giving a review",
    "data": {}
  }
  ```
  - `500 Internal Server Error` (invalid rating)
  ```json
  {
    "success": false,
    "message": "Rating must be an integer between 1 and 5",
    "data": {}
  }
  ```
