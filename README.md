# E-Commerce Project (CNPM Solution)

Dự án Hệ thống Thương mại điện tử (E-Commerce) được xây dựng với React (Frontend) và Node.js + MongoDB (Backend). Dự án đã được tích hợp bộ dữ liệu phong phú cùng với các báo cáo KPI chuyên nghiệp phục vụ cho mục đích Demo và Đánh giá môn học.

## Các tính năng vừa được cập nhật (Bản cập nhật Báo cáo & Dữ liệu Demo)

### 1. Dữ liệu mô phỏng phong phú (Database Seeding)

- **500 Sản phẩm đa dạng:** Bao gồm Laptop, Bàn phím, Chuột, Tai nghe, Điện thoại, Máy tính bảng, PC... của nhiều thương hiệu lớn (ASUS, LOGITECH, APPLE, HP...). Dữ liệu được random đầy đủ giá, cấu hình, và rating bằng script `seed_500.js`.
- **20 Người dùng nội bộ:** Danh sách 20 Users nội trú với số điện thoại, email đa dạng trải dài ở nhiều Tỉnh/Thành nhờ script `seed_users_orders.js`.
- **50 Đơn hàng phân tán thời gian:** Các đơn hàng ngẫu nhiên với phương thức thanh toán phong phú (COD, PayPal, MoMo, Ngân hàng). Thời gian các đơn hàng đã được trải đều từ ngày 01/01/2026 cho đến hiện tại một cách chân thật (`update_order_dates.js`, `update_order_payments.js`).

### 2. Quản lý Hệ thống (Admin Dashboard)

- **Giao diện Quản lý Đơn hàng:** Tách biệt rõ ràng, trình bày dạng bảng sạch sẽ với cột mới bổ sung: "Ngày đặt" (đầy đủ chi tiết ngày giờ).
- **Tab Thống kê KPI mới mẻ:** Tạo mới hoàn toàn module đánh giá doanh thu (AdminKPI.jsx/RevenueChart.jsx).
  - *Biểu đồ Cột (Bar Chart):* Hiển thị Doanh thu với khả năng lọc linh hoạt (Theo ngày, Theo tuần, Theo tháng).
  - *Biểu đồ Tròn (Pie Chart):* Thống kê các Phương thức thanh toán đang được khách hàng ưa chuộng với 4 khối phân mảng rõ ràng.

## Cài đặt và Khởi chạy

Dự án chia làm 2 thư mục chính là Backend (`be-cnpm`) và Frontend (`fe-cnpm`). Đảm bảo MongoDB của bạn đã được bật ở `127.0.0.1:27017` trước khi chạy.

### Backend (`be-cnpm`)

```bash
cd be-cnpm
npm install
npm start
```

*Backend sẽ chạy tại localhost:3001*

### Frontend (`fe-cnpm`)

```bash
cd fe-cnpm
npm install
npm start
```

*Frontend sẽ chạy tại localhost:3000*. Có thể truy cập chức năng hệ thống thông qua `http://localhost:3000/system/admin`.

*Ghi chú: Để vào được Dashboard quản lý, vui lòng đăng nhập quyền Admin với thông tin mặc định: `admin@gmail.com` | Password: `admin`.*
