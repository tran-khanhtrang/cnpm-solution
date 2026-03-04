# ĐẶC TẢ YÊU CẦU NGƯỜI DÙNG (USE CASES)

## 1. Danh sách Tác nhân (Actors)

- **Khách hàng vãng lai (Guest):** Người dùng truy cập website nhưng chưa có tài khoản hoặc chưa đăng nhập.
- **Khách hàng (User):** Người dùng đã đăng ký tài khoản cấu hình thông tin cá nhân và đăng nhập thành công.
- **Quản trị viên (Admin):** Người đứng sau hệ thống, có quyền điều hành và quản lý thay đổi nội dung dữ liệu kinh doanh.

## 2. Danh sách Use Case - Giai đoạn 1 (Phase 1)

### 2.1. Nhóm chức năng Khách hàng (User)

| Mã UC | Tên Use Case | Mô tả |
|-------|--------------|-------|
| UC-U01 | Đăng ký tài khoản | Đăng ký với email, mật khẩu |
| UC-U02 | Đăng nhập | Đăng nhập bằng tài khoản và mật khẩu |
| UC-U03 | Xem danh sách SP | Hiển thị tất cả các sản phẩm có trên gian hàng |
| UC-U04 | Tìm kiếm & Lọc SP | Nhập từ khóa để tìm sản phẩm hoặc lọc nâng cao theo danh mục / giá |
| UC-U05 | Xem chi tiết SP | Hiển thị hình ảnh, giá, mô tả sản phẩm |
| UC-U06 | Thêm vào giỏ hàng | Thêm sản phẩm vào giỏ, tùy chỉnh số lượng |
| UC-U07 | Xem giỏ hàng | Xem và chỉnh sửa danh sách sản phẩm sắp mua |
| UC-U08 | Đặt hàng (Checkout) | Nhập thông tin giao hàng và xác nhận mua hàng |
| UC-U09 | Xem lịch sử đơn hàng | Theo dõi các đơn hàng đã đặt và trạng thái |
| UC-U10 | Xem trang Giới thiệu | Xem thông tin về nhóm phát triển Thủy Lợi N5, techstack hiện thị |

### 2.2. Nhóm chức năng Quản trị (Admin)

| Mã UC | Tên Use Case | Mô tả |
|-------|--------------|-------|
| UC-A01 | Quản lý Người dùng | Xem danh sách user, xóa hoặc cấp quyền tài khoản |
| UC-A02 | Thêm Sản phẩm mới | Đăng tải sản phẩm mới lên gian hàng kèm hình ảnh, giá bán, số lượng tồn kho (Create) |
| UC-A03 | Xem danh sách SP | Hiển thị bảng tổng hợp toàn bộ sản phẩm đang bán, kiểm tra trạng thái tồn kho (Read) |
| UC-A04 | Cập nhật Sản phẩm | Chỉnh sửa lại giá tiền, hình ảnh hoặc các mô tả của một sản phẩm bất kỳ (Update) |
| UC-A05 | Xóa Sản phẩm | Gỡ bỏ hoàn toàn một sản phẩm khỏi cửa hàng nếu không còn kinh doanh (Delete) |
| UC-A06 | Quản lý Đơn hàng | Xem danh sách đơn, xem chi tiết và cập nhật trạng thái đơn duyệt |
| UC-A07 | Xem Báo cáo Dashboard | Xem màn hình KPI, biểu đồ doanh thu theo các tab Ngày/Tuần/Tháng |
| UC-A08 | Xem Top Sản phẩm | Biểu đồ hiển thị thống kê cụ thể các sản phẩm đang bán chạy nhất |
| UC-A09 | Xuất Data Hóa đơn | Trích xuất dữ liệu hóa đơn/đơn hàng ra file Excel để báo cáo nội bộ |

## 3. Danh sách Use Case - Giai đoạn 2 (Phase 2 - Mở rộng tương lai)

### 3.1. Các chức năng mở rộng cho Khách hàng

- **UC-U11 (Đánh giá & Bình luận):** Khách hàng đã mua hàng thành công có thể rate từ 1-5 sao và để lại review vào sản phẩm tương ứng.
- **UC-U12 (Gợi ý sản phẩm đồ họa):** Website tự động gợi ý thêm sản phẩm cùng danh mục khi người dùng xem detail page.
- **UC-U13 (Sử dụng Voucher):** Áp dụng mã giảm giá lúc Checkout để giảm tổng tiền hóa đơn thanh toán.
- **UC-U14 (Đăng nhập MXH):** Tích hợp Google OAuth/Facebook SSO (Công nghệ xác thực một chạm cho phép dùng tài khoản Facebook/Google hiện vào website luôn mà không cần gõ mật khẩu đăng ký mới).
- **UC-U15 (Nhận Email thông báo):** Khách hàng nhận hoá đơn điện tử qua email tự động khi giao dịch thành công.

### 3.2. Các chức năng mở rộng cho Admin

- **UC-A10 (Cảnh báo Tồn kho):** Nhận được alert cảnh báo nguy cơ hết hàng khi số lượng sản phẩm nhập kho ở ngưỡng thấp.
- **UC-A11 (Quản lý Khuyến mãi/Vouchers):** Khả năng tùy chỉnh tạo mã voucher giảm giá, giới hạn hạn mức người sử dụng và ngày hết hạn.
- **UC-A12 (Phân quyền nâng cao Role-Based):** Admin được chia nhỏ phân quyền chức năng riêng lẻ (Ví dụ: Super Admin điều hành mọi thứ, Order Manager chỉ check đơn...).
- **UC-A13 (Chat trực tuyến hỗ trợ):** Có pop-up kết nối để tư vấn khách hàng ngay lập tức.
