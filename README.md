# Coffee R Us — React Admin Showcase

A single-page React application that serves as an admin portal for a coffee e-commerce store. Built as a summative lab demonstrating advanced React patterns.

## Features

| Feature | Detail |
|---|---|
| **Client-side routing** | 4 routes via React Router v6 (`/`, `/shop`, `/products/:id`, `/admin`) |
| **Custom hook** | `useProducts` — encapsulates all data fetching, state, and CRUD logic |
| **Context API** | `ProductContext` + `useProductContext` distributes state app-wide |
| **Standard hooks** | `useState`, `useEffect`, `useMemo`, `useCallback`, `useId`, `useRef` |
| **Live search** | Filters products by name, origin, or description via `useMemo` |
| **GET** | Fetches store info and all products on mount |
| **POST** | Add a new product from the Admin page |
| **PATCH** | Edit a product's price and origin from the Product Detail page |
| **DELETE** | Remove a product from the catalog on the Admin page |
| **Tests** | Vitest + React Testing Library — covers all components and routes |
| **Responsive design** | Mobile-first CSS, matches the mockup design document |

---

## Setup

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install dependencies
```bash
npm install
```

### Run the app (dev mode + backend together)
```bash
npm run dev
```

This runs **both** the Vite dev server (port 5173) and the JSON Server backend (port 4000) concurrently.

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run backend only
```bash
npm run server
```

### Run tests
```bash
npm test
```

---

## Project Structure

```
src/
├── __tests__/          # Vitest test files for every feature
│   ├── NavBar.test.jsx
│   ├── ProductCard.test.jsx
│   ├── ProductForm.test.jsx
│   ├── Products.test.jsx
│   └── Admin.test.jsx
├── components/         # Reusable UI components
│   ├── NavBar.jsx
│   ├── ProductCard.jsx
│   └── ProductForm.jsx
├── context/
│   └── ProductContext.jsx   # React Context + useProductContext hook
├── hooks/
│   └── useProducts.js       # Custom hook — all data & CRUD logic
├── routes/             # Page-level components
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   └── Admin.jsx
├── App.jsx             # Router + provider setup
├── index.css           # Design system (CSS custom properties)
├── main.jsx
└── vitest.setup.js
db.json                 # JSON Server mock backend
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with store info, stats, and workflow overview |
| `/shop` | Shop | Browse all products with live search |
| `/products/:id` | Product Detail | View details and edit price / origin (PATCH) |
| `/admin` | Admin Portal | Add new products (POST) and remove existing ones (DELETE) |

---

## Known Limitations

- JSON Server data resets if `db.json` is replaced. To persist additions across sessions, keep `db.json` in version control.
- No authentication on the admin portal (out of scope for this lab).
- Images are not supported for products in this version.

---

## Deployment (Netlify)

1. `npm run build` — outputs static files to `dist/`
2. Deploy `dist/` to [Netlify](https://netlify.com) via drag-and-drop or the Netlify CLI.
3. Add a `_redirects` file inside `public/` with the content below so React Router works on Netlify:

```
/*    /index.html   200
```

> **Note:** The JSON Server backend is a local mock. For a deployed version, replace it with a real API (e.g. Railway, Render, or Supabase).
