# ĐẶC TẢ YÊU CẦU NGƯỜI DÙNG (USE CASES)

## 1. Danh sách Tác nhân (Actors)

- **Khách hàng vãng lai (Guest):** Người dùng truy cập website nhưng chưa có tài khoản hoặc chưa đăng nhập. Có thể xem sản phẩm và thêm vào giỏ hàng cục bộ nhưng không thể thanh toán.
- **Khách hàng (User):** Người dùng đã đăng ký tài khoản cấu hình thông tin cá nhân và đăng nhập thành công. Kế thừa quyền của Guest và có thêm quyền quản lý đơn hàng, thanh toán.
- **Quản trị viên (Admin):** Người đứng sau hệ thống, có quyền điều hành, quản lý thay đổi nội dung dữ liệu kinh doanh (CRUD Sản phẩm, Quản lý User) và theo dõi báo cáo doanh thu.

---

## 2. Product Backlog

Dưới đây là bảng Product Backlog tổng hợp các yêu cầu người dùng dưới dạng User Stories, được sắp xếp theo mức độ ưu tiên để phục vụ lập kế hoạch cho các Sprint trong quy trình Agile Scrum.

| ID | User Story (Câu chuyện người dùng) | Mức ưu tiên | Trạng thái | Tham chiếu |
|:---|:---|:---:|:---:|:---|
| **ST-01** | Là một **Guest**, tôi muốn **xem danh sách & chi tiết sản phẩm**, để tôi có thể tham khảo thông tin trước khi mua. | Cao | Sẵn sàng | UC-U03, UC-U05 |
| **ST-02** | Là một **Guest**, tôi muốn **tìm kiếm & lọc sản phẩm**, để tôi nhanh chóng tìm thấy món đồ mình cần theo nhu cầu. | Trung bình | Sẵn sàng | UC-U04 |
| **ST-03** | Là một **Guest**, tôi muốn **thêm sản phẩm vào giỏ hàng**, để tôi có thể gom nhiều món đồ lại trước khi quyết định mua. | **Rất cao** | Sẵn sàng | UC-U06 |
| **ST-04** | Là một **User**, tôi muốn **đăng ký và đăng nhập**, để tôi có thể bảo mật thông tin cá nhân và thực hiện mua hàng. | **Rất cao** | Sẵn sàng | UC-U01, UC-U02 |
| **ST-05** | Là một **User**, tôi muốn **thực hiện đặt hàng (Checkout)**, để tôi có thể gửi yêu cầu mua hàng đến hệ thống. | **Rất cao** | Sẵn sàng | UC-U08 |
| **ST-06** | Là một **Admin**, tôi muốn **quản lý danh mục sản phẩm (CRUD)**, để tôi luôn cập nhật được các mẫu mã mới và giá cả. | Cao | Sẵn sàng | UC-A02 -> UC-A05 |
| **ST-07** | Là một **Admin**, tôi muốn **xác nhận và quản lý đơn hàng**, để tôi có thể điều phối việc giao hàng cho khách. | **Rất cao** | Sẵn sàng | UC-A06 |
| **ST-08** | Là một **Admin**, tôi muốn **theo dõi biểu đồ doanh thu & KPI**, để tôi nắm bắt được tình hình tăng trưởng của cửa hàng. | Cao | Sẵn sàng | UC-A07, UC-A08 |
| **ST-09** | Là một **User**, tôi muốn **đánh giá & bình luận sản phẩm**, để tôi đóng góp ý kiến và giúp người mua sau tham khảo. | Thấp | Giai đoạn 2 | UC-U11 |
| **ST-10** | Là một **User**, tôi muốn **áp dụng mã giảm giá (Voucher)**, để tôi được hưởng các chương trình ưu đãi từ cửa hàng. | Trung bình | Giai đoạn 2 | UC-U13 |
| **ST-11** | Là một **Admin**, tôi muốn **xuất báo cáo ra file Excel**, để tôi có thể lưu trữ và làm việc với dữ liệu ngoại tuyến. | Trung bình | Sẵn sàng | UC-A09 |
| **ST-12** | Là một **Admin**, tôi muốn **nhận cảnh báo khi tồn kho thấp**, để tôi kịp thời nhập thêm hàng, tránh gián đoạn kinh doanh. | Thấp | Giai đoạn 2 | UC-A10 |

---

## 3. Sơ đồ Use Case (Use Case Diagram)

