# TÀI LIỆU ĐÁNH GIÁ & RÚT KINH NGHIỆM DỰ ÁN (PROJECT RETROSPECTIVE & LESSONS LEARNED)

## 1. Mục đích Tài liệu

Tài liệu này được lập ra nhằm nhìn nhận lại toàn bộ vòng đời phát triển dự án Thương Mại Điện Tử của **Nhóm Thủy Lợi N5** (từ 21/01/2025 đến 01/03/2026). Đây là bản tổng kết khách quan giúp phân tích các thành tựu đạt được, các thất bại hoặc độ trễ so với kế hoạch, từ đó đúc kết thành bài học kinh nghiệm quý giá cho các dự án phần mềm chuyên nghiệp trong tương lai.

---

## 2. Tổng kết & Đánh giá Hiệu quả Dự án (Project Assessment)

### 2.1 Đánh giá Tiến độ (Schedule & Timeline)

- **Kế hoạch đặt ra:** Chạy 4 Sprints cốt lõi và đóng gói MVP vào ngày 31/08/2025 (Phase 1). Hoàn thiện chỉnh chu toàn bộ các tính năng mở rộng vào tháng 02/2026.
- **Thực tế thực hiện:** Dự án đáp ứng được khoảng 95% thời hạn các Milestone quan trọng.
- **Đánh giá:** **TỐT**. Có một số độ trễ nhỏ xảy ra ở Sprint 3 (Chu trình Mua sắm) do các thành viên mới làm quen với luồng Redux Store để quản lý State Giỏ hàng, khiến tiến độ chậm khoảng 4 ngày so với dự kiến. Tuy nhiên, nhóm đã áp dụng chiến lược đẩy nhanh (Crashing) ở Sprint 4 nên vẫn kịp tiến độ nộp bài.

### 2.2 Đánh giá Chất lượng Phần mềm (Software Quality)

- **Giao diện (UI/UX):** Giao diện tương đối trực quan, đáp ứng chuẩn Responsive trên màn hình Desktop và Tablet, tốc độ duyệt trang SPA (Single Page Application) bằng ReactJS diễn ra mượt mà, không bị chớp hay load lại trang.
- **Tính năng (Functionality):** Cung cấp trọn vẹn luồng mua sắm điện tử (CRUD sản phẩm, Auth, Add-to-cart, Checkout, Dashboard KPI).
- **Lỗi (Defects/Bugs):** Các bug logic nghiêm trọng (như đặt hàng với số lượng âm) đã được giải quyết triệt để tại khâu Validation Backend. Vẫn còn một số bug UI nhỏ ở các màn hình có độ phân giải lạ.
- **Đánh giá:** **ĐẠT YÊU CẦU**. Kiến trúc MERN Stack chứng minh được sự trơn tru trong thao tác trao đổi Data (JSON) từ Client đến MongoDB.

### 2.3 Đánh giá Ngân sách / Nguồn lực dự án (Budget & Resource Effort)

Vì là đồ án sinh viên, ngân sách (Budget) ở đây được quy đổi thành **Giờ làm việc (Man-hours)** và **Công nghệ sử dụng**.

- **Kế hoạch Effort:** Khoảng 150 giờ làm việc tổng cộng cho toàn đội.
- **Thực tế tiêu hao (Actual Effort):** Khoảng 180 giờ do tốn kém thêm thời gian fix lỗi ghép nối API giữa Backend và Frontend (CORS Policy Error) ở những ngày đầu.
- **Chi phí hạ tầng (Infrastructure Costs):** $0. Thành công tận dụng triệt để các dịch vụ Free-tier (MongoDB Atlas lưu Database, Cloudinary lưu Ảnh, Git/Trello).
- **Đánh giá:** **HIỆU QUẢ CAO**. Không phát sinh chi phí tiền mặt nhưng tài nguyên thời gian hơi vượt mức giới hạn.

### 2.4 Sự phối hợp & Hiệu quả làm việc nhóm (Team Collaboration)

