# HƯỚNG DẪN TRIỂN KHAI VÀ CÀI ĐẶT (DEPLOYMENT & USER MANUAL)

## 1. Giới thiệu sơ lược

Tài liệu hướng dẫn cung cấp quy trình từng bước từ A-Z để cài đặt, thiết lập môi trường Cơ sở dữ liệu, cấu hình Source Code và khởi chạy toàn bộ Hệ thống Thương mại Điện tử. Đây là "cẩm nang" bắt buộc để **Giảng Viên** và các **Cộng sự** có thể nạp mã nguồn dự án về và tự chạy trên máy tính cá nhân của mình (**Localhost** – môi trường máy tính cục bộ offline) để nghiệm thu đánh giá.

## 2. Yêu cầu Cấu hình Hệ thống (Prerequisites)

Trước khi cài đặt mã nguồn, kỹ sư vận hành/giảng viên cần đảm bảo máy tính đã được cài đặt tối thiểu các nền tảng sau:

1. **Git:** Công cụ quản lý kho lưu trữ để tải nguyên xi thư mục code gốc từ nền tảng Github của nhóm về máy.
2. **Node.js:** Môi trường chạy kỹ thuật số bắt buộc. Khi cài Node.js, bạn cũng sẽ được tặng kèm công cụ **NPM** (Kho kho tải thư viện miễn phí dùng cho dự án).
   - Kiểm tra xem máy đã cài chưa bằng cách gõ lệnh vào màn hình đen (Terminal CMD): `node -v` và `npm -v`
3. **MongoDB (Nơi trữ dữ liệu):**
   - Lựa chọn 1 (Chạy trực tiếp trên máy không cần mạng): Cài đặt MongoDB Community + Phần mềm hình ảnh MongoDB Compass.
   - Lựa chọn 2 (Dễ nhất - Đã được gài sẵn mạng Internet): Không cần cài thêm bất cứ gì, nhóm đã cấu hình tự động trỏ kho dữ liệu lên kho lưới đám mây (MongoDB Atlas Cloud).
4. **Trình soạn thảo mã (IDE):** Khuyến nghị cài VS Code (Visual Studio Code) để dễ mở thư mục đồ án lên xem.

## 3. Cấu trúc Source Code

Sau khi bạn giải nén (hoặc git clone) dự án về thư mục `d:\zNeurals\cnpm\WIP\solution`, sẽ thấy 2 khối kiến trúc độc lập (Tách biệt hoàn toàn API và UI):

- Thư mục `/be-cnpm`: Chứa toàn bộ Backend (Node.js, Express, xử lý Data).
- Thư mục `/fe-cnpm`: Chứa toàn bộ Frontend (ReactJS, Redux, Giao diện Web).
- Thư mục `/doc`: Lưu trữ tài liệu báo cáo dự án.

## 4. Hướng dẫn Khởi chạy Máy chủ API (Backend - Node.js)

**Bước 1: Mở thư mục gốc Backend**
Bật Terminal (CMD/PowerShell) trỏ vào đường dẫn backend:

```bash
cd be-cnpm
```

**Bước 2: Cài đặt thư viện phụ thuộc (Dependencies)**
Với sự trợ giúp của package.json, NPM tự động kéo tất cả modules cần thiết về máy:

```bash
npm install
```

**Bước 3: Thiết lập Biến môi trường (.env)**
Tạo một tệp mới tên là `.env` đặt ngay tại thư mục root của `/be-cnpm` (ngang hàng `package.json`). Viết vào đó các cấu hình nhạy cảm sau (Đội phát triển đã cấu hình sẵn URI chạy test):

```env
PORT=3001
MONGO_DB=mongodb+srv://admin_n5:pass1234@cluster0.abcxyz.mongodb.net/ecommerceDB?retryWrites=true&w=majority
ACCESS_TOKEN=bi_mat_access_jwt_string_cnpm
REFRESH_TOKEN=bi_mat_refresh_jwt_string_cnpm
CLIENT_ID=dia_chi_frontend_cors_hoac_client_oauth
```

*(Nếu MongoDB URI không truy cập được do đóng Cloud, vui lòng sửa lại thành Local URI: `mongodb://localhost:27017/ecommerceDB`)*

**Bước 4: Bật máy chủ Backend**
Khởi động Node.js server dưới chế độ Monitor để theo dõi log nóng.

