# CLO-SET CONNECT Store Page

A scalable, maintainable, and modular React + Redux Toolkit application for the CLO-SET CONNECT Store Page ([https://connect.clo-set.com/store](https://connect.clo-set.com/store)).

## 🚀 Features

- **Content List**: Responsive grid of product cards with image, title, user, and pricing info
- **Filtering**: Filter by pricing option (Paid, Free, View Only), price range (slider), and keyword search
- **Sorting**: Sort by item name, higher price, or lower price
- **Infinite Scroll**: Loads more items as you scroll
- **Skeleton UI**: Loading skeletons for smooth UX
- **State Persistence**: Filter/search state persists via URL query params (no browser storage)
- **Service Worker**: Caches product images for faster loads and offline support
- **Image Optimization**: Responsive images, lazy loading, and error handling
- **Mobile-First Design**: Fully responsive for all device sizes
- **Testing**: Unit and integration tests with React Testing Library & Jest

## 🛠️ Tech Stack

- **React** (with TypeScript)
- **Redux Toolkit** (state management)
- **CSS Modules** (scoped styling)
- **rc-slider** (price range slider)
- **query-string** (URL state sync)
- **Jest** & **React Testing Library** (testing)
- **Service Worker** (image caching)

## 📦 Getting Started

### 1. **Clone the repository**
```bash
git clone <your-repo-url>
cd clo-set-connect-store
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Run the app locally**
```bash
npm run dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal)

### 4. **Run tests**
```bash
npm test
```

## 📝 Project Structure

```
├── public/
│   └── service-worker.js      # Service worker for image caching
├── src/
│   ├── api/                  # API wrapper for fetching content
│   ├── components/           # Reusable UI components
│   ├── features/             # Redux slices, thunks, selectors
│   ├── store/                # Redux store setup
│   ├── types/                # TypeScript types
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Entry point (service worker registration)
├── package.json
├── README.md
└── ...
```

## 🧩 Key Implementation Details

- **Redux Toolkit** for state management (filters, search, sorting, pagination, price range)
- **URL Query Parameters** for state persistence (no localStorage/sessionStorage)
- **Service Worker** caches all product images (cache-first strategy)
- **Image Optimization**: Responsive `<img>` with `loading="lazy"`, `srcSet`, and error fallback
- **Responsive Design**: Grid and filter bar adapt to all screen sizes
- **Testing**: Includes tests for all major components and features

## 🛡️ How to Customize
- Update API endpoint in `src/api/contentsApi.ts` if needed
- Adjust grid breakpoints in `InfiniteScrollGrid.module.css` for custom layouts
- Add more filters or features in Redux slices/components

## 📝 What We Did
- Built a modular, scalable React + Redux app from scratch
- Implemented all required and optional features:
  - Pricing option filter, reset, and persistence
  - Keyword search (combinable with filters)
  - Responsive grid with infinite scroll
  - Sorting and price slider (optional features)
  - Skeleton UI for loading
  - Service worker for image caching
  - Image optimization on render
  - Full test suite and robust error handling
- Ensured accessibility and mobile-first design

## 📄 License
MIT (or your preferred license)
