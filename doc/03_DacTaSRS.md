# ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS - Software Requirements Specification)

## 1. Giới thiệu

Tài liệu này cung cấp mô tả chi tiết các yêu cầu kỹ thuật và chức năng của Hệ thống Thương Mại Điện Tử định chuẩn, thiết kế cho đồ án môn Công Nghệ Phần Mềm bởi Nhóm Thủy Lợi N5.

## 2. Môi trường hệ thống / Công nghệ áp dụng

Dự án được triển khai dựa trên hệ sinh thái **MERN Stack** (MongoDB, Express, React, Node.js). Đây là nền tảng công nghệ phổ biến giúp đồng nhất ngôn ngữ học Javascript ở toàn bộ các lớp (cả Frontend và Backend) của một dự án lớn, giúp tối ưu thời gian phát triển.

Lý do lựa chọn **MERN Stack**:

- **JavaScript xuyên suốt:** Toàn bộ stack được viết bằng một ngôn ngữ JavaScript/TypeScript. Việc chia sẻ kiến thức giữa Frontend dev và Backend dev dễ dàng hơn, tận dụng lại code/các module utility.
- **Tính phi logic (Non-blocking I/O) trên Node.js:** Giao tiếp rất tốt trong mô hình hệ thống bán hàng đa giao dịch (I/O intensive) hơn các nền tảng cũ. Xử lý nhiều kết nối trong khi không hao tốn tài nguyên quá nhiều.
- **JSON đi cùng Mongoose/MongoDB:** Luồng di chuyển dữ liệu thông suốt, uyển chuyển (JSON từ Client UI -> Server Parser -> Document Database Schema) giúp bỏ qua khâu mapping bảng biểu cồng kềnh như ở CSDL Quan hệ.
- **ReactJS SPA (Single Page Application):** Thay vì nạp đi nạp lại trang, ReactJS tạo trải nghiệm rất mượt mà trong các thao tác mua hàng.
- **Hệ Sinh Thái khổng lồ của NPM:** Rất nhiều gói tiện ích về xử lý ảnh, encode, auth hỗ trợ đắc lực tích hợp nhánh nhanh chóng.

Các công nghệ phụ trợ chính:

- **Frontend Stack (Mặt tiền người dùng):** ReactJS, Redux Toolkit, React Query (quản lý trạng thái dữ liệu ngầm mà không làm đơ giao diện), Ant Design (Bộ khung thiết kế nút bấm/bảng biểu đẹp mắt), Recharts (Thư viện chuyên vẽ biểu đồ báo cáo).
- **Backend Stack (Bộ não máy chủ):** Node.js, ExpressJS v4, JWT Authentication (Hệ thống khóa cửa bằng thẻ từ ảo - JsonWebToken), Bcrypt (Kỹ thuật băm nát và mã hóa mật khẩu để hacker không đọc được chữ gốc).
- **Cơ sở dữ liệu:** Hệ quản trị CSDL Document-based MongoDB (Lưu dữ liệu dạng văn bản tự do), kết hợp với ORM Mongoose (Công cụ "chuyển ngữ" dịch từ dữ liệu Mongo sang mã Code Node.js).

## 3. Quy trình phát triển (Software Process Model)

Là môn học Công Nghệ Phần Mềm nhấn mạnh vào Quy trình (Process), nhóm N5 đã áp dụng **Mô hình Agile / Scrum** cho dự án lần này, bao gồm các Sprint ngắn tính bằng tuần.

Lý do lựa chọn **Agile Scrum**:

- **Khả năng đối phó với sửa đổi yêu cầu liên tục:** Đồ án có các Phase phát triển với mức độ thay đổi UI/UX nhiều lần trong suốt quá trình hoàn thiện đồ án mà không bị hạn chế như Waterfall.
- **Chuyển tải giá trị sớm sớm ra sản phẩm (Deliver early):** Nhóm phân chia Phase 1 với các chức năng đủ chu trình mua hàng làm MVP (Minimum Viable Product). Nếu thời gian cho phép, Sprint tiếp theo sẽ bao thầu báo cáo, chart..
- **Cải thiện làm việc nhóm (Teamwork):** Cho phép các thành viên Frontend / Backend làm việc độc lập qua phân công công việc (Task Assignment) nhưng vẫn khớp được nối API nhờ các Daily meeting check API.

## 4. Yêu cầu chức năng (Functional Requirements)

### 4.1 Giai Đoạn 1 (Phase 1)