```bash
npm start
```

*Kết quả Terminal báo chữ xanh: "Server is running in port 3001" và "Connect Database success" là thành công!*

---

## 5. Hướng dẫn Khởi chạy Máy trạm (Frontend - ReactJS)

**Bước 1: Mở Tab Terminal thứ hai cho Frontend**
Giữ nguyên tab Terminal của Backend đang chay, thu nhỏ lại, mở một Terminal mới:

```bash
cd fe-cnpm
```

**Bước 2: Cài đặt thư viện Frontend**
(Thư mục Front-end có khối lượng package khá nặng do chứa Ant Design và các tool React đồ sộ). Chạy lệnh và đợi khoảng 1-3 phút:

```bash
npm install
# Nếu hệ thống báo lỗi ERESOLVE conflicts (do phiên bản React >18), chạy ép cờ:
npm install --legacy-peer-deps 
```

**Bước 3: Thiết lập Endpoint API Base (.env)**
Tương tự Backend, sinh ra file `.env` tại gốc thư mục `/fe-cnpm`, chỉ ra Frontend biết nơi Backend đang đứng chờ API:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

**Bước 4: Khởi chạy Giao diện Frontend**

```bash
npm start
```

*Hệ thống Webpack sẽ Pack file và tự động bật trình duyệt mặc định vào URL: `http://localhost:3000`.*

---

## 6. Sổ tay sử dụng Web (Tài khoản Test Gầm)

Do dự án tích hợp hệ thống kiểm duyệt Role Base Access Control (RBAC), nhóm đã đổ sẵn dữ liệu hạt giống (Seed Data) vào MongoDB. Giảng viên có thể dùng thông tin này để kiểm thử nhanh mà không cần mất công tạo lại user mới:

- **Tài khoản Admin (Toàn quyền quản trị v1.0, Xem Dashboard, Xuất Excel):**
  - Email: `admin.n5@gmail.com`
  - Password: `Password123!`

- **Tài khoản Khách mua hàng Demo:**
  - Email: `khachhang01@gmail.com`
  - Password: `Password123!`

## 7. Đóng gói & Build Môi trường Mạng thật (Production Deploy)

*(Chỉ dành cho tình huống nếu Đồ án yêu cầu đưa Web chạy Public trên Internet).*

1. **Với Backend:**
   - Cập nhật `.env` port động theo Hosting.
   - Run bằng công cụ cấp Server: `pm2 start src/index.js --name "api-ecommerce"`.
   - Nền tảng Deploy Gợi ý: Render.com hoặc Railway.app.
2. **Với Frontend:**
   - Dừng lệnh Test hiện tại đi. Gõ: `npm run build`.
   - Node sẽ tối ưu và sinh ra thư mục `/build` với các file HTML/CSS/JS thuần tĩnh siêu nhẹ.
   - Đem thư mục `/build` này upload và Deploy public tĩnh trực tiếp trên Vercel hoặc Netlify (Tất cả hoàn toàn miễn phí cho sinh viên).

## 8. Quy trình Bảo trì & Sao lưu Hệ thống (Maintenance & Backup)

Để dự án không "chết yểu" sau ngày chấm điểm môn học, vòng đời phần mềm (SDLC) quy định bắt buộc phải có kế hoạch chăm sóc rủi ro hằng tháng:

- **Bảo trì Khắc phục (Corrective):** Nếu giảng viên bấm thanh toán mà bị kẹt luồng đỏ chót, Kỹ sư phải vào Database xóa kẹt lệnh ngay lập tức và tung bản vá lỗi khẩn cấp (Hot-fix).
- **Bảo trì Thích ứng (Adaptive):** Giả sử cuối năm 2026 Google Chrome đổi bộ quy tắc lõi hoặc MongoDB ra mắt phiên bản v8, nhóm sẽ nâng cấp các Driver tương ứng để Web vẫn chạy mượt mà không bị "hết đát".
- **Lịch Sao lưu An toàn (Backup Routine):** Cứ định kỳ Chủ Nhật hàng tuần, một con Bot tự động sẽ copy toàn bộ kho dữ liệu `ecommerceDB` nén thành file Zip gửi về email của trưởng nhóm để phòng hờ trường hợp bị Hacker vào phá sập dữ liệu cũ.