```mermaid
flowchart LR
    %% Actors
    G((Guest))
    U((User))
    A((Admin))

    %% User Cases
    subgraph "Hệ thống Website Thương Mại Điện Tử Thủy Lợi N5"
        UC_View[Xem danh sách & Chi tiết SP]
        UC_Search[Tìm kiếm & Lọc SP]
        UC_Cart[Quản lý giỏ hàng]
        
        UC_Auth[Đăng nhập / Đăng ký]
        UC_Checkout[Đặt mua hàng]
        UC_History[Xem lịch sử đơn hàng]

        UC_ManageProd[Quản lý Sản phẩm CRUD]
        UC_ManageUser[Quản lý Người dùng]
        UC_ManageOrder[Duyệt Đơn hàng]
        UC_Dashboard[Xem Báo cáo Doanh thu]
    end

    %% Relationships
    G --> UC_View
    G --> UC_Search
    G --> UC_Cart
    G --> UC_Auth

    U -- "Kế thừa" -.-> G
    U --> UC_Checkout
    U --> UC_History

    A --> UC_Auth
    A --> UC_ManageProd
    A --> UC_ManageUser
    A --> UC_ManageOrder
    A --> UC_Dashboard

    %% Includes
    UC_Checkout -. "<<include>>" .-> UC_Auth
```

---

## 4. Danh sách Use Case - Giai đoạn 1 (Phase 1)

### 3.1. Nhóm chức năng Khách hàng vãng lai (Guest - Chưa đăng nhập)

| Mã UC | Tên Use Case | Phân hệ | Mức ưu tiên | Mô tả |
|-------|--------------|---------|-------------|-------|
| UC-U03 | Xem danh sách SP | Cửa hàng | Cao | Hiển thị tất cả các sản phẩm có trên gian hàng |
| UC-U04 | Tìm kiếm & Lọc SP | Cửa hàng | Trung bình | Nhập từ khóa để tìm sản phẩm hoặc lọc nâng cao |
| UC-U05 | Xem chi tiết SP | Cửa hàng | Cao | Hiển thị hình ảnh, giá, mô tả sản phẩm |
| UC-U06 | Thêm vào giỏ hàng cục bộ | Giỏ hàng | **Rất cao** | Thêm sản phẩm vào giỏ, tùy chỉnh số lượng (Không thể checkout) |
| UC-U07 | Xem & Sửa giỏ hàng | Giỏ hàng | Cao | Xem và chỉnh sửa danh sách sản phẩm sắp mua |
| UC-U10 | Xem trang Giới thiệu | Thông tin | Thấp | Xem thông tin về nhóm phát triển Thủy Lợi N5 |

### 3.2. Nhóm chức năng Khách hàng (User - Đã đăng nhập)

*Ghi chú: Khách hàng User được kế thừa toàn bộ các chức năng khám phá và giỏ hàng của Guest.*

| Mã UC | Tên Use Case | Phân hệ | Mức ưu tiên | Mô tả |
|-------|--------------|---------|-------------|-------|
| UC-U01 | Đăng ký tài khoản | Xác thực | Cao | Đăng ký với email, mật khẩu |
| UC-U02 | Đăng nhập | Xác thực | **Rất cao** | Đăng nhập bằng tài khoản và mật khẩu |
| UC-U08 | Đặt hàng (Checkout) | Mua hàng | **Rất cao** | Nhập thông tin giao hàng và xác nhận mua hàng |
| UC-U09 | Xem lịch sử đơn hàng | Mua hàng | Trung bình | Theo dõi các đơn hàng đã đặt và trạng thái |

### 3.3. Nhóm chức năng Quản trị (Admin)

| Mã UC | Tên Use Case | Phân hệ | Mức ưu tiên | Mô tả |
|-------|--------------|---------|-------------|-------|
| UC-A01 | Quản lý Người dùng | Hệ thống | Trung bình | Xem danh sách user, xóa hoặc cấp quyền tài khoản |
| UC-A02 | Thêm Sản phẩm mới | Sản phẩm | Cao | Đăng tải sản phẩm mới (Create) kèm ảnh, giá, tồn kho |
| UC-A03 | Xem danh sách SP | Sản phẩm | Cao | Hiển thị bảng tổng hợp toàn bộ sản phẩm (Read) |
| UC-A04 | Cập nhật Sản phẩm | Sản phẩm | Trung bình | Chỉnh sửa lại giá tiền, hình ảnh thông tin SP (Update) |
| UC-A05 | Xóa Sản phẩm | Sản phẩm | Thấp | Gỡ bỏ hoàn toàn một sản phẩm khỏi cửa hàng (Delete) |
| UC-A06 | Quản lý Đơn hàng | Đơn hàng | **Rất cao** | Xem danh sách, chi tiết và cập nhật trạng thái đơn duyệt |
| UC-A07 | Xem Dashboard KPI | Báo cáo | **Rất cao** | Xem biểu đồ doanh thu theo Ngày/Tuần/Tháng |
| UC-A08 | Xem Top Sản phẩm | Báo cáo | Cao | Biểu đồ thống kê các sản phẩm bán chạy nhất |
| UC-A09 | Xuất Data Hóa đơn | Báo cáo | Trung bình | Trích xuất export báo cáo ra định dạng Excel (.xlsx) |

---

## 5. Đặc tả chi tiết Use Case (Use Case Specification)

