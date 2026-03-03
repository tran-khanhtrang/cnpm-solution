const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const Order = require("./models/OrderProduct");

dotenv.config();

const usersData = [];
const cities = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Nha Trang"];

for (let i = 1; i <= 20; i++) {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    usersData.push({
        name: `Khách Hàng ${i}`,
        email: `khachhang${i}@gmail.com`,
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
        phone: Math.floor(Math.random() * 800000000) + 100000000,
        address: `Đường số ${i}, Phường ${Math.floor(Math.random() * 10) + 1}, ${randomCity}`,
        city: randomCity
    });
}

const seedUsersAndOrders = async () => {
    try {
        const dbUri = process.env.Mongo_DB || "mongodb://127.0.0.1:27017/ecommerce";
        console.log(`Connecting to ${dbUri}...`);
        await mongoose.connect(dbUri);

        console.log("Emptying old Users (except admin) and Orders...");
        await User.deleteMany({ isAdmin: false });
        await Order.deleteMany({});

        console.log("Seeding Users...");
        const createdUsers = await User.insertMany(usersData);

        console.log("Fetching some products to create orders...");
        const products = await Product.find().limit(100);

        if (products.length === 0) {
            console.log("No products found! Please run seed_500.js first.");
            process.exit(1);
        }

        console.log("Seeding Orders...");
        const ordersData = [];
        const paymentMethods = ["cash", "paypal"];

        for (let i = 0; i < 50; i++) {
            const user = createdUsers[Math.floor(Math.random() * createdUsers.length)];

            const numItems = Math.floor(Math.random() * 4) + 1; // 1 to 4 items
            const orderItems = [];
            let itemsPrice = 0;

            for (let j = 0; j < numItems; j++) {
                const product = products[Math.floor(Math.random() * products.length)];
                const amount = Math.floor(Math.random() * 3) + 1; // 1 to 3 items

                orderItems.push({
                    name: product.name,
                    amount: amount,
                    image: product.image,
                    price: product.price,
                    discount: product.discount,
                    product: product._id
                });

                itemsPrice += product.price * amount;
            }

            const shippingPrice = itemsPrice > 5000000 ? 0 : 30000;
            const totalPrice = itemsPrice + shippingPrice;

            ordersData.push({
                orderItems: orderItems,
                shippingAddress: {
                    fullName: user.name,
                    address: user.address,
                    city: user.city,
                    phone: user.phone || 123456789
                },
                paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                totalPrice: totalPrice,
                user: user._id,
                isPaid: Math.random() > 0.5,
                paidAt: Math.random() > 0.5 ? new Date() : null,
                isDelivered: Math.random() > 0.7,
                deliveredAt: Math.random() > 0.7 ? new Date() : null
            });
        }

        await Order.insertMany(ordersData);

        console.log("Data seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedUsersAndOrders();
