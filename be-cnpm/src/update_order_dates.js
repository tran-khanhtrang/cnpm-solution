const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Order = require("./models/OrderProduct");

dotenv.config();

const updateDates = async () => {
    try {
        const dbUri = process.env.Mongo_DB || "mongodb://127.0.0.1:27017/ecommerce";
        console.log(`Connecting to ${dbUri}...`);
        await mongoose.connect(dbUri);

        const orders = await Order.find({});
        console.log(`Found ${orders.length} orders. Updating dates...`);

        const startDate = new Date('2026-01-01T00:00:00Z').getTime();
        const endDate = new Date().getTime();

        for (let order of orders) {
            const randomTime = startDate + Math.random() * (endDate - startDate);
            const randomDate = new Date(randomTime);

            let paidAt = null;
            let deliveredAt = null;

            if (order.isPaid) {
                paidAt = new Date(randomTime + Math.random() * 86400000);
            }
            if (order.isDelivered) {
                deliveredAt = new Date(randomTime + (Math.random() * 4 + 1) * 86400000);
            }

            // Using Mongoose updateOne with options { timestamps: false, strict: false }
            await Order.updateOne(
                { _id: order._id },
                { createdAt: randomDate, updatedAt: randomDate, paidAt: paidAt, deliveredAt: deliveredAt },
                { timestamps: false, strict: false }
            );
        }

        console.log("Successfully randomized order dates from 01/01/2026 to today!");
        process.exit(0);
    } catch (error) {
        console.error("Error updating dates:", error);
        process.exit(1);
    }
};

updateDates();
