# Changelog

This file documents the recent changes made to the subscription tracker application to resolve several issues.

## Fixes and Improvements

### 1. Authentication and Authorization
- **`controllers/authController.js`**: Fixed a critical bug by importing the `User` model, which was causing `ReferenceError` during sign-up and sign-in.
- **`middlewares/authMiddleware.js`**: Created a new middleware to handle JWT-based authorization. This middleware verifies the token and attaches the user to the request object.

### 2. Middleware Configuration
- **`app.js`**:
    - Enabled the `express-rate-limit` middleware (`limiter`) to protect the application from brute-force and denial-of-service attacks.
    - Re-enabled the `arcjetMiddleware` to provide bot detection and additional security.
- **`config/arcjet.js`**: Simplified the import statement for the Arcjet SDK to align with modern best practices.

### 3. Subscription Logic
- **`controllers/subController.js`**: Resolved a `ReferenceError` by defining the `SERVER_URL` variable, which is required for triggering Upstash workflows.
- **`models/subModel.js`**:
    - Added the `frequency` field to the subscription schema, which was missing but used in the `pre('save')` hook.
    - Corrected a logical error in the `pre('save')` hook by changing `newDate()` to `new Date()` for accurate expiration status updates.

### 4. API Routes
- **`routes/subscriptionRoutes.js`**: Implemented the previously empty `GET /` route to allow fetching all subscriptions.
- **`routes/usersRoutes.js`**: Implemented the empty `POST /`, `PUT /:id`, and `DELETE /:id` routes to provide full CRUD functionality for users.