- **Ưu điểm:** Các thành viên biết chia sẻ công việc rõ rệt (Tách bạch người làm Front-end, người làm Back-end) nên ít khi bị Conflict code git đè lên nhau. Kỹ năng giao tiếp trong lúc review lỗi chéo trong các buổi Daily Meeting là khá tốt.
- **Hạn chế:** Sự mất cân đối kiến thức ban đầu. Bạn phụ trách Front-end có lúc phải chờ Bạn Back-end làm xong API thì mới dám code, dẫn đến "nút thắt cổ chai" (Bottleneck) làm giảm hiệu suất tuần 3.

### 2.5 Bảng so sánh Kế hoạch vs. Thực tế theo Sprint (Planned vs. Actual)

| Sprint | Mục tiêu kế hoạch | Effort dự kiến | Effort thực tế | Kết quả đạt được | Blockers / Độ trễ |
|---|---|---|---|---|---|
| **Sprint 1** | Thiết lập nền tảng: Auth JWT, DB Schema, Git setup | 20 giờ | 22 giờ | ✅ Đầy đủ | Mất thêm 2h cấu hình CORS lần đầu |
| **Sprint 2** | CRUD Sản phẩm, Trang chủ, Tìm kiếm | 25 giờ | 26 giờ | ✅ Đầy đủ | Upload ảnh Base64 làm phình DB → chuyển sang Cloudinary (+1h) |
| **Sprint 3** | Giỏ hàng (Redux), Checkout, Order API | 30 giờ | 34 giờ | ✅ Đầy đủ | **Chậm 4 ngày** — FE chờ BE xong API cart; fix bug Redux state |
| **Sprint 4** | Dashboard KPI, Export Excel, UI Polish | 25 giờ | 28 giờ | ✅ Đầy đủ | Recharts config mất thêm ~3h; bù tiến độ Sprint 3 |
| **SQA / Patch**| Code review bảo mật, UAT, vá lỗi | 10 giờ | 12 giờ | ✅ 9/10 bug vá | SEC_01→SEC_05: phát hiện thêm qua AI Code Review |
| **Tổng** | - | **~110 giờ** | **~122 giờ** | MVP v1.1 hoàn chỉnh | Vượt ~11% effort so với kế hoạch |

> **Nhận xét:** Mức vượt effort 11% là chấp nhận được (ngưỡng an toàn của ngành thường 15–20%). Sprint 3 là điểm rủi ro nhất — nhưng đã được khắc phục bằng chiến lược Crashing ở Sprint 4.

---

## 3. Khó khăn Gặp phải & Cách giải quyết (Challenges & Solutions)

| Phân loại | Khó khăn cụ thể gặp phải | Giải pháp nhóm đã áp dụng |
|-----------|--------------------------|---------------------------|
| **Kỹ thuật (Tech)** | Lỗi **CORS** (Cross-Origin Resource Sharing) khi React gọi sang cổng của Node.js bị chặn. | Áp dụng thư viện `cors` bên ExpressJS và cấu hình whitelist địa chỉ `http://khanhtrang:3000`. |
| **Kỹ thuật (Tech)** | Up ảnh sản phẩm lên MongoDB làm Database phình to và nặng nhanh chóng, quá tải BSON size. | Chuyển file Base64 sang upload lên **Cloudinary**, sau đó DB chỉ cần lưu chuỗi đường dẫn URL `https://...` |
| **Quy trình (Process)**| Backend code chưa kịp xong, Frontend không có nguồn dữ liệu đổ vào màn hình phải ngồi chơi chờ vài ngày. | Thống nhất "Hợp đồng API" (Data interface) trên mặt giấy. Frontend làm ra cục dữ liệu ảo tĩnh **Fake Data (Mock API / Mock JSON)** để gài vào thiết kế vẽ vời trước, khi nào Backend thật xong việc thì gỡ cái giả ra. |
| **Nhân sự (People)** | Có bạn bận lịch thi học kỳ khác, xin phép nghỉ 1 vài ngày trong thời gian Sprint quan trọng. | Phân bổ mô hình **Pair-Programming** (2 người cùng quan sát 1 module), người này nghỉ thì người kia biết đường thay thế và fix bug liền. |

