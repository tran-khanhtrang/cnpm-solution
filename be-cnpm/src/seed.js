const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Product = require("./models/ProductModel");
const User = require("./models/UserModel");

dotenv.config();

const products = [
    {
        name: "LAPTOP GAMING ASUS ROG STRIX G15",
        image: "https://dlcdnrog.asus.com/rog/media/1615560000345.jpg",
        type: "Laptop",
        price: 32000000,
        countInStock: 10,
        rating: 5,
        description: "LAPTOP GAMING CẤU HÌNH KHỦNG",
        discount: 10,
        selled: 5
    },
    {
        name: "BÀN PHÍM CƠ AKKO 3087 PINK",
        image: "https://akkogear.com.vn/wp-content/uploads/2020/03/akko-3087-pink-01.jpg",
        type: "Bàn phím",
        price: 1500000,
        countInStock: 50,
        rating: 4,
        description: "BÀN PHÍM CƠ GIÁ RẺ CHẤT LƯỢNG",
        discount: 5,
        selled: 20
    },
    {
        name: "CHUỘT CƠ LOGITECH G502 HERO",
        image: "https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g502-hero/g502-hero-gallery-1.png?v=1",
        type: "Chuột",
        price: 1200000,
        countInStock: 100,
        rating: 5,
        description: "CHUỘT GAMING QUỐC DÂN",
        discount: 0,
        selled: 80
    },
    {
        name: "PC GAMING INTEL CORE I9 13900K",
        image: "https://nguyencongpc.vn/media/product/25292-pc-gaming-intel-core-i9-12900k-rtx-3080-10g.jpg",
        type: "PC",
        price: 85000000,
        countInStock: 5,
        rating: 5,
        description: "PC GAMING SIÊU CẤP",
        discount: 15,
        selled: 2
    }
];

const users = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("admin", 10),
        isAdmin: true,
        phone: 123456789,
        address: "Hà Nội",
        city: "Hà Nội"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_DB || "mongodb://127.0.0.1:27017/ecommerce");
        console.log("Connected to MongoDB for seeding...");

        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("Products seeded successfully!");

        await User.deleteMany({ email: "admin@gmail.com" });
        await User.insertMany(users);
        console.log("Admin user seeded successfully!");

        mongoose.connection.close();
        console.log("Seeding completed and connection closed.");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

seedDB();
