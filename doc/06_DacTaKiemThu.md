# ĐẶC TẢ KIỂM THỬ PHẦN MỀM (TEST SPECIFICATION)

## 1. Mục đích Đặc tả

Tài liệu này xác định chiến lược, phạm vi, môi trường và các kịch bản kiểm thử (Test Cases) cốt lõi của hệ thống Thương Mại Điện Tử thuộc Nhóm Thủy Lợi N5. Đảm bảo toàn bộ các luồng chức năng (Functional Core) hoạt động chính xác trước khi đưa ra nghiệm thu đồ án môn Công Nghệ Phần Mềm.

## 2. Chiến lược Kiểm thử (Testing Strategy)

Với nguồn lực của một nhóm sinh viên phát triển theo Agile Scrum, chiến lược kiểm thử tập trung vào **Kiểm thử thủ công (Manual Testing)** và **Kiểm thử API (API Testing)**, bao gồm các cấp độ:

1. **Kiểm thử Đơn vị (Unit Testing - Lớp Backend):** Đảm bảo từng đoạn code nhỏ nhất như một hàm làm toán, hay hàm khóa mật khẩu hoạt động đúng trước khi ghép với nhau.
2. **Kiểm thử Tích hợp API (Integration Testing):** Sử dụng công cụ (Postman/ThunderClient) để giả danh màn hình người dùng, bắn lệnh hỏi lên máy chủ để xem dữ liệu lưu xuống Database có bị rớt dòng nào không.
3. **Kiểm thử Hệ thống (System/UI Testing):** Tester đóng vai trò như một khách hàng thực tế "bằng xương bằng thịt" nhấp chuột qua từng luồng màn hình trên giao diện Web nhằm rà soát xem có bị kẹt ở bước nào không (Ví dụ Từ lúc xem hàng -> đến giỏ hàng -> xuống tiền rắc rối chỗ nào).
4. **Kiểm thử Xác nhận (Acceptance Testing):** Đảm bảo sản phẩm cuối cùng nộp cho thầy duyệt phải có đủ các chức năng đã vẽ ra ở tài liệu Usecase từ đầu kỳ.

## 3. Môi trường Kiểm thử (Test Environment)

- **Thiết bị:** Laptop Windows 10/11 hoặc Mac OS.
- **Trình duyệt:** Google Chrome (phiên bản > 100) và Microsoft Edge.
- **Mạng:** Đảm bảo có kết nối Internet (để mô phỏng độ trễ tải ảnh Cloudinary và gọi API).
- **Công cụ Hỗ trợ:** Redux DevTools Extension (để soi luồng state của Giỏ hàng), React Developer Tools, Postman.

## 4. Kịch bản Kiểm thử Hệ thống (Test Cases)

Dưới đây là thiết kế chi tiết các Kịch bản kiểm tra ở mức bề mặt giao diện cho các luồng nghiệp vụ quan trọng nhất. Phân chia làm 2 nhánh: **Happy Path** (Luồng đi hoàn hảo, khách điền đúng hết) và **Negative Path** (Luồng người dùng cố tình nhập sai thông tin để phá hệ thống):

### 4.1 Module: Xác thực Người dùng (Authentication)

| Mã TC | Tên / Mô tả kịch bản | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected) | Pass/Fail |
|-------|----------------------|----------------------------|----------------------------|-----------|
| **AUTH_01** | Đăng ký tài khoản (Hợp lệ) | 1. Vào trang Đăng ký.<br>2. Nhập email mới, password hợp lệ.<br>3. Bấm Submit. | Hệ thống báo thành công. Thông tin lưu xuống MongoDB (password bị hash mã hóa). | Pass |
| **AUTH_02** | Đăng ký trùng Email | 1. Nhập email đã tồn tại trong DB.<br>2. Bấm Submit. | Bật Popup/Toast báo lỗi "Email đã được sử dụng". Không tạo user mới. | Pass |
| **AUTH_03** | Đăng nhập tài khoản | 1. Nhập email và password đúng.<br>2. Bấm Đăng nhập. | Chuyển hướng về Trang chủ. Redux Auth state cập nhật AccessToken, UI đổi thành "Xin chào [Tên]". | Pass |
| **AUTH_04** | Đăng nhập sai Pass | 1. Nhập email đúng nhưng password sai. | Web báo lỗi đỏ: "Mật khẩu không chính xác". Không có JWT sinh ra. | Pass |

