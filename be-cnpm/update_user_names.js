const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/UserModel");
const Order = require("./src/models/OrderProduct");

dotenv.config();

const names = [
    "Phan Mạnh Chung", "Lê Thị Thu Hà", "Nguyễn Đức Hạnh", "Nguyễn Minh Hiệp",
    "Ngô Hữu Huy", "Lê Ngọc Huyền", "Trần Đăng Khoa", "Đinh Văn Linh",
    "Nguyễn Lê Nguyên", "Nguyễn Thảo Nguyên", "Nguyễn Thuỳ Ninh", "Vũ Ngọc Phan",
    "Tạ Minh Quang", "Vũ Đức Thắng", "Bùi Thanh Thủy", "Phạm Thị Thanh Thủy",
    "Nguyễn Thương", "Phùng Khắc Toàn", "Trần Khánh Trang", "Nguyễn Thanh Tùng",
    "Lê Thị Mỹ Dung", "Hoàng Đức Dũng", "Nguyễn Giang Đông", "Vũ Anh Đức",
    "Lê Quý Hiếu", "Đàm Văn Luận", "Nguyễn Hồng Sơn", "Nguyễn Thanh Tâm",
    "Bùi Thị Hồng Thắm", "Trịnh Thị Hoài Thu", "Nguyễn Tuấn Vũ", "Bùi Tuấn Anh",
    "Bùi Văn Cải", "Ngô Tiến Đạt", "Đặng Mạnh Hiền", "Phạm Ngọc Huy",
    "Nguyễn Chu Kiên", "Phan Trần Hồng Long", "Nguyễn Danh Long", "Nguyễn Xuân Lộc",
    "Nguyễn Hải Nam", "Quách Giang Nam", "Hoàng Thị Ngát", "Cao Thị Mai Phương",
    "Lê Văn Quân", "Vũ Hồng Quân", "Vương Thị Quyên", "Nguyễn Hồng Sơn",
    "Trịnh Thái Sơn", "Ngô Đức Tâm", "Vương Anh Tuấn"
];

const updateNames = async () => {
    try {
        const dbUri = process.env.Mongo_DB || "mongodb://127.0.0.1:27017/ecommerce";
        console.log(`Connecting to ${dbUri}...`);
        await mongoose.connect(dbUri);

        const users = await User.find({ isAdmin: false });
        console.log(`Found ${users.length} users to update.`);

        for (let i = 0; i < users.length; i++) {
            const newName = names[i % names.length];
            const user = users[i];

            // Update User name
            user.name = newName;
            await user.save();

            // Update shippingAddress.fullName in all orders of this user
            await Order.updateMany(
                { user: user._id },
                { $set: { "shippingAddress.fullName": newName } }
            );
        }

        console.log("Successfully updated names for users and their orders.");
        process.exit(0);
    } catch (error) {
        console.error("Error updating names:", error);
        process.exit(1);
    }
};

updateNames();