- **FR_01 (Xác thực / Cấp quyền - Auth):** Hệ thống có cơ chế xác thực JWT qua 2 token rào chắn: AccessToken (Vé vào cửa ngắn hạn - 1 giờ) và RefreshToken (Vé đổi dài hạn - 30 ngày). Mật khẩu hoàn toàn là mã hóa hash một chiều chuẩn bcrypt trước khi ghim vào database nên kể cả kĩ sư thiết kế cũng không tự đọc được mật khẩu khách hàng.
- **FR_02 (Quản lý Giỏ hàng):** Giỏ hàng được quản lý theo dạng lưu lượng ở máy người dùng (Local state và Redux Store), cập nhật số lượng realtime giảm thiểu tình trạng giật lag, tránh việc mỗi lần ấn "+" tăng số lượng lại phải gửi tín hiệu qua lại máy chủ quá nhiều lần.
- **FR_03 (Quản trị Sản phẩm):** Tính năng nghiệp vụ cho phép Admin thực hiện đầy đủ luồng Tạo mới, Danh sách, Sửa thông tin, Xóa. Hình ảnh sản phẩm được hỗ trợ mã hóa định dạng chuẩn để dễ dàng truy xuất tại máy trạm.
- **FR_04 (Quy trình Đặt hàng):** Xác nhận thanh toán từ User sẽ tự động dọn sạch giỏ hàng hiện tại. Đơn hàng sinh ra được hệ thống tự động ghi nhận thời gian chính xác tới từng giây (`createdAt` / `updatedAt`) cho mục đích truy vết hàng hóa sau này và vẽ báo cáo thống kê.
- **FR_05 (Dashboard / Biểu đồ):** Máy chủ tự tính toán doanh thu (Revenue) thông qua bộ lọc thông minh (Chỉ tính đơn đã mua `isPaid=true`) phối hợp với bộ công cụ Recharts bên phía giao diện (React Client) nhằm hiển thị dưới dạng biểu đồ cột, biểu đồ tròn theo linh hoạt các khung thời gian: Ngày, tuần, tháng.
- **FR_06 (Trích xuất dữ liệu):** Quyền thao tác Export (Xuất báo cáo) cho Admin, cho phép trích xuất các đơn hàng ở dạng lưới và tải xuống file Excel (.XLSX) chuẩn chỉnh giúp thuận tiện mở trên Office máy tính để trình sếp/nhà đầu tư.

### 4.2 Giai Đoạn 2 (Phase 2 - Mở rộng tương lai)

- **FR_07 (Social Reviews):** Bổ sung Collection `ReviewModel` khóa ngoại trỏ tới `Product` và `User`, yêu cầu validation chỉ cho phép submit đánh giá lúc `Order` (đơn hàng) xác thực đã thành công.
- **FR_08 (Coupon / Vouchers engine):** Xây dựng bộ Engine Voucher tự động kiểm tra tham số: Code tồn tại, Ngày hết hạn, Số lượng Capacity. Áp dụng Middleware tính lại TotalPrice Checkout.
- **FR_09 (Event Emailing):** Gọi Nodemailer tự động bắt event kích hoạt gửi mã xác nhận OTP / Hoá đơn gửi thẳng đến email khách hàng (via SMTP Transport) tại các trigger trên backend.

## 5. Yêu cầu phi chức năng (Non-Functional Requirements)

Tất cả các yêu cầu phi chức năng được định lượng cụ thể qua các chỉ số cam kết chất lượng dịch vụ (Service Level Agreement - SLA):

- **Hiệu năng (Performance / Latency):**
  - **Thời gian phản hồi (Response Time):** Tải trang danh mục sản phẩm mất **< 2.5 giây** cho 95% lượng user truy cập (95th percentile). API tra cứu đơn hàng trả kết quả trong **< 500ms**.
  - **Tối ưu Web:** Web sử dụng React Query để fetch và cache dữ liệu, giảm thiểu thừa API Requests; Lazy load hình ảnh để tiết kiệm băng thông.
  - **Tải trọng (Load Capacity):** Chịu được tối đa **500 CCU** (Concurrent Users) cùng lúc truy cập mà không rớt mạng.
- **Bảo mật (Security):**
  - Toàn bộ secret strings và database string connections (tên biến là `Mongo_DB`), JWT Key giấu kín trong environment variables `.env`.
  - Endpoint của admin chặn kỹ lưỡng qua Authorization header và Check Role middleware `isAdmin`. Mật khẩu băm bằng Bcrypt với cost factor tối thiểu là `10`.
- **Khả năng mở rộng (Scalability & Maintainability):**
  - Backend triển khai Controller - Service Pattern rõ ràng, lỏng lẻo hóa sự phụ thuộc (Loose Coupling).
  - Có thể containerization dự án bằng Docker (Dockerize) để scale ngang nhiều node trên môi trường Cloud thuần túy.
- **Thân thiện người dùng (UX / Usability):**
  - Đạt điểm > 80/100 trên Google Lighthouse Test cho hạng mục Accessibility và Best Practices. Giao diện Responsive hoạt động tốt trên Mobile (kích thước màn hình tối thiểu 375px) và Desktop.

## 6. Dự tính mức độ tải và dung lượng hệ thống (System Sizing)