### 4.2 Module: Giỏ hàng (Cart Management)

| Mã TC | Tên / Mô tả kịch bản | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected) | Pass/Fail |
|-------|----------------------|----------------------------|----------------------------|-----------|
| **CART_01** | Thêm mới vào Giỏ rỗng | 1. Mở chi tiết SP.<br>2. Chọn số lượng = 1, bấm "Thêm vào giỏ". | Icon Giỏ hàng Navbar nảy số "1". Thông báo thêm thành công (Redux update). | Pass |
| **CART_02** | Thêm trùng SP đang có | 1. Thêm tiếp SP A với lượng = 2 vào giỏ đang có sẵn SP A (lượng = 1). | Icon Navbar không tăng số lượng loại item. Nhưng trong chi tiết giỏ, Số lượng SP A gộp thành 3. | Pass |
| **CART_03** | Test giới hạn tồn kho | 1. Cố ý sửa input số lượng mua > `countInStock` của SP. | Nút "Thêm vào giỏ" bị vô hiệu hóa (Disabled) hoặc báo lỗi Không đủ hàng. | Pass |

### 4.3 Module: Thanh toán & Xử lý Đơn (Checkout Flow)

| Mã TC | Tên / Mô tả kịch bản | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected) | Pass/Fail |
|-------|----------------------|----------------------------|----------------------------|-----------|
| **CHK_01** | Đặt hàng khi chưa Đăng nhập | 1. Vào Giỏ hàng.<br>2. Bấm Mua hàng. | Hệ thống bắt luồng chặn (Middleware/Route Guard), đá văng User sang trang `/login`. | Pass |
| **CHK_02** | Submit Đơn hàng Thành công | 1. (Đã login), Điền đủ form Địa chỉ, SĐT.<br>2. Chọn Payment = COD.<br>3. Nhấn Thanh toán. | Hiển thị màn hình "Đặt hàng thành công". API trừ `countInStock` tại DB. Xóa sạch giỏ hàng ở Redux. | Pass |
| **CHK_03** | Đơn hàng rỗng | 1. Mở giỏ hàng trống.<br>2. Cố gắng tìm cách bấm Thanh toán. | Giao diện hiển thị nút Mua hàng bị mờ (Disabled) hoặc báo "Không có sản phẩm để thanh toán". | Pass |

### 4.4 Module: Bảng điều khiển Quản trị (Admin Dashboard & KPI)

| Mã TC | Tên / Mô tả kịch bản | Các bước thực hiện (Steps) | Kết quả mong đợi (Expected) | Pass/Fail |
|-------|----------------------|----------------------------|----------------------------|-----------|
| **ADM_01** | Chặn quyền truy cập | 1. Đăng nhập bằng tài khoản User thường.<br>2. Gõ tay URL `/admin`. | Trang trả về 403 Forbidden hoặc redirect về trang chủ kèm lỗi "Bạn không có quyền quản trị". | Pass |
| **ADM_02** | Verify Biểu đồ Doanh thu | 1. Truy cập Admin -> Tab Báo Cáo.<br>2. Chọn xem "Theo Tháng". | API tổng hợp (Aggregate) chính xác số tiền các đơn `isPaid=true`. Recharts render hình học đúng shape. | Pass |
| **ADM_03** | Tính năng Xuất file Excel | 1. Tab Đơn hàng -> Click nút "Export Excel". | Trình duyệt tự động download file `.xlsx` chứa dữ liệu dạng lưới table tương ứng đơn hàng hiện tại. | Pass |
| **ADM_04** | Xuất Excel theo khoảng ngày | 1. Tab KPI -> Chọn RangePicker từ ngày A đến ngày B -> Click Xuất Báo Cáo. | File `.xlsx` chỉ chứa đơn hàng trong khoảng thời gian đã chọn. | Pass |

