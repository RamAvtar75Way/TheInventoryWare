# TheInventoryWare - Modern Inventory Management System

A comprehensive, responsive, and modern inventory management dashboard built with React, TypeScript, and Tailwind CSS. This system allows businesses to track stock, manage warehouses, view analytics, and handle inventory operations efficiently.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎥 Video Submission

[**Click here to watch the demo video**](https://drive.google.com/file/d/1gJa4qC_2E8uv3VnFzevCUv7M7ihvhsBq/view?usp=sharing)

## 🚀 Features

-   **Dashboard Overview**: Real-time insights into total inventory, low stock items, and warehouse distribution.
-   **Inventory Management**:
    -   Add, Edit, and Delete products.
    -   Advanced filtering (category, price range, warehouse).
    -   Search functionality.
    -   Bulk actions and CSV Export.
-   **Stock Monitoring**: Visual indicators for low stock and out-of-stock items with reorder suggestions.
-   **Warehouse Management**: Filter inventory by location and view warehouse-specific metrics.
-   **Reports & Analytics**: Interactive charts (Area, Bar) using Recharts to visualize sales and stock trends.
-   **Authentication**: Secure login and signup flow, including Google Authentication support.
-   **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
-   **Dockerized**: Production-ready Docker setup with Nginx.

## 🛠 Type Stack

-   **Framework**: [React](https://reactjs.org/) (v18)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (Auth), [TanStack Query](https://tanstack.com/query/latest) (Server State)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation
-   **Charts**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## ⚙️ Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   Docker (optional, for containerized deployment)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/inventory-dashboard.git
    cd inventory-dashboard
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory (copy from `.env.example` if available):
    ```env
    VITE_API_URL=http://localhost:3000/api
    VITE_GOOGLE_CLIENT_ID=your-google-client-id
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🐳 Docker Setup

This project includes a multi-stage Docker build optimized for production.

### Build and Run with Docker Compose

1.  **Build and Start**
    ```bash
    docker-compose up -d --build
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

2.  **Stop Containers**
    ```bash
    docker-compose down
    ```

### Manual Docker Build

1.  **Build Image**
    ```bash
    docker build -t inventory-web .
    ```

2.  **Run Container**
    ```bash
    docker run -p 3000:80 inventory-web
    ```

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Login/Signup forms & layouts
│   ├── dashboard/     # Dashboard widgets & cards
│   ├── inventory/     # Product tables, filters, forms
│   ├── layout/        # Sidebar, Header, Layout wrappers
│   ├── ui/            # Generic UI elements (Button, Modal, Input)
├── hooks/             # Custom React hooks (useInventory, useAuth)
├── pages/             # Route pages (Dashboard, Products, Reports)
├── services/          # API services & mock data
├── store/             # Redux store slices
├── styles/            # Global styles & variants
├── types/             # TypeScript interfaces
└── App.tsx            # Main application entry
```

## 📜 Scripts

-   `npm run dev`: Start development server.
-   `npm run build`: Build for production.
-   `npm run lint`: Run ESLint.
-   `npm run preview`: Preview production build locally.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
