export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    weight: string;
    quantity: number;
    warehouse: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    reorderLevel: number;
    image: string;
    lastUpdated: string;
}

export interface Metric {
    title: string;
    value: string;
    change: number;
    trend: 'up' | 'down';
    data: number[];
}

const CATEGORIES = ['Electronics', 'Clothing', 'Home & Garden', 'Automotive', 'Beauty', 'Sports'];
const WAREHOUSES = ['New York Hub', 'Los Angeles Depot', 'Chicago Center', 'Houston Warehouse', 'Miami Storage'];
const PRODUCT_NAMES = [
    'Wireless Headphones', 'Smart Watch', 'Running Shoes', 'Yoga Mat', 'Coffee Maker',
    'Bluetooth Speaker', 'Laptop Stand', 'Gaming Mouse', 'Mechanical Keyboard', 'Desk Lamp',
    'Cotton T-Shirt', 'Denim Jeans', 'Winter Jacket', 'Sneakers', 'Backpack',
    'Protein Powder', 'Vitamin C', 'Face Serum', 'Shampoo', 'Toothbrush'
];

const generateProducts = (count: number): Product[] => {
    return Array.from({ length: count }, (_, i) => {
        const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        const warehouse = WAREHOUSES[Math.floor(Math.random() * WAREHOUSES.length)];
        const baseName = PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)];
        const name = `${baseName} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 100)}`;
        const price = Math.floor(Math.random() * 500) + 10;
        const quantity = Math.floor(Math.random() * 200);
        const reorderLevel = Math.floor(Math.random() * 20) + 5;

        let status: Product['status'] = 'In Stock';
        if (quantity === 0) status = 'Out of Stock';
        else if (quantity <= reorderLevel) status = 'Low Stock';

        return {
            id: `PROD-${1000 + i}`,
            name,
            sku: `SKU-${10000 + i}`,
            category,
            price,
            weight: `${(Math.random() * 5).toFixed(1)}kg`,
            quantity,
            warehouse,
            status,
            reorderLevel,
            image: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`,
            lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
        };
    });
};

export const MOCK_PRODUCTS = generateProducts(250);

export const MOCK_METRICS: Metric[] = [
    { title: 'Total Stock', value: '18,450', change: 12, trend: 'up', data: [15000, 16000, 15500, 17000, 18000, 18450] },
    { title: 'Low Stock Items', value: '24', change: -5, trend: 'down', data: [40, 35, 30, 28, 25, 24] },
    { title: 'Total Revenue', value: '$124.5k', change: 8, trend: 'up', data: [100, 110, 105, 115, 120, 124.5] },
];