---

## 4. Retrospective — Phương pháp "4Ls" (Sprint Retrospective Framework)

Nương theo khuôn khổ **4Ls Retrospective** được sử dụng rộng rãi trong Scrum Teams chuyên nghiệp, nhóm nhìn lại dự án theo 4 góc độ:

| Góc độ | Ý nghĩa | Nội dung nhóm Thủy Lợi N5 đúc kết |
|---|---|---|
| 👍 **Liked** (Hài lòng) | Những gì đã diễn ra tốt | MERN Stack giúp dữ liệu JSON chạy mượt Client↔Server; Ant Design tiết kiệm đáng kể thời gian UI; Recharts render biểu đồ đẹp và tùy biến cao; Agile Scrum giúp phân công rõ ràng, không bị conflict git cập nhật. |
| 🎓 **Learned** (Học được) | Kiến thức và kỹ năng mới thu nhận được | Học cách vá lỗi bảo mật thực tế (null-check middleware, route auth); Hiểu sâu JWT lifecycle (access/refresh token); Nắm vững Mongoose aggregation pipeline để tính doanh thu; Biết dùng PowerShell Invoke-RestMethod để test API như Penetration Test cục bộ. |
| ❌ **Lacked** (Thiếu sót) | Những điều cần làm nhưng chưa làm được | Chưa viết Unit Test tự động (Jest) nên mỗi lần sửa code đều test thủ công; Chưa có CI/CD nên deploy lên GitHub phải thủ công; 24 ESLint warnings tồn đọng chưa xử lý xong; Không có staging environment — test thẳng trên production local. |
| 💭 **Longed for** (Muốn có hơn) | Những điều ước có thêm nếu tài nguyên cho phép | TypeScript thay JavaScript để bắt lỗi type ngay khi code; Câu hỏi backlog của Phase 2 (VNPAY, Review, Email); Một bộ component UI tùy chỉnh riêng thay vì phụ thuộc hoàn toàn vào Ant Design. |

---

## 5. Đánh giá Công nghệ MERN Stack sau Dự án

Sau quá trình phát triển thực tế, nhóm có đánh giá khách quan về sự lựa chọn công nghệ:

| Hạng mục đánh giá | MongoDB | Express | ReactJS | Node.js |
|---|---|---|---|---|
| **Phù hợp với bài toán** | ✅ Tốt — dữ liệu sản phẩm linh hoạt, không cần schema cứng | ✅ Tốt — nhẹ, nhanh, routing rõ ràng | ✅ Rất tốt — SPA mượt, component tái sử dụng cao | ✅ Tốt — non-blocking I/O phù hợp API server |
| **Đường cong học** | ⚠️ Trung bình — Aggregation pipeline phức tạp | ✅ Thấp — cú pháp đơn giản | ⚠️ Trung bình — Redux và React Query mất thời gian nắm | ✅ Thấp nếu đã biết JS |
| **Nhược điểm gặp phải** | IPv6 resolution issue với `khanhtrang` → phải dùng `127.0.0.1` | CORS configuration bắt đầu khó chịu | Peer dependency conflicts (ajv, antd) | N/A |
| **Khuyến nghị tương lai** | Thêm Mongoose-sanitize bảo mật | Thêm Helmet.js, express-validator | Migrate sang TypeScript | (giữ nguyên) |

> **Kết luận:** MERN Stack **phù hợp** cho quy mô dự án này. Tuy nhiên đối với dự án cần dữ liệu quan hệ chặt chẽ (ví dụ tài chính, kế toán), nên cân nhắc PostgreSQL + Prisma ORM thay cho MongoDB.

---

## 6. Bài học Rút kinh nghiệm (Lessons Learned)

Sau khi hoàn tất, đây là những đúc kết nhóm nhận được để làm hành trang cho kỹ sư phần mềm chuyên nghiệp lúc đi làm thực tế:

