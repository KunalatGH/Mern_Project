# Food Delivery Web App

This is a full-stack food delivery application built with **React** (frontend) and **Node.js/Express** (backend). The app allows users to browse food items, add them to cart, manage addresses, and place orders with multiple payment options including Cash on Delivery.

---

## Features

- **User Authentication:** Register, login, password reset, and session management.
- **Product Catalog:** Browse categories, subcategories, and products with images, prices, and discounts.
- **Cart Management:** Add, update, and remove items from the cart.
- **Order Placement:** Place orders with address selection and payment options (Cash on Delivery, Stripe, etc.).
- **Address Management:** Add, edit, and delete delivery addresses.
- **Admin Panel:** (If implemented) Manage products, categories, orders, and users.
- **Responsive Design:** Optimized for desktop and mobile devices.

---

## Folder Structure

```
FInalProject/
│
├── client/                # Frontend (React + Vite)
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Components (Header, CardProduct, Home, etc.)
│   │   ├── common/        # Shared utilities and API configs
│   │   ├── Layout/        # Layout components
│   │   ├── provider/      # Context providers
│   │   ├── routes/        # React Router configuration
│   │   ├── Store/         # Redux store and slices
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│
├── server/                # Backend (Node.js + Express)
│   ├── config/            # DB connection, email, Stripe config
│   ├── controllers/       # Route controllers (address, cart, category, order, etc.)
│   ├── middleware/        # Express middlewares
│   ├── models/            # Mongoose models (User, Product, Order, etc.)
│   ├── route/             # Express route definitions
│   ├── utils/             # Utility functions
│   ├── index.js           # Server entry point
│   ├── package.json       # Backend dependencies
│
├── Readme.md              # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- [Vite](https://vitejs.dev/) (for frontend dev server)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd FInalProject
   ```

2. **Install dependencies:**
   - Frontend:
     ```sh
     cd client
     npm install
     ```
   - Backend:
     ```sh
     cd ../server
     npm install
     ```

3. **Configure environment variables:**
   - Create `.env` files in both `client/` and `server/` folders.
   - Set up MongoDB URI, Stripe keys, and frontend URL in `server/.env`.

4. **Start the servers:**
   - Backend:
     ```sh
     npm start
     ```
   - Frontend:
     ```sh
     cd ../client
     npm run dev
     ```

5. **Open the app:**
   - Visit [http://localhost:5173](http://localhost:5173) (or as shown in terminal) for frontend.

---

## API Endpoints

The backend exposes RESTful endpoints for:

- `/api/user` - User authentication and profile
- `/api/category` - Category management
- `/api/product` - Product management
- `/api/cart` - Cart operations
- `/api/order` - Order placement and history
- `/api/address` - Address management

See [`client/src/common/SummaryAPI.js`](client/src/common/SummaryAPI.js) for frontend API usage.

---

## Technologies Used

- **Frontend:** React, Redux, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose), Stripe, JWT
- **Other:** Cloudinary (image uploads), Helmet, Morgan, Cookie-Parser

---

## Contributing

Feel free to fork and submit pull requests. For major changes, please open an issue first.

---

## License

This project is for educational purposes.

---

## Author

Kunal