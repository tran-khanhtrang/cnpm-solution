# Thủy Lợi N5 eCommerce Project (CNPM Sofware Process Demo Project - Nhóm học viên số 5, Học phần CNPM TLU 2025-2026)

# Người viết: Trần Khánh Trang, 32CNTT21, 218248749

Dự án Hệ thống Thương mại điện tử "Thủy Lợi N5" được xây dựng với React (Frontend) và Node.js + MongoDB (Backend). Dự án đã được tích hợp bộ dữ liệu phong phú cùng với các báo cáo KPI chuyên nghiệp phục vụ cho mục đích Demo và Đánh giá môn học.

## Các tính năng vừa được cập nhật (Bản cập nhật Báo cáo & Dữ liệu Demo)

### 1. Dữ liệu mô phỏng phong phú (Database Seeding)

- **500 Sản phẩm đa dạng:** Bao gồm Laptop, Bàn phím, Chuột, Tai nghe, Điện thoại, Máy tính bảng, PC... của nhiều thương hiệu lớn (ASUS, LOGITECH, APPLE, HP...). Dữ liệu được random đầy đủ giá, cấu hình, và rating bằng script `seed_500.js`.
- **20 Người dùng nội bộ:** Danh sách 20 Users nội trú với số điện thoại, email đa dạng trải dài ở nhiều Tỉnh/Thành nhờ script `seed_users_orders.js`.
- **50 Đơn hàng phân tán thời gian:** Các đơn hàng ngẫu nhiên với phương thức thanh toán phong phú (COD, PayPal, MoMo, Ngân hàng). Thời gian các đơn hàng đã được trải đều từ ngày 01/01/2026 cho đến hiện tại một cách chân thật (`update_order_dates.js`, `update_order_payments.js`).

### 2. Quản lý Hệ thống (Admin Dashboard)

- **Giao diện Quản lý Đơn hàng:** Tách biệt rõ ràng, trình bày dạng bảng sạch sẽ với cột mới bổ sung: "Ngày đặt" (đầy đủ chi tiết ngày giờ).
- **Giao diện Quản lý Người dùng:** Tính năng tự động tổng hợp **Số đơn thành công** và **Tổng tiền thanh toán** của mỗi khách hàng (được tính toán từ dữ liệu `Orders`).
- **Hệ thống Phân hạng thành viên (Membership Tiers):** Hệ thống tự động xét hạng Khách hàng nội bộ dựa trên các mốc chi tiêu của từng Account:
  - Dưới 20 triệu: **Đồng**
  - Từ 20 triệu: **Bạc**
  - Từ 50 triệu: **Vàng**
  - Từ 100 triệu: **Kim cương**
- **Tab Thống kê KPI mới mẻ:** Tạo mới hoàn toàn module đánh giá doanh thu (AdminKPI.jsx/RevenueChart.jsx). Bố cục được căn chỉnh lại toàn diện (Full-view không cuộn chuột):
  - *Biểu đồ Cột (Bar Chart):* Hiển thị Doanh thu với khả năng lọc linh hoạt (Theo ngày, Theo tuần, Theo tháng).
  - *Biểu đồ Tròn (Pie Chart):* Thống kê các Phương thức thanh toán đang được khách hàng ưa chuộng với 4 khối phân mảng rõ ràng.
  - *Biểu đồ Top Customers:* Hiển thị thông tin tổng hợp Top 10 khách hàng có sức mua lớn nhất, tích hợp Sorting "Theo tổng tiền" hoặc "Theo số lượng đơn".
  - *Biểu đồ Top Selling:* Top 5 Sản phẩm bán chạy nhất hệ thống hiển thị cùng hàng ngang giúp tăng trải nghiệm tra cứu cho Admin .

## 📚 Tài liệu dự án (Documentation)

Hệ thống tài liệu đầy đủ được lưu trữ trong thư mục `doc/`. Bạn có thể tham khảo trực tiếp các file Markdown:

1. [Phát biểu bài toán & Khảo sát](doc/01_PhatBieuBaiToan.md) - Tổng quan phạm vi dự án, đối tượng người dùng.
2. [Đặc tả Yêu cầu & Use Cases](doc/02_DacTaYeuCau_UseCases.md) - Sơ đồ Use Case, xác định Actor và luồng nghiệp vụ.
3. [Tài liệu Đặc tả SRS](doc/03_DacTaSRS.md) - Đặc tả Yêu cầu Phần mềm (Software Requirements Specification).
4. [Thiết kế Hệ thống (HLD)](doc/04_ThietKeHLD.md) - Thiết kế tổng thể, kiến trúc và Database Schema.
5. [Quản lý Dự án (Agile/Scrum)](doc/05_QuanLyDuAn_AgileScrum.md) - Ghi chú quá trình Scrum, phân chia Task, Sprint Planning.
6. [Đặc tả Kiểm thử (Testing)](doc/06_DacTaKiemThu.md) - Kế hoạch test, Test cases và chiến lược kiểm thử.
7. [Hướng dẫn Triển khai](doc/07_HuongDanTrienKhai.md) - Hướng dẫn cài đặt, cấu hình môi trường và triển khai Hosting.
8. [Đánh giá & Rút kinh nghiệm](doc/08_DanhGiaVaRutKinhNghiem.md) - Tổng kết dự án, đánh giá rủi ro và bài học kinh nghiệm.
9. [Kịch bản Thuyết trình](doc/09_KichBanSlideTrinhBay.md) - Kịch bản trình bày báo cáo đồ án.

*(Ngoài ra: Có thể xem các bản định dạng Word tại thư mục `doc/docx/` và Slide thuyết trình tại `doc/slides/`)*

## Cài đặt và Khởi chạy

Dự án chia làm 2 thư mục chính là Backend (`be-cnpm`) và Frontend (`fe-cnpm`). Đảm bảo MongoDB của bạn đã được bật ở `127.0.0.1:27017` trước khi chạy.

### Backend (`be-cnpm`)

```bash
cd be-cnpm
npm install
npm start
```

*Backend sẽ chạy tại khanhtrang:3001*

### Frontend (`fe-cnpm`)

```bash
cd fe-cnpm
npm install
npm start
```

*Frontend sẽ chạy tại khanhtrang:3000*. Có thể truy cập chức năng hệ thống thông qua `http://khanhtrang:3000/system/admin`.

*Ghi chú: Để vào được Dashboard quản lý, vui lòng đăng nhập quyền Admin với thông tin mặc định: `trangtk.ftu@gmail.com` | Password: `n5admin@175tayson`.*