## 5. Quản lý Dữ liệu Kiểm thử (Test Data Management)

Để các kịch bản test diễn ra trơn tru mà không cần tốn hàng giờ đồng hồ ngồi gõ tay tạo từng tài khoản hay từng sản phẩm, dự án đã xây dựng riêng hệ thống bơm dữ liệu tự động:

- **Bơm dữ liệu mồi (Database Seeding):** Đội ngũ đã viết sẵn một kịch bản code tên là `seedData.js`. Chỉ cần 1 cú click chuột, kịch bản này sẽ tự động "gieo hạt" vào MongoDB 20 người dùng, 50 mặt hàng đa dạng và 100 đơn hàng ảo phân bố trải đều về mặt thời gian xuyên suốt năm. Nhờ vậy mới có cái hiển thị ra để xem biểu đồ Doanh thu (Dashboard).
- **Dữ liệu mồi giả (Mock Data tĩnh):** Ở Frontend (React), khi Backend rớt mạng, để lập trình viên không bị gián đoạn thiết kế giao diện, nhóm dùng một tệp `[{"ten": "Áo gió", "gia": 5000}]` giả lập dưới dạng tĩnh. Đây coi như một hình nộm để thử nghiệm mặt chữ có bị vỡ form hay không.
- **Che giấu khuôn mặt (Data Anonymization):** Đối với các quy trình Export dữ liệu ra file Excel phục vụ việc kiểm thử công khai (như cho thầy giáo chấm trên TV), các thông tin nhạy cảm của khách như `Số điện thoại` hay `Mật khẩu băm` đã được cắt bớt hoặc hiển thị dấu sao `****` để mô phỏng tính trung thực bảo vệ quyền riêng tư người dùng.

## 6. Kiểm thử An ninh & Khả năng chịu tải (Security & Performance Test)

Nhằm đảm bảo dự án không chỉ có giao diện đẹp, dùng đúng chức năng mà còn phải "sống khỏe" trước những kẻ phá hoại trên Internet, nhóm bổ sung các kịch bản kiểm tra sức bền cấp cao sau:

### 6.1 Kiểm thử An toàn bảo mật (Security Testing)

- **Mô phỏng Hack Cơ sở dữ liệu (NoSQL Injection):** Cố ý gõ các đoạn mã lệnh ngoằn ngoèo lạ lẫm `{$gt: ""}` vào ô Đăng nhập thay vì tên thật nhằm lừa máy chủ mở khóa cửa.
  - *Kết quả mong đợi:* Lớp lá chắn Mongoose chặn đứng, báo lỗi "Sai định dạng". Hệ thống miễn nhiễm.
- **Mô phỏng Nhúng mã độc (Biến XSS):** Giả danh khách đánh giá xấu, gõ nguyên 1 đoạn virus `<script>ăn cắp mật khẩu</script>` vào khung Bình luận sản phẩm.
  - *Kết quả mong đợi:* Khung giao diện ReactJS tự động biến mọi mã độc thành chữ viết vô hại thông thường. Không có chuyện lây lan virus chéo sang máy người dùng khác.

### 6.2 Kiểm thử Chống đánh sập web (DOS/DDoS Shield)

- **Mô phỏng bị đối thủ chơi xấu (Tấn công từ chối dịch vụ):** Dùng phần mềm máy tính (Bot) tự động F5 phím tải lại màn hình Trang chủ 10.000 lần trong 1 giây nhằm làm cháy nổ Ram của Máy chủ dẫn tới treo web.
  - *Kết quả mong đợi:* Nhờ lớp giáp bảo vệ `express-rate-limit` tự động ghi nhớ địa chỉ mạng nhà đối tượng, nếu bấm quá 100 lần trong 15 phút thì ngay lập tức Khóa mõm địa chỉ IP đó, hiển thị màn hình báo trắng: **Lỗi 429 - Dừng lại, bạn đang thao tác quá nhanh**. Cứu sống máy chủ.

