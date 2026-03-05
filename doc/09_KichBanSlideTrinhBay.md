# KỊCH BẢN TRÌNH BÀY ĐỒ ÁN (PRESENTATION SLIDES)

Tài liệu này là "xương sống" để nhóm thiết kế các Slide trên PowerPoint/Canva và phân công nhau thuyết trình ghép nối trôi chảy trước Hội đồng Giám khảo. Mục tiêu là trình bày "đúng trọng tâm, show được độ khó kỹ thuật và tính thực tiễn".

---

## 🕒 Khung thời gian dự kiến (15 Phút)

- Thuyết trình lý thuyết & giới thiệu: **5 phút**
- Live Demo (Chạy thử sản phẩm trực tiếp): **5 phút**
- Trả lời câu hỏi phản biện (Q&A): **5 phút**

---

## 🖼️ Cấu trúc các Slide (10 Slide Vàng)

### Slide 1: Trang bìa (Title Slide)

- **Tiêu đề:** Xây dựng Hệ thống Thương mại Điện tử đa nền tảng (E-Commerce Platform).
- **Công nghệ cốt lõi:** MERN Stack (MongoDB, Express, React, Node.js).
- **Giảng viên hướng dẫn:** [Tên Thầy/Cô].
- **Nhóm thực hiện:** Thủy Lợi N5.
- **Phong cách thiết kế:** Hiện đại, màu sắc chủ đạo đồng nhất với màu Web, có hình ảnh mockup web chạy trên màn hình Laptop/Điện thoại.

### Slide 2: Đặt vấn đề & Lý do chọn đề tài (Problem Statement)

- **Nỗi đau thị trường:** Các cửa hàng truyền thống đang gặp khó khăn trong việc số hóa dữ liệu, quản lý tồn kho và tiếp cận khách hàng trực tuyến.
- **Giải pháp của nhóm:** Tạo ra một "Chợ thương mại điện tử" tinh gọn, thân thiện, dễ bảo trì, giúp doanh nghiệp siêu nhỏ cũng có bộ quản trị (Dashboard) chuyên nghiệp.

### Slide 3: Hệ sinh thái Công nghệ (Tech Stack)

- (Sử dụng biểu tượng Icon thay vì chữ nhiều)
- **Giao diện (Frontend):** ReactJS (tạo các linh kiện Lego), Redux (quản lý bộ nhớ giỏ hàng), React Query.
- **Máy chủ (Backend):** Node.js & Express.
- **Nhà kho (Database):** MongoDB (Linh hoạt phi quan hệ).
- **Điểm nhấn:** Tại sao chọn MERN? (Vì tốc độ phát triển nhanh, dùng chung 1 ngôn ngữ JavaScript từ đầu đến cuối).

### Slide 4: Tổng quan Chức năng Cốt lõi (Key Features)

- Chia làm 2 khối màn hình (chia đôi slide):
  - **Dành cho Khách (User):** Chọn hàng -> Thêm Giỏ -> Đặt đơn -> Theo dõi tình trạng.
  - **Dành cho Chủ tiệm (Admin):** Quản lý Kho -> Xử lý Đơn duyệt -> **Xem Biểu đồ Doanh thu (Nhấn mạnh)**.

### Slide 5: Kịch bản Live Demo (Quan trọng nhất)

- *(Slide ghi chữ "LIVE DEMO", người thuyết trình chuyển sang tab Trình duyệt Web)*.
- **Luồng 1 (Khách mua):** Đăng nhập thử -> Dạo 1 vòng web xem ảnh -> Bấm mua hàng -> Form thanh toán thành công.
- **Luồng 2 (Admin kiểm duyệt):** Mở cửa sổ ẩn danh đăng nhập Admin -> Báo cáo thấy Tiền vừa tăng lên ở Biểu đồ Dashboard -> Xuất file Excel đơn hàng vừa mua.
- *(Mẹo: Các dữ liệu ảo phải được bơm sẵn từ nhà, không tốn thời gian ngồi gõ tay text mô tả khi thầy đang đứng xem)*.

### Slide 6: Kiến trúc Hệ thống & Dữ liệu (Architecture & ERD)

- Bê nguyên cái sơ đồ luồng dữ liệu Client-Server RESTful APIs vào.
- Trưng bày Sơ đồ Quan hệ Thực thể (ERD) với 3 bảng: User - Product - Order.
- **Câu "Hook" ăn điểm:** *"Hệ thống sử dụng MongoDB dạng Documents thay cho SQL cứng nhắc, phù hợp với mặt hàng thường xuyên thay đổi thuộc tính nay bán áo, mai bán giày"*.

### Slide 7: Phương pháp Quản trị Dự án (Scrum & SQA)

