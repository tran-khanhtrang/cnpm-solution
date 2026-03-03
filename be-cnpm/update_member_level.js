const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/UserModel");
const Order = require("./src/models/OrderProduct");

dotenv.config();

const updateMemberLevels = async () => {
    try {
        const dbUri = process.env.Mongo_DB || "mongodb://127.0.0.1:27017/ecommerce";
        console.log(`Connecting to ${dbUri}...`);
        await mongoose.connect(dbUri);

        const users = await User.find({ isAdmin: false });
        console.log(`Found ${users.length} users to update.`);

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const userOrders = await Order.find({ user: user._id, isPaid: true });

            let totalSpent = 0;
            userOrders.forEach(o => totalSpent += o.totalPrice);

            let memberLevel = 'Đồng';
            if (totalSpent >= 100000000) memberLevel = 'Kim cương';
            else if (totalSpent >= 50000000) memberLevel = 'Vàng';
            else if (totalSpent >= 20000000) memberLevel = 'Bạc';

            user.memberLevel = memberLevel;
            await user.save();
        }

        console.log("Successfully updated member levels for all users.");
        process.exit(0);
    } catch (error) {
        console.error("Error updating member levels:", error);
        process.exit(1);
    }
};

updateMemberLevels();