Dự toán tài nguyên (Sizing) nhằm đảm bảo hệ thống duy trì tính sẵn sàng cao không bị gián đoạn, tối ưu chi phí hạ tầng trong giai đoạn đầu và có thể tự động co giãn (Auto-scaling) ở giai đoạn sau.

**1. Sizing theo Lượng truy cập (Traffic & Computing CPU/RAM):**

- **Traffic dự kiến:** Trung bình 5.000 - 10.000 lượt truy cập/ngày (DAU). Khung giờ cao điểm (Peak Time) chịu tải được khoảng 500 CCU đồng thời.
- **Tùy chọn Server Backend:** Node.js chạy dạng non-blocking. Cấu hình đề xuất tối thiểu 1 vCPU, 2GB RAM cho máy chủ Ứng dụng.
- **Băng thông mạng (Bandwidth):** Lớp giao diện (Frontend React) được đóng gói và đặt tại Edge CDN của nền tảng Vercel giúp giảm hao tổn băng thông tĩnh, phân tải máy chủ gốc (Origin Server).

**2. Sizing theo Dung lượng lưu trữ (Database & Media Storage):**

- **Dữ liệu dạng văn bản (MongoDB JSON Storage):** Lưu hồ sơ User, log Giao dịch đơn hàng, Catalog Sản phẩm. MongoDB Atlas gói 512MB - 1GB là đủ để chứa đến hàng chục nghìn lượt mua sắm mới mỗi tháng, vì JSON text cực kỳ tiết kiệm bộ nhớ.
- **Dữ liệu tập tin lớn (Media lưu trữ hình ảnh):**
  - Thay vì lưu thẳng ảnh sản phẩm vào Database khiến máy chủ DB nặng, các file ảnh (Banners, Sản phẩm) tải lên qua hệ thống lưu trữ đối tượng bên thứ ba, điển hình là Cloudinary chuyên dụng.
  - Sizing ước chừng với kho 5.000 sản phẩm (mỗi cái 2-3 ảnh), sử dụng chuẩn nén `.WebP` size ~150kb, chi phí lưu trữ ảnh dao động ở mức 2GB - 5GB giai đoạn đầu tiên xây dựng.

## 7. Ma trận truy xuất nguồn gốc (Traceability Matrix)

Ma trận dưới đây thể hiện sự liên kết chặt chẽ giữa Yêu cầu chức năng (FR) và các luồng Use Case cụ thể (UC) được định nghĩa ở Giai đoạn 1:

| ID Yêu Cầu (FR) | Tên Yêu Cầu Chức Năng | Liên kết Use Case (UC) | Phân hệ (Module) |
|---|---|---|---|
| FR_01 | Xác thực / Cấp quyền - Auth | UC-U01, UC-U02, UC-A01 | Hệ thống & Bảo mật |
| FR_02 | Quản lý Giỏ hàng | UC-U06, UC-U07 | Trải nghiệm mua sắm |
| FR_03 | Quản trị Sản phẩm | UC-A02, UC-A03, UC-A04, UC-A05 | Hàng hóa - Kho |
| FR_04 | Quy trình Đặt hàng | UC-U08, UC-U09, UC-A06 | Bán hàng (Sales) |
| FR_05 | Dashboard / Biểu đồ | UC-A07, UC-A08 | Kế toán - Báo cáo |
| FR_06 | Trích xuất dữ liệu | UC-A09 | Kế toán - Báo cáo |

## 7. Bảng Từ điển Thuật ngữ (Glossary)

Để đảm bảo các bên liên quan (Khách hàng, Lập trình viên, Tester) có chung một cách hiểu khi đọc tài liệu:

| Thuật ngữ / Viết tắt | Giải nghĩa chi tiết |
|---|---|
| **MERN Stack** | Bộ 4 công nghệ Javascript: MongoDB, ExpressJS, ReactJS, Node.js. |
| **JWT** | JSON Web Token — Chuỗi ký tự mã hóa dùng để xác thực danh tính người dùng sau khi đăng nhập. |
| **MVP** | Minimum Viable Product — Phiên bản sản phẩm tối thiểu, chỉ chứa các tính năng cốt lõi nhất để nhanh chóng tung ra thị trường kiểm chứng. |
| **CCU** | Concurrent Users — Số lượng người dùng truy cập và thao tác đồng thời trên nền tảng tại cùng một thời điểm. |
| **SLA** | Service Level Agreement — Cam kết chất lượng dịch vụ (ví dụ: tốc độ phản hồi phải dưới 2s). |
| **CORS** | Cross-Origin Resource Sharing — Lỗi kỹ thuật chặn truy cập tài nguyên giữa các domain khác nhau. |
| **Bcrypt** | Thuật toán băm mật khẩu ra các chuỗi vô nghĩa để hacker không thể giải mã ngược lại bản rõ. |

---
*(Ghi chú: Sơ đồ Use Case Diagram chi tiết vui lòng xem tại tài liệu `02_DacTaYeuCau_UseCases.md`)*
