# Báo cáo Ước tính Chi phí & Quy mô Dự án (COCOMO II)

Dựa trên phân tích mã nguồn hiện tại, dưới đây là ước tính chi phí và nỗ lực phát triển theo mô hình COCOMO II.

## 1. Thống kê Dòng mã (LOC)
Tổng số dòng code thực tế (đã loại bỏ thư viện `node_modules` và dữ liệu mẫu):

| Ngôn ngữ / Định dạng | Số dòng (Lines) | Số lượng file |
| :--- | :---: | :---: |
| JavaScript (.js) | 7,400 | 115 |
| React (.jsx) | 5,105 | 71 |
| TypeScript/React (.tsx) | 2,222 | 19 |
| Định dạng giao diện (.css) | 2,032 | 26 |
| TypeScript (.ts) | 396 | 9 |
| Cấu hình (.json) | 389 | 15 |
| HTML (.html) | 152 | 4 |
| **TỔNG CỘNG** | **17,696** | **259** |

**Quy mô dự án:** ~17.7 KLOC (Kilo Lines of Code).

---

## 2. Thông số Ước tính COCOMO II
Sử dụng mô hình **Early Design** hoặc **Post-Architecture** với các hệ số mặc định cho dự án phần mềm quy mô trung bình (Semi-Detached):

*   **Hệ số A (Constant):** 2.94
*   **Hệ số B (Scaling Factor):** 1.12 (Độ phức tạp trung bình)
*   **EAF (Effort Adjustment Factor):** 1.0 (Giả định điều kiện làm việc tiêu chuẩn)

### Công thức:
1.  **Effort (PM) = A × (Size)^B × EAF**
2.  **Duration (TDEV) = 3.67 × (Effort)^F** (với F = 0.28 + 0.2 × (B - 0.91))

---

## 3. Kết quả Ước tính

### Nỗ lực & Thời gian
*   **Tổng nỗ lực (Effort):** **~73.4 Person-Months** (Tháng-Người)
*   **Thời gian thực hiện (Duration):** **~13.7 Tháng**
*   **Nhân sự đề xuất:** **~5 - 6 Người** (Nỗ lực / Thời gian)

### Ước tính Chi phí (Tham khảo)
*Giả sử mức lương trung bình cho 1 Dev là 25,000,000 VNĐ/tháng:*
*   **Tổng chi phí nhân sự:** **~1,835,000,000 VNĐ** (Một tỷ tám trăm ba mươi lăm triệu đồng)

---

## 4. Đánh giá & Lưu ý
*   **Độ phức tạp:** Dự án có sự kết hợp giữa Backend (Node.js) và Frontend (React), cùng với hệ thống tài liệu (URD, SQA) khá chi tiết, cho thấy mức độ hoàn thiện chuyên nghiệp.
*   **Sai số:** COCOMO II là mô hình ước tính dựa trên thống kê. Thực tế có thể thay đổi tùy thuộc vào kỹ năng đội ngũ và công cụ hỗ trợ (AI tools, Boilerplates).
*   **Khuyến nghị:** Cần chú trọng vào giai đoạn kiểm thử (SQA) vì lượng mã nguồn Frontend chiếm tỷ trọng lớn (~50%), nơi thường phát sinh nhiều lỗi giao diện và logic người dùng.

---

## 5. Phương pháp so sánh: Function Point (FP)
Bên cạnh cách tính dựa trên dòng mã (LOC), chúng tôi thực hiện ước tính theo điểm chức năng (Function Point) để có cái nhìn khách quan hơn về giá trị nghiệp vụ của hệ thống.

### Phân tích thành phần chức năng:
| Thành phần | Loại | Mô tả | Số lượng | Trọng số (Avg) | Điểm (UFP) |
| :--- | :---: | :--- | :---: | :---: | :---: |
| **Thực thể dữ liệu (ILF)** | Nội bộ | User, Product, Order | 3 | 10 | 30 |
| **Giao tiếp bên ngoài (EIF)** | Kết nối | Payment Gateway (PayPal) | 1 | 7 | 7 |
| **Nhập liệu (EI)** | Input | Đăng ký, Đặt hàng, Cập nhật kho... | 10 | 4 | 40 |
| **Truy vấn (EQ)** | Query | Tìm kiếm, Xem chi tiết, Lọc SP... | 8 | 4 | 32 |
| **Đầu ra (EO)** | Output | Thống kê doanh thu, Thông báo... | 4 | 5 | 20 |
| **TỔNG CỘNG** | | | | | **129 UFP** |

---

## 6. So sánh Đối chiếu (LOC vs FP)

| Chỉ số so sánh | Dựa trên LOC (COCOMO II) | Dựa trên Function Point (FP) | Nhận xét |
| :--- | :---: | :---: | :--- |
| **Quy mô** | 17.7 KLOC | 129 FP | Tương đương hệ thống Small-Medium. |
| **Nỗ lực (Effort)** | ~73.4 PM | ~16.1 PM | LOC tính cả CSS/Giao diện nên nỗ lực cao hơn. |
| **Thời gian (TDEV)** | ~13.7 Tháng | ~6 - 8 Tháng | FP thường chỉ tập trung vào logic lõi. |

### Kết luận phân tích:
1.  **Chênh lệch nỗ lực:** Phương pháp LOC cho kết quả nỗ lực cao gấp ~4.5 lần so với FP. Điều này là do dự án có lượng mã nguồn Frontend (React, CSS) rất lớn để tối ưu hóa trải nghiệm người dùng (WOW UI), điều mà phương pháp FP truyền thống thường bỏ qua hoặc đánh giá thấp.
2.  **Đề xuất:** 
    *   Nếu chỉ tính logic nghiệp vụ: Có thể xem xét con số **~20-25 PM**.
    *   Nếu tính cả thiết kế UI/UX cao cấp và tối ưu hiệu năng: Con số **~50-60 PM** là thực tế hơn cho một dự án thương mại điện tử hoàn chỉnh.

---

## 7. Phân tích kịch bản nhân sự (Case Study: Team 4 người full-time)
Nếu dự án được triển khai với đội ngũ cố định gồm **4 thành viên làm việc toàn thời gian**, thời gian hoàn thành ước tính như sau:

| Phương pháp | Tổng nỗ lực (Effort) | Thời gian hoàn thành (Duration) | Ghi chú |
| :--- | :---: | :---: | :--- |
| **Dựa trên LOC** | 73.4 PM | **~18.4 Tháng** | Bao gồm cả thời gian làm mượt UI/UX và Refactor. |
| **Dựa trên FP** | 16.1 PM | **~4.0 Tháng** | Chỉ tính thời gian hoàn thiện logic nghiệp vụ lõi. |
| **Thực tế đề xuất** | **~40.0 PM** | **~10.0 Tháng** | Mức trung bình khả thi cho team 4 người hoàn thiện cả FE và BE. |

**Nhận xét:** Với team 4 người, dự án sẽ kéo dài khoảng **10 đến 18 tháng** tùy thuộc vào mức độ chau chuốt giao diện. Nếu muốn rút ngắn xuống dưới 6 tháng với team 4 người, cần cắt giảm các tính năng không cốt lõi (Phase 2) hoặc sử dụng các bộ thư viện UI có sẵn để giảm tải lượng code Frontend.
