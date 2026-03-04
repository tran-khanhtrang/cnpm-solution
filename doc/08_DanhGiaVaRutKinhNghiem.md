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

---

## 3. Khó khăn Gặp phải & Cách giải quyết (Challenges & Solutions)

| Phân loại | Khó khăn cụ thể gặp phải | Giải pháp nhóm đã áp dụng |
|-----------|--------------------------|---------------------------|
| **Kỹ thuật (Tech)** | Lỗi **CORS** (Cross-Origin Resource Sharing) khi React gọi sang cổng của Node.js bị chặn. | Áp dụng thư viện `cors` bên ExpressJS và cấu hình whitelist địa chỉ `http://localhost:3000`. |
| **Kỹ thuật (Tech)** | Up ảnh sản phẩm lên MongoDB làm Database phình to và nặng nhanh chóng, quá tải BSON size. | Chuyển file Base64 sang upload lên **Cloudinary**, sau đó DB chỉ cần lưu chuỗi đường dẫn URL `https://...` |
| **Quy trình (Process)**| Backend code chưa kịp xong, Frontend không có nguồn dữ liệu đổ vào màn hình phải ngồi chơi chờ vài ngày. | Thống nhất "Hợp đồng API" (Data interface) trên mặt giấy. Frontend làm ra cục dữ liệu ảo tĩnh **Fake Data (Mock API / Mock JSON)** để gài vào thiết kế vẽ vời trước, khi nào Backend thật xong việc thì gỡ cái giả ra. |
| **Nhân sự (People)** | Có bạn bận lịch thi học kỳ khác, xin phép nghỉ 1 vài ngày trong thời gian Sprint quan trọng. | Phân bổ mô hình **Pair-Programming** (2 người cùng quan sát 1 module), người này nghỉ thì người kia biết đường thay thế và fix bug liền. |

---

## 4. Bài học Rút kinh nghiệm (Lessons Learned)

Sau khi hoàn tất, đây là những đúc kết nhóm nhận được để làm hành trang cho kỹ sư phần mềm chuyên nghiệp lúc đi làm thực tế:

1. **Hiểu rõ "Mock API (Dữ liệu giả lập)" là vị cứu tinh của quy trình:**
   - Đừng để thiết kế giao diện bên Frontend phải ngồi gõ nhịp tay chờ Backend code xong. Ngay từ khâu làm Đặc tả (SRS), hai bên nên chốt sẵn với nhau định dạng cấu trúc tệp dữ liệu chung, ai làm bài người nấy chạy và xài dữ liệu giữ chỗ ban đầu.
2. **Không cố gắng sáng tạo lại Bánh xe (Don't Reinvent the Wheel):**
   - Trong giai đoạn đầu, nhóm định tự viết mã bằng CSS thuần để vẽ từ số 0 ra các hệ thống biểu đồ Quản trị. Điều này vô cùng lãng phí nguồn lực vì không có sẵn độ đo tỷ lệ đẹp. Việc chuyển hướng lấy thư viện vẽ hình có sẵn `Recharts.js` về xài thay thế đã trút bớt 80% sức lực. Bài học đắt giá: Nếu đã có thứ người ta làm sẵn (Third-party) cực đẹp và ổn định, hãy sử dụng trước tiên.
3. **Phải lưu tâm đến luồng dữ liệu lỗi (Negative Test Cases):**
   - Lập trình viên mới thường chỉ viết luồng đúng (Happy Path). Quá trình Demo suýt sụp vì tester cố tình bấm gửi form Đăng ký mà để trống mật khẩu. Bài học: Validation phải chặn ở 2 lớp (Tại Input Frontend React để báo lỗi ngay, và Tại Controller Node.js để cấm chọc thủng Data).
4. **Viết Documentation (Đặc tả) không phải việc dư thừa:**
   - Việc sở hữu hệ thống URD, SRS chi tiết (do nhóm đã làm) chính xác là cái phao cứu sinh để cãi lý lúc Review sản phẩm (Chức năng nào nằm trong Phase 1, cái nào không có trong chốt phạm vi ban đầu).

## 5. Đề xuất Cải tiến cho Dự án tương lai (Future Improvements)

Dựa trên sự đánh giá phương pháp luận từ dự án CNPM, đối với các quy mô dự án sắp tới, nhóm hướng đến thực hiện:

- **Giám sát thời gian tinh vi hơn:** Sử dụng công cụ tự động Jira gán điểm số công việc cụ thể (Story Points) để tính ra chính xác vận tốc làm việc theo giờ của đội DEV thay vì nhắm chừng mông lung bằng cảm tính.
- **Công nghệ (Tech Stack Upgrade):** Sẽ nâng cấp việc viết code thành **TypeScript** để máy tính báo lỗi định dạng dữ liệu (báo đỏ) ngay lúc người gõ phím. Giảm thiểu rất nhiều **Nợ Kỹ Thuật (Technical Debt)** - tức là tình trạng nhắm mắt code nhanh cẩu thả thuở ban đầu để rồi sau này sửa tốn thời gian gấp bội.
- **Tiến trình Hội nhập Liên tục (CI/CD Automation):** Ở đồ án này mọi việc tải code lên máy chủ phải làm thủ công. Hướng tới các dự án chuyên nghiệp lớn tại Đại học, nhóm cài cấu hình để lúc lập trình viên gộp code lên là Robot tự chạy phần mềm Test (Kiểm thử), nếu đúng quy chuẩn thì Robot làm việc thay con người xuất xưởng trang Web tự động đẩy thẳng ra Internet cho mọi người xem.
