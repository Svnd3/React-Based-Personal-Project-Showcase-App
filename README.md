# Coffee R Us

A React single-page application for a coffee ecommerce storefront and admin portal. The app includes product browsing, live search, product detail editing, and admin CRUD operations.

## Overview

This project uses:

- React 18 with Vite
- React Router v6 for client-side routing
- A custom hook (`useProducts`) for data fetching and state
- Context API for app-wide product state
- Axios for API requests
- JSON Server for local backend development
- Vitest + React Testing Library for unit tests

## Setup

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

This starts the frontend on `http://localhost:5173` and the local JSON Server backend on `http://localhost:4000`.

### Run backend only

```bash
npm run server
```

### Run tests

```bash
npm test
```

## Deployment

### Frontend deployment

1. Build the app:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to a static host such as Vercel or Netlify.
3. If using Netlify, keep the existing `public/_redirects` file so client-side routing works.

### Backend deployment

The current backend uses `json-server` and is intended for local development only. For production, deploy a real API and configure the frontend environment variable:

- `VITE_API_URL=https://your-backend-url.com`

The app expects the backend to expose these endpoints:

- `GET /store_info`
- `GET /coffee`
- `POST /coffee`
- `PATCH /coffee/:id`
- `DELETE /coffee/:id`

If you do not deploy a backend, the frontend will not be fully functional because it relies on API requests.

## Project structure

```
src/
├── __tests__/          # Vitest test files
│   ├── Admin.test.jsx
│   ├── App.test.jsx
│   ├── NavBar.test.jsx
│   ├── ProductCard.test.jsx
│   ├── ProductForm.test.jsx
│   └── Products.test.jsx
├── components/         # Reusable UI components
│   ├── NavBar.jsx
│   ├── ProductCard.jsx
│   └── ProductForm.jsx
├── context/
│   └── ProductContext.jsx
├── hooks/
│   └── useProducts.js
├── routes/             # Page-level components
│   ├── Admin.jsx
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   └── Products.jsx
├── App.css
├── App.jsx
├── index.css
├── main.jsx
└── vitest.setup.js
db.json                 # Local JSON Server mock data
```

## Pages

| Route           | Page           | Description                      |
| --------------- | -------------- | -------------------------------- |
| `/`             | Home           | Store overview and stats         |
| `/shop`         | Shop           | Browse products with live search |
| `/products/:id` | Product Detail | Edit product price and origin    |
| `/admin`        | Admin          | Add and delete products          |

## Notes

- `db.json` is used only for local development.
- The production deployment should use a real backend service and set `VITE_API_URL` accordingly.
- `npm run dev` runs the frontend and JSON Server together for development.