- Khẳng định nhóm không làm việc cảm tính mà tuân theo quy chuẩn doanh nghiệp:
  - **Mô hình:** Agile Scrum (Băm nhỏ theo tuần).
  - **Công cụ:** Trello/Jira để Tracking Task; Git/Github để gộp code.
  - **Kiểm soát chất lượng (SQA):** Có Linter tự động soi lỗi chính tả code, mô hình chia nhánh `develop` và `main` rõ ràng.

### Slide 8: Chiến lược Kiểm thử & Bảo mật (Testing & Security)

- Nêu bật điểm mạnh nổi bật nhất của đồ án sinh viên: Nhóm đã thực hiện kiểm thử độc lập và vá lỗi bảo mật (**Pass rate UAT đạt 93.75%**).
  - **Mô phỏng Penetration Test hạn chế:** Đánh chặn thành công 5/5 lỗ hổng (SEC_01 → SEC_05) bao gồm XSS, Bypass xác thực Header JWT và Null-pointer crash.
  - **Chống Sập Web:** Middleware `express-rate-limit` chặn spam F5 (Rate Limit).
  - **Minh bạch hóa rủi ro:** Chủ động thừa nhận hệ thống còn 24 warning của ESLint (Unused vars) đã ghi nhận vào Known Issues để xử lý sau (Cách thể hiện chuyên nghiệp).

### Slide 9: Bài học xương máu & Cải tiến tương lai (Lessons Learned)

- **Nợ kỹ thuật:** Thừa nhận làm CSS chay mất thời gian, chuyển sang thư viện Chart vẽ biểu đồ là một quyết định sáng suốt.
- **Hướng tương lai:** Phase 2 dự định tích hợp Thanh toán quẹt thẻ VNPay/Momo, Thêm chức năng Review 5 sao và Gửi Email hóa đơn tự động.

### Slide 10: Lời Cảm ơn & Phản biện (Q&A)

- *"Cảm ơn Hội đồng Giám khảo đã lắng nghe. Sau đây nhóm xin nhận những câu hỏi chất vấn để hoàn thiện sản phẩm ạ!"*

---

## ❓ Bộ Câu hỏi Phản biện Dự kiến (Q&A Cheat Sheet)

Để không bị "đứng hình" trước Hội đồng, nhóm đã chuẩn bị sẵn kịch bản trả lời cho các câu hỏi xoáy:

1. **"Tại sao dùng MongoDB mà không dùng SQL (SQL Server/MySQL) cho trang E-Commerce?"**
   - *Trả lời:* "Dạ thưa thầy/cô, mô hình mặt hàng của dự án rất đa dạng thuộc tính (ví dụ: áo thì có size/màu, máy tính thì lại có RAM/CPU). NoSQL Document của MongoDB giúp mở rộng thuộc tính JSON cực kỳ linh hoạt (Flexible/Dynamic Schema) mà không cần ALTER cấu trúc bảng liên tục như SQL. Phù hợp cho đồ án cần phát triển nhanh (Rapid MVP)."
2. **"Nếu 2 khách hàng ấn nút đặt mua ĐỒNG THỜI 1 sản phẩm cuối cùng trong kho thì sao?"**
   - *Trả lời:* "Nhóm đã chủ động thiết kế hàm check tồn kho ở Backend *ngay trước khi* thực hiện lệnh trừ số lượng. Dù vậy, ở Phase 1 do chạy MongoDB độc lập không replica set nên chưa cài đặt Atomic Transactions, vẫn có độ trễ mili-giây. Đây là Nợ Kỹ Thuật (Technical Debt) nhóm đã ghi hẳn vào tài liệu báo cáo để nâng cấp ở Phase 2 (Dùng Session Transactions)."
3. **"Token JWT của các em nếu bị lấy cắp thì hacker xài mãi mãi à?"**
   - *Trả lời:* "Dạ không ạ. Nhóm áp dụng cơ chế 2-Token: AccessToken chỉ có vòng đời rất ngắn (1 giờ). Auth Middleware rào mọi API. Để lấy token mới phải có RefreshToken (lưu bảo mật hơn). Nếu lộ Token 1 giờ, thiết bị lạ cũng sẽ sớm bị đẩy ra khỏi hệ thống."

---

## 📌 Bí quyết "Sống sót" trước hội đồng (Tips)

1. **Chia người nói:** Một người nói quá lâu sẽ gây buồn ngủ. Hãy để 1 bạn nói mảng Kỹ thuật (Backend), 1 bạn rành Thiết kế nói mảng UI (Frontend).
2. **Không đọc Slide:** Slide chỉ để vài gạch đầu dòng và hình ảnh lớn. Người nói phải diễn rã bằng lời (như đã phân tích ở các file Docs).
3. **Phòng hờ rớt mạng:** Bắt buộc quay sẵn 1 Video 3 phút quay màn hình cảnh thao tác mua hàng mượt mà nhất. Nếu hôm đó trường rớt Wifi hoặc máy chủ sập ngang, bật ngay Video lên chống cháy!
