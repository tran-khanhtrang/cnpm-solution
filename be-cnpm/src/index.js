const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

dotenv.config();
mongoose.set('strictQuery', false);
const app = express();
const port = process.env.PORT || 3001;

// Cấu hình CORS
app.use(cors());

// Cấu hình Middleware của express
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Cấu hình Rate-Limiting: Chống chuỗi Request/DDoS
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 phút
    max: 100, // Tối đa 100 request/1 phút từ 1 IP
    message: 'Quá nhiều yêu cầu từ địa chỉ IP này, xin vui lòng thử lại sau 1 phút.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter); // Áp dụng cho mọi API

// Thiết lập Audit Trails & Logging để ghi lịch sử Server Tracking
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // Xoay vòng file mỗi ngày
    path: path.join(__dirname, '../logs')
});

app.use(morgan('combined', { stream: accessLogStream })); // Log lại tất cả thông tin quan trọng ra file
app.use(morgan('dev')); // Log trên Console để Dev dễ debug

// Định tuyến
routes(app);

// Kết nối MongoDB
mongoose.connect(`${process.env.Mongo_DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connect Db success!');
    })
    .catch((err) => {
        console.log(err);
    });

// Khởi động server
app.listen(port, () => {
    console.log('Server is running on port:', port);
});