### 6.3 Kiểm thử Áp lực đám đông (Stress / Load Testing)

- **Mô phỏng Săn Sale Ngày Vàng (11/11):** Sử dụng công cụ giả lập sinh ra cùng lúc 500 khách ảo và hẹn giờ để họ cùng "bấm nút Bấm thanh toán" tranh nhau mua 1 thỏi son ở chính xác cùng 1 tích tắc.
  - *Kết quả mong đợi:* Kho xử lý của MongoDB phải tự động bắt mọi người "Xếp hàng mua" (Transaction Lock), xử lý trót lọt không để xảy ra tình cảnh Đếm tồn kho bị âm (1 thỏi son bán cho 2 người). Tốc độ đợi quay vòng phản hồi (Response time) cao nhất không quá 2 đến 3 giây để khách không cảm thấy nặng nề bực bội.

---

### 6.4 Kiểm thử Bảo mật Nâng cao — Code Review & Penetration Test (Vòng 2, 04/03/2026)

> *Thực hiện bởi toàn nhóm trong giai đoạn hoàn thiện sản phẩm trước bảo vệ đồ án — Tiến hành rà soát mã nguồn tổng thể kết hợp kiểm tra thủ công bằng HTTP Client (Postman). Kết quả được ghi nhận lại làm bằng chứng hoàn thiện phần mềm.*

| Mã TC | Tên / Mô tả kịch bản | Các bước kiểm tra | Lỗi phát hiện (Bug Found) | Kết quả sau Fix | Pass/Fail |
|-------|----------------------|-------------------|--------------------------|-----------------|-----------|
| **SEC_01** | Gọi API bảo mật không kèm Header `token` | Gửi `GET /api/user/getAll` bằng Postman **không đính kèm** header `token`. | `TypeError: Cannot read properties of undefined (reading 'split')` — Server trả về **HTTP 500/crash** thay vì 401 Unauthorized. | Thêm guard check `if (!req.headers.token) return res.status(401)` vào cả hai hàm `authMiddleWare` và `authUserMiddleWare` trước khi gọi `.split()`. Server nay trả đúng **HTTP 401 — No token provided**. | ✅ Pass |
| **SEC_02** | Gọi refresh-token không kèm Header | Gửi `POST /api/user/refresh-token` không kèm header `token`. | `UserController.refreshToken` gọi `.split()` trực tiếp trên `undefined` — crash 500 tương tự SEC_01. | Thêm null-check cho `req.headers.token` trong `UserController.refreshToken`. Kết quả đúng: **HTTP 200, status: ERR, message: "The token is required"**. | ✅ Pass |
| **SEC_03** | Xem chi tiết đơn hàng không cần xác thực | Gửi `GET /api/order/get-details-order/:id` với orderId bất kỳ, **không cần đăng nhập** (không có token). | Route thiếu middleware Auth — bất kỳ ai biết `orderId` đều xem được thông tin cá nhân khách hàng (tên, địa chỉ, SĐT). Vi phạm bảo mật dữ liệu người dùng. | Bổ sung `authUserMiddleWare` vào route `/get-details-order/:id` trong `OrderRouter.js`. Nay trả **HTTP 401** nếu không có token hợp lệ. | ✅ Pass |
| **SEC_04** | Logic lỗi sau `resolve(ERR)` — code chạy tiếp trên null | Đăng nhập với email tồn tại nhưng password sai. Quan sát log server. | `UserService.loginUser()` gọi `resolve({ERR})` nhưng **thiếu `return`** — dòng `bcrypt.compareSync(password, null.password)` thực thi ngay sau — ném lỗi runtime, server báo **500 Internal Error** thay vì 200 ERR. Pattern lỗi tương tự xuất hiện trong toàn bộ `UserService`, `ProductService`, `OrderService`. | Thêm `return` trước tất cả `resolve(ERR)` trong toàn bộ 3 Service files. Login sai password nay trả đúng **HTTP 200, status: ERR, message: "The password or user is incorrect"**. | ✅ Pass |
| **SEC_05** | Shadow Variable trong `cancelOrderDetails` | Đặt đơn hàng rồi hủy đơn, kiểm tra response data trả về. | Trong `OrderService.cancelOrderDetails()`: biến `let order = []` bị che bởi tham số `(order)` trong callback `.map()`. Response `data: order` luôn trả về `[]` (mảng rỗng) thay vì object đơn hàng vừa hủy. | Đổi tên biến callback thành `item`; biến kết quả đổi thành `cancelledOrder`. Response nay trả đúng object đơn hàng đã xóa. | ✅ Pass |

