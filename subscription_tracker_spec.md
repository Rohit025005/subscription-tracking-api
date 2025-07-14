# 📦 Subscription Tracker API — Project Specification

## 👤 Auth Type: Multi-user

- Users can register/login
- Each user sees only **their own subscriptions**
- JWT-based authentication

---

## 🎯 Project Scope: Intermediate Backend

Includes:

- Auth (login/signup)
- Subscription CRUD
- Email notifier (real-time + optional background job)
- Rate limiting
- User-specific data access
- Basic analytics (optional)

---

## 🧱 Technologies

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Auth
- Nodemailer for Emails
- Redis (for optional background jobs)
- Bull/BullMQ (optional for job scheduling)

---

## 📄 Models

### 🔹 User

```ts
{
  _id,
  email: String (unique, required),
  password: Hashed String,
  createdAt,
  updatedAt
}
```

### 🔹 Subscription

```ts
{
  _id,
  user: ObjectId (ref: 'User'),
  name: String (e.g., Netflix),
  price: Number,
  renewalDate: Date,
  createdAt,
  updatedAt
}
```

---

## 🔐 Auth Routes

### POST /api/auth/register

- Body: `{ email, password }`
- Creates user, returns JWT

### POST /api/auth/login

- Body: `{ email, password }`
- Returns access token (JWT)

---

## 📦 Subscription Routes (Protected)

### GET /api/subscriptions

- Returns all subscriptions for logged-in user

### GET /api/subscriptions/\:id

- Returns specific subscription (only if owned by user)

### POST /api/subscriptions

- Body: `{ name, price, renewalDate }`
- Creates a subscription for the user
- 💡 Trigger email on create

### PUT /api/subscriptions/\:id

- Updates a subscription (if user owns it)
- 💡 Trigger email on update

### DELETE /api/subscriptions/\:id

- Deletes subscription (if user owns it)

---

## 📧 Email Logic

### 🔹 Option A: Real-time

- On create/update, send confirmation email with name, price, and renewal date

### 🔹 Option B: Background Reminders *(Advanced)*

- Background worker checks every morning
- If any subscription is due tomorrow → send reminder email

---

## 🚧 Middleware

### Auth Middleware

- Verifies JWT, sets `req.user`

### Rate Limiter

- Limit per IP (or per user if advanced)
- Example: 100 requests / 15 min

---

## 📊 Bonus (Optional)

### GET /api/analytics

- Returns:
  - Total subscriptions
  - Total monthly cost
  - Subscriptions due next 7 days

---

## 🗃️ Folder Structure Suggestion

```
subscription-tracker-api/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── jobs/              # For background jobs (if used)
├── config/
├── index.js
└── worker.js          # For BullMQ
```

---

## ✅ Requirements Checklist

-

---

Let me know when to start generating the **separate spec** for stretch goals (brutal-level features).