Dưới đây là đặc tả luồng sự kiện (Flow of Events) cho 3 luồng chức năng quan trọng nhất của hệ thống phục vụ thiết kế Backend và Unit Test.

### 4.1. UC-U02: Đăng nhập (Login)

- **Tác nhân chính:** Guest, User, Admin
- **Tiền điều kiện:** Người dùng đang ở màn hình Đăng nhập.
- **Luồng sự kiện chính (Happy Path):**
  1. Người dùng nhập Email và Mật khẩu.
  2. Người dùng nhấn nút "Đăng nhập".
  3. Hệ thống kiểm tra tính hợp lệ của Email và Mật khẩu dưới Database.
  4. Hệ thống tạo JWT Access Token và Refresh Token.
  5. Hệ thống lưu Token vào cookie/local storage phân quyền đăng nhập thành công.
- **Luồng ngoại lệ (Alternative Flow):**
  - *Email không tồn tại hoặc sai định dạng:* Hệ thống hiển thị lỗi "Tài khoản không tồn tại".
  - *Sai mật khẩu:* Hệ thống hiển thị lỗi "Mật khẩu không chính xác".
- **Hậu điều kiện:** Navbar thay đổi trạng thái sang "Đã đăng nhập", hiển thị Avatar người dùng.

### 4.2. UC-U08: Đặt hàng (Checkout)

- **Tác nhân chính:** User
- **Tiền điều kiện:** User đã đăng nhập và Giỏ hàng có ít nhất 1 sản phẩm hợp lệ, tồn kho > 0.
- **Luồng sự kiện chính (Happy Path):**
  1. User điều hướng từ Giỏ hàng sang trang Checkout.
  2. Hệ thống tải thông tin mặc định cá nhân (Tên, SĐT, Địa chỉ).
  3. User xác nhận hoặc chỉnh sửa thông tin giao hàng, chọn Phương thức thanh toán (COD).
  4. User bấm "Đặt Hàng".
  5. Hệ thống trừ tồn kho (Stock) của Sản phẩm tương ứng trong MongoDB.
  6. Hệ thống tạo Record Đơn hàng mới trạng thái "Chờ xác nhận".
  7. Hệ thống xóa trắng Giỏ hàng của User.
  8. Hiển thị màn hình "Đặt hàng thành công".
- **Luồng ngoại lệ:**
  - *Sản phẩm hết hàng trong lúc đang Checkout:* Báo lỗi "Sản phẩm X không đủ số lượng", rollback giao dịch.
- **Hậu điều kiện:** Đơn hàng chờ Admin duyệt, kho hàng giảm số lượng.

### 4.3. UC-A07: Xem Dashboard Báo Cáo

- **Tác nhân chính:** Admin
- **Tiền điều kiện:** Admin đã đăng nhập thành công với role `isAdmin=true`.
- **Luồng sự kiện chính (Happy Path):**
  1. Admin bấm vào menu "Dashboard".
  2. Frontend gửi request lấy Recharts Data kèm chuỗi JWT Token xác thực.
  3. Backend Mongoose chạy Aggregation Pipeline gom nhóm doanh thu theo Ngày/Tháng.
  4. Backend trả về Object JSON dữ liệu mảng.
  5. Frontend vẽ biểu đồ Line Chart và Pie Chart mô tả Trạng thái đơn, Top sản phẩm.
- **Luồng ngoại lệ:**
  - *Token hết hạn:* Hệ thống báo phiên đăng nhập hết hạn và đẩy về trang `/sign-in`.
- **Hậu điều kiện:** Màn hình Dashboard render xong không bị trống (No Data).

---

## 6. Danh sách Use Case - Giai đoạn 2 (Phase 2 - Mở rộng tương lai)

- **UC-U11 (Đánh giá & Bình luận):** Khách hàng đã mua hàng thành công có thể rate từ 1-5 sao và để lại review vào sản phẩm tương ứng.
- **UC-U12 (Gợi ý sản phẩm đồ họa):** Website tự động gợi ý thêm sản phẩm cùng danh mục.
- **UC-U13 (Sử dụng Voucher):** Áp dụng mã giảm giá lúc Checkout để giảm tổng tiền thanh toán.
- **UC-U14 (Đăng nhập MXH):** Tích hợp Google OAuth/Facebook SSO.
- **UC-U15 (Nhận Email thông báo):** Khách hàng nhận hoá đơn điện tử qua Nodemailer tự động.
- **UC-A10 (Cảnh báo Tồn kho):** Nhận được alert cảnh báo nguy cơ hết hàng kho.
- **UC-A11 (Quản lý Khuyến mãi/Vouchers):** Khả năng tùy chỉnh tạo mã voucher giảm giá, giới hạn.
- **UC-A12 (Phân quyền nâng cao Role-Based):** Admin chia quyền bảo vệ (Super Admin, Order Manager...).
