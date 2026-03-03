const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String },
        discount: { type: Number },
        selled: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

// Tích hợp Soft-Delete (Thùng rác & Audit Trails - Ghi nhận thời gian xoá)
productSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all' // Ghi đè phương thức delete mặc định thành soft-delete
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
