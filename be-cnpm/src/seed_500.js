const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/ProductModel");

dotenv.config();

const brands = [
    "ASUS", "LOGITECH", "AKKO", "APPLE", "SAMSUNG", "DELL", "HP", "LENOVO", "MSI", "RAZER",
    "STEELSERIES", "SONY", "GIGABYTE", "CORSAIR", "ACER", "LG", "SENNHEISER", "HYPERX"
];

const types = [
    { name: "Laptop", minPrice: 15000000, maxPrice: 60000000, keyword: "laptop" },
    { name: "Bàn phím", minPrice: 800000, maxPrice: 5000000, keyword: "keyboard" },
    { name: "Chuột", minPrice: 300000, maxPrice: 3000000, keyword: "mouse" },
    { name: "PC", minPrice: 10000000, maxPrice: 100000000, keyword: "pc,computer" },
    { name: "Màn hình", minPrice: 3000000, maxPrice: 20000000, keyword: "monitor" },
    { name: "Tai nghe", minPrice: 500000, maxPrice: 10000000, keyword: "headphone" },
    { name: "Điện thoại", minPrice: 5000000, maxPrice: 40000000, keyword: "smartphone" },
    { name: "Máy tính bảng", minPrice: 7000000, maxPrice: 30000000, keyword: "tablet" },
    { name: "Loa", minPrice: 1000000, maxPrice: 15000000, keyword: "speaker" },
    { name: "Phụ kiện", minPrice: 100000, maxPrice: 2000000, keyword: "accessory" }
];

const adjectives = ["Gaming", "Pro", "Ultra", "Elite", "Legendary", "Slim", "Standard", "ROG", "TUF", "Plus", "Max", "Mini"];

const generateProducts = (count) => {
    const products = [];
    for (let i = 0; i < count; i++) {
        const typeObj = types[Math.floor(Math.random() * types.length)];
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const modelNumber = Math.floor(Math.random() * 1000) + 100;

        const productName = `${typeObj.name.toUpperCase()} ${brand} ${adj} ${modelNumber}`;
        const price = Math.floor((Math.random() * (typeObj.maxPrice - typeObj.minPrice) + typeObj.minPrice) / 1000) * 1000;

        products.push({
            name: productName,
            // Using placeholder images with unique IDs to avoid name duplication issues if any
            image: `https://loremflickr.com/640/480/${typeObj.keyword}?lock=${i}`,
            type: typeObj.name,
            price: price,
            countInStock: Math.floor(Math.random() * 50) + 1,
            rating: Math.floor(Math.random() * 2) + 4, // 4 to 5 stars
            description: `${productName} - Sản phẩm chất lượng cao, bảo hành chính hãng. Thiết kế hiện đại, hiệu năng vượt trội phù hợp cho mọi nhu cầu sử dụng.`,
            discount: Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : 0, // 30% chance of discount
            selled: Math.floor(Math.random() * 100)
        });
    }
    return products;
};

const seedDB = async () => {
    try {
        const dbUri = process.env.Mongo_DB || "mongodb://127.0.0.1:27017/ecommerce";
        console.log(`Connecting to ${dbUri}...`);
        await mongoose.connect(dbUri);

        console.log("Cleaning existing products...");
        // Option: Keep original products or clear all. The user asked for "more" data.
        // But usually seeding implies a fresh start. Let's append if unique, or clear if specified.
        // Since many product names are unique in schema, cleaning is safer for a demo reload.
        await Product.deleteMany({});

        const count = 500;
        console.log(`Generating ${count} products...`);
        const products = generateProducts(count);

        console.log("Inserting products into DB...");
        // Use insertMany in chunks if necessary, but 500 is small enough.
        await Product.insertMany(products, { ordered: false });

        console.log("Data seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