### 6.5 Nhật ký Kiểm tra Chất lượng Code (Code Quality Log — 04/03/2026)

| Mã | Hạng mục | Vấn đề phát hiện | Hành động khắc phục | Trạng thái |
|----|----------|------------------|----------------------|------------|
| **CQ_01** | Lỗi chính tả Response API | `'SUCESS'` (thiếu C) và `'SUCESSS'` (thừa S) trong `JwtService.js`, `ProductService.js`, `OrderService.js` — gây khó khăn khi Frontend switch-case theo chuỗi response. | Chuẩn hóa toàn bộ thành `'SUCCESS'`. | ✅ Fixed |
| **CQ_02** | Debug log bị bỏ quên | `console.log('c;getBase64', ...)` trong `fe-cnpm/src/utils.js` dòng 90 — in thông tin nội bộ ra console trình duyệt của người dùng cuối. | Xóa dòng log khỏi hàm `convertDataChart()`. | ✅ Fixed |
| **CQ_03** | Sai thứ tự tham số axios | `fe/services/UserService.js` hàm `deleteUser`: `axiosJWT.delete(url, data, config)` — `data` và `config` bị đảo vị trí, khiến header `token` không được gửi và request body không được đính kèm, chức năng xóa User của Admin im lặng thất bại. | Sửa thành `axiosJWT.delete(url, { data, headers })` theo đúng chuẩn Axios API. | ✅ Fixed |
| **CQ_04** | ESLint — 24 warnings tồn đọng | Biến khai báo nhưng không sử dụng (`isLoadingDeletedMany`, `rowIndex`, `onSuccessPaypal`, `search`...) rải rác ở 10 file Frontend. Không ảnh hưởng runtime nhưng vi phạm quy chuẩn coding convention. | Ghi nhận, đưa vào backlog sẽ xử lý trong sprint tới. | ⚠️ Known |
| **CQ_05** | Typo trong thông báo lỗi xác thực | `'The authemtication'` (viết sai "authentication") trong `JwtService.js`. | Sửa thành `'The authentication'`. | ✅ Fixed |

---

## 7. Kết luận & Đánh giá mức độ hoàn thiện

Hệ thống trải qua **2 vòng kiểm thử** (Vòng 1: Kiểm thử chức năng & tích hợp; Vòng 2: Code Review & Penetration Test bảo mật nâng cao) với độ bao phủ tốt trên các luồng nghiệp vụ xương sống. Vòng kiểm thử thứ 2 (04/03/2026) phát hiện thêm **5 lỗi bảo mật/logic** (SEC_01 đến SEC_05) và **5 vấn đề chất lượng code** (CQ_01 đến CQ_05), trong đó **9/10 vấn đề đã được vá hoàn toàn** trước ngày bảo vệ. Các ngoại lệ (Edge Cases) đã được kiểm soát bởi các hàng rào chặn ở màn hình nhập liệu và ở tầng Backend Services. Dự án đạt độ ổn định rất cao để báo cáo nghiệm thu **(Phiên bản v1.1 — Patch Security)**.
