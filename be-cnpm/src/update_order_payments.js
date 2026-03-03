const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Order = require("./models/OrderProduct");

dotenv.config();

const randomizePayment = async () => {
    try {
        const dbUri = process.env.Mongo_DB || "mongodb://127.0.0.1:27017/ecommerce";
        console.log(`Connecting to ${dbUri}...`);
        await mongoose.connect(dbUri);

        const orders = await Order.find({});
        console.log(`Found ${orders.length} orders. Updating payment methods...`);

        // Các phương thức thanh toán có trên Frontend (constants.js)
        const paymentMethods = ["later_money", "paypal", "bank_transfer", "momo"];

        for (let order of orders) {
            const randomMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

            // Dùng updateOne để ghi đè, tránh làm ảnh hưởng trigger timestamps nếu đang bật
            await Order.updateOne(
                { _id: order._id },
                { paymentMethod: randomMethod },
                { timestamps: false, strict: false }
            );
        }

        console.log("Successfully randomized payment methods for all orders!");
        process.exit(0);
    } catch (error) {
        console.error("Error updating payments:", error);
        process.exit(1);
    }
};

randomizePayment();