1. **Hiểu rõ "Mock API (Dữ liệu giả lập)" là vị cứu tinh của quy trình:**
   - Đừng để thiết kế giao diện bên Frontend phải ngồi gõ nhịp tay chờ Backend code xong. Ngay từ khâu làm Đặc tả (SRS), hai bên nên chốt sẵn với nhau định dạng cấu trúc tệp dữ liệu chung, ai làm bài người nấy chạy và xài dữ liệu giữ chỗ ban đầu.
2. **Không cố gắng sáng tạo lại Bánh xe (Don't Reinvent the Wheel):**
   - Trong giai đoạn đầu, nhóm định tự viết mã bằng CSS thuần để vẽ từ số 0 ra các hệ thống biểu đồ Quản trị. Điều này vô cùng lãng phí nguồn lực. Việc chuyển hướng lấy thư viện `Recharts.js` về xài đã trút bớt 80% sức lực. Bài học: Nếu đã có thứ người ta làm sẵn (Third-party) cực đẹp và ổn định, hãy sử dụng trước tiên.
3. **Phải lưu tâm đến luồng dữ liệu lỗi (Negative Test Cases):**
   - Lập trình viên mới thường chỉ viết luồng đúng (Happy Path). Validation phải chặn ở 2 lớp: tại Input Frontend và tại Controller Backend. Bảo mật cũng phải kiểm tra cả các tình huống thiếu header, thiếu token, thiếu return.
4. **Viết Documentation (Đặc tả) không phải việc dư thừa:**
   - Việc sở hữu hệ thống URD, SRS chi tiết chính xác là cái phao cứu sinh để cãi lý lúc Review sản phẩm và xác định phạm vi (chức năng nào nằm trong Phase 1, cái nào chưa).
5. **Bảo mật không phải việc thêm vào cuối — phải làm từ đầu:**
   - Việc phát hiện 5 lỗ hổng bảo mật (SEC_01→SEC_05) trong vòng SQA nâng cao cho thấy: Null-check cho authentication headers, phân quyền route, và logic `return` trong service phải được kiểm tra ngay từ Sprint 1, không đợi đến cuối dự án.

---

## 7. Đề xuất Cải tiến cho Dự án tương lai (Future Improvements)

Dựa trên sự đánh giá phương pháp luận và kết quả thực tế từ dự án CNPM, nhóm hướng đến thực hiện các cải tiến sau:

| Hạng mục | Giải pháp cụ thể | Lợi ích kỳ vọng |
|---|---|---|
| **Quản lý effort chính xác hơn** | Áp dụng **Story Points** (Fibonacci: 1, 2, 3, 5, 8, 13) để ước lượng task; duy trì **Velocity Chart** theo dõi tốc độ thực tế qua từng Sprint | Dự báo tiến độ chính xác hơn; cảnh báo sớm khi team overload |
| **Nâng cấp Stack** | Chuyển sang **TypeScript** (FE + BE); thêm `mongoose-sanitize` và `helmet.js` | Bắt lỗi type ngay khi code; giảm Technical Debt; tăng bảo mật |
| **Kiểm thử tự động** | Tích hợp **Jest** (BE) + **React Testing Library** (FE) để viết Unit Tests; **k6** cho Load Test | Mỗi lần sửa code có safety net tự động; phát hiện regression sớm |
| **CI/CD Pipeline** | Cấu hình **GitHub Actions**: tự động chạy ESLint + Jest khi PR; tự động deploy lên Render/Railway khi merge vào `main` | Giảm lỗi thủ công; chu trình release nhanh hơn |
| **Bảo mật nâng cao** | Áp dụng **OWASP Top 10** checklist; thêm rate limiting cho `/sign-in`; CORS whitelist chặt chẽ hơn khi deploy production | Đạt chuẩn bảo mật ứng dụng web cơ bản |
| **Phát triển Phase 2** | VNPAY/MoMo Sandbox; Đánh giá sản phẩm; Gửi Email hóa đơn qua Nodemailer; Voucher Engine | Hoàn thiện hành trình khách hàng end-to-end |
