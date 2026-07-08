# Authentication API (`/api/auth`)

## 1. Register User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user as Customer or Provider (Customer as default)
- **Request Body:**
  ```json
  {
    "name" : "Arafat Islam",
    "email": "arafat@gmail.com",
    "password" : "123456"
    }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
        "id": "cmrc6e1l1000004l8m8r09non",
        "email": "arafat@gmail.com",
        "name": "Ararfat Islam",
        "role": "CUSTOMER",
        "status": "ACTIVE",
        "createdAt": "2026-07-08T14:31:00.230Z",
        "updatedAt": "2026-07-08T14:31:00.230Z"
    }
  }
  ```
- **Possible Errors:**
  - `500 Internal Server Error` (if data doesn't provided correctly)
  ```json
  {
    "success": false,
    "message": "data and salt arguments required",
    "data": {}
  }
  ```
  - `409 Conflict` (when user already exists)
  ```json
  {
    "success": false,
    "message": "User already exists",
    "data": {} 
    }
  ```
  - `409 Conflict` (no one can register as admin)
  ```json
  {
    "success": false,
    "message": "You cannot register as an admin",
    "data": {}
  }
  ```

## 2. Login User
- **Endpoint:** `POST /api/auth/login`
- **Description:** Let user login.
- **Request Body:**
  ```json
  {
    "email":"tanvir@gmail.com",
    "password":"123456"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
        "id": "cmr7uzkdz0000slylzyv4bsys",
        "email": "tanvir@gmail.com",
        "name": "Tanvir Islam",
        "role": "CUSTOMER",
        "status": "ACTIVE",
        "createdAt": "2026-07-05T14:00:44.279Z",
        "updatedAt": "2026-07-05T14:00:44.279Z"
    }
  }
  ```

- **Possible Errors:**
  - `404 Not found` (wrong email)
  ```json
  {
    "success": false,
    "message": "User not found",
    "data": {}
  }
  ```

  - `404 Not Found` (wrong password)
```json
  {
    "success": false,
    "message": "Wrong password",
    "data": {}
 }
```

## 3. Get Current User Profile
- **Endpoint:** `GET /api/auth/me`
- **Description:** Fetch logged in user
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "User fetched successfully",
    "data": {
        "id": "cmr7uzkdz0000slylzyv4bsys",
        "email": "tanvir@gmail.com",
        "name": "Tanvir Islam",
        "role": "CUSTOMER",
        "status": "ACTIVE",
        "createdAt": "2026-07-05T14:00:44.279Z",
        "updatedAt": "2026-07-05T14:00:44.279Z"
    }
  }
  ```