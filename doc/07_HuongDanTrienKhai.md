# HƯỚNG DẪN TRIỂN KHAI VÀ CÀI ĐẶT (DEPLOYMENT & USER MANUAL)

## 1. Giới thiệu sơ lược

Tài liệu hướng dẫn cung cấp quy trình từng bước từ A-Z để cài đặt, thiết lập môi trường Cơ sở dữ liệu, cấu hình Source Code và khởi chạy toàn bộ Hệ thống Thương mại Điện tử. Đây là "cẩm nang" bắt buộc để **Giảng Viên** và các **Cộng sự** có thể nạp mã nguồn dự án về và tự chạy trên máy tính cá nhân của mình để nghiệm thu đánh giá.

### 🚀 Checklist Trước khi chạy máy (Pre-flight Checks)

Giảng viên/Người đánh giá có thể dựa theo bảng kiểm dưới đây để chắc chắn mình không bỏ sót bước cấu hình quan trọng nào trước khi bật nắp Server:

| Nhiệm vụ (Task Checklist) | Trạng thái mong muốn | Công cụ (Tools) |
|---|---|---|
| 1. Tải toàn bộ Source Code từ Github (`main` branch) | ✅ Đã tải về máy | `git clone` |
| 2. Cài đặt Core Engine (Node.js & MongoDB Server) | ✅ Đã cài đặt xong | Download cài file .EXE |
| 3. Import bộ Dữ liệu Cửa hàng mẫu (Seed Data) | ⏳ Đợi thực hiện | Chạy file script JS |
| 4. Khai báo chuỗi Bảo mật Môi trường (`.env`) | ⏳ Đợi lấy Key gốc | Trình duyệt VS Code |
| 5. Cài gói thư viện phụ thuôc (`npm install`) | ⏳ Đợi chạy | Dòng lệnh Terminal |
| 6. Khởi động Web và Check kết quả mua hàng | ⏳ Nghiệm thu | Trình duyệt Chrome |

> **Ghi chú thực tế (05/03/2026):** Tài liệu này đã được cập nhật dựa trên **biên bản triển khai thực tế** — ghi lại toàn bộ quá trình clone, cài đặt, kết nối CSDL, import dữ liệu và khắc phục các sự cố phát sinh khi triển khai trên máy tính cá nhân Windows (khanhtrang), có sự hỗ trợ của AI Assistant (Antigravity).

---

## 2. Yêu cầu Cấu hình Hệ thống (Prerequisites)

### 2.1 Sơ đồ Mạng cục bộ Sinh viên (Local Environment Map)

Đây là bức tranh tổng thể dòng chảy dữ liệu trên 1 chiếc máy tính ở lần chạy trải nghiệm đầu tiên:

```mermaid
graph LR
    A[Trình duyệt Giám khảo] -->|http://khanhtrang:3000| B(Frontend React - Port 3000)
    B -->|Axios FETCH Protocol| C(Backend Node - Port 3001)
    C -->|Mongoose DB_URI| D[(MongoDB Database - Port 27017)]
```

### 2.2 Danh sách Cài đặt Yếu nhân

Trước khi cài đặt mã nguồn, kỹ sư vận hành/giảng viên cần đảm bảo máy tính đã được cài đặt tối thiểu các nền tảng sau:

1. **Git:** Công cụ quản lý kho lưu trữ để tải nguyên xi thư mục code gốc từ nền tảng Github của nhóm về máy.
2. **Node.js (khuyến nghị v20.x trở lên):** Môi trường chạy kỹ thuật số bắt buộc. Khi cài Node.js, bạn cũng sẽ được tặng kèm công cụ **NPM** (Kho tải thư viện miễn phí dùng cho dự án).
   - Kiểm tra xem máy đã cài chưa bằng cách gõ lệnh vào Terminal: `node -v` và `npm -v`
3. **MongoDB (Nơi trữ dữ liệu):**
   - **Lựa chọn 1 (Offline — chạy trực tiếp trên máy):** Cài đặt **MongoDB Community Server** + phần mềm giao diện **MongoDB Compass**.
   - **Lựa chọn 2 (Dễ nhất — cần Internet):** Không cần cài thêm gì, nhóm đã cấu hình tự động trỏ kho dữ liệu lên **MongoDB Atlas Cloud**.
4. **Trình soạn thảo mã (IDE):** Khuyến nghị cài VS Code (Visual Studio Code) để dễ mở thư mục đồ án lên xem.

### Thông tin môi trường thực tế (đã kiểm chứng)

| Thành phần | Phiên bản / Cấu hình |
|---|---|
| Hệ điều hành | Windows (PowerShell) |
| Node.js | v20.19.1 |
| MongoDB Server | 8.x |
| Backend Port | 3001 |
| Frontend Port | 3000 |

> **Lưu ý về hostname:** Để truy cập bằng hostname tùy chỉnh, có thể cấu hình file `C:\Windows\System32\drivers\etc\hosts`:
>
> ```
> 127.0.0.1   khanhtrang
> ::1          khanhtrang
> ```
>
> Khi đó tên miền ảo `khanhtrang` sẽ trỏ về cùng địa chỉ gốc `127.0.0.1` như localhost.

---

## 3. Cấu trúc Source Code

Sau khi bạn git clone dự án về, sẽ thấy cấu trúc thư mục sau:

```
cnpm-solution/
├── be-cnpm/        ← Backend Node.js + Express
├── fe-cnpm/        ← Frontend ReactJS
├── database/       ← Scripts seed & dữ liệu export
├── doc/            ← Tài liệu báo cáo dự án
├── sqa/            ← Tài liệu SQA
└── urd/            ← Tài liệu URD
```

---

## 4. Bước 1 — Clone Source Code từ GitHub

Mở PowerShell, chuyển vào thư mục làm việc và clone repo:

```powershell
cd d:\CNPM\WIP
git clone https://github.com/tran-khanhtrang/cnpm-solution.git
```

**Kết quả:** Tải về toàn bộ objects (~113 MB), giải nén 509 files. Dự án được tạo tại `cnpm-solution/`.

---

## 5. Bước 2 — Cài đặt Dependencies

### 5.1. Backend (`be-cnpm`)

```powershell
cd be-cnpm
npm install
```

**Kết quả:** Cài đặt thành công ~296 packages (Express, Mongoose, JWT, Bcrypt, Nodemailer...).

> ⚠️ Có thể xuất hiện cảnh báo `high severity vulnerabilities` — đây là vấn đề thường gặp với các thư viện cũ, không ảnh hưởng đến hoạt động trong môi trường demo/nội bộ.

### 5.2. Frontend (`fe-cnpm`)

```powershell
cd fe-cnpm
npm install --legacy-peer-deps
```

> **Lý do dùng `--legacy-peer-deps`:** Frontend dùng React 18 và một số thư viện có peer dependency conflict (antd, react-slick...). Cờ này cho phép npm bỏ qua conflict và cài đặt bình thường.
>
> Nếu hệ thống báo lỗi `ERESOLVE conflicts`, đây cũng là lý do cần thêm cờ đó.

**Kết quả:** Cài đặt thành công ~1.672 packages.

---

## 6. Bước 3 — Cấu hình Biến Môi trường (.env)

### 6.1. Backend — Tạo file `be-cnpm/.env`

Tạo file `.env` tại thư mục gốc của `be-cnpm` (ngang hàng với `package.json`):

```env
PORT=3001
Mongo_DB=mongodb://127.0.0.1:27017/thuyloi-n5
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret
EMAIL_APP_PASSWORD=your_email_app_password
EMAIL_FROM=your_email@gmail.com
```

> **Lưu ý quan trọng về MongoDB URI:**
>
> - Dùng `127.0.0.1` thay vì `khanhtrang` để tránh lỗi IPv6 resolution với Mongoose.
> - Trên Windows, Node.js đôi khi resolve `khanhtrang` sang `::1` (IPv6) trong khi MongoDB chỉ lắng nghe trên `127.0.0.1` (IPv4), gây lỗi `TopologyDescription type: Unknown`.
> - Tên biến trong code là `Mongo_DB` (phân biệt hoa thường — phải viết đúng).
> - Nếu dùng MongoDB Atlas Cloud, thay URI thành: `mongodb+srv://admin_n5:pass1234@cluster0.abcxyz.mongodb.net/ecommerceDB?retryWrites=true&w=majority`

### 6.2. Frontend — Tạo file `fe-cnpm/.env`

Tạo file `.env` tại thư mục gốc của `fe-cnpm`:

```env
REACT_APP_API_URL=http://khanhtrang:3001/api
```

> ⚠️ **Bước này cực kỳ quan trọng!** Nếu thiếu file này, toàn bộ API call từ React sẽ bị lỗi:
>
> - `process.env.REACT_APP_API_URL` sẽ là `undefined`
> - URL gọi API sẽ thành `/undefined/product/get-all` → frontend không lấy được dữ liệu dù backend đang chạy bình thường.
> - Nếu dùng hostname tùy chỉnh, thay thành: `REACT_APP_API_URL=http://khanhtrang:3001/api`

---

## 7. Bước 4 — Khởi động Backend

```powershell
cd be-cnpm
npm start
```

Backend dùng `nodemon` để tự động restart khi có thay đổi code.

**Kết quả kỳ vọng trên console:**

```
[nodemon] starting `node src/index.js`
Server is running on port: 3001
Connect Db success!
```

> ⚠️ **Sự cố phát sinh & Cách khắc phục:** Nếu Mongoose báo lỗi `TopologyDescription type: Unknown` — không kết nối được MongoDB dù service đang chạy:
>
> **Nguyên nhân:** File `.env` dùng `khanhtrang` thay vì `127.0.0.1`. Node.js resolve `khanhtrang` sang `::1` (IPv6) trong khi MongoDB chỉ lắng nghe IPv4.
>
> **Cách fix:** Đổi `Mongo_DB=mongodb://khanhtrang:27017/...` thành `Mongo_DB=mongodb://127.0.0.1:27017/...`, sau đó gõ `rs` vào terminal nodemon để restart:
>
> ```
> rs
> ```

---

## 8. Bước 5 — Import Dữ liệu vào MongoDB

Dữ liệu export từ môi trường gốc được lưu tại `database/exported_data/` gồm 3 file JSON:

- `users.json` — 21 tài khoản người dùng
- `products.json` — 500 sản phẩm
- `orders.json` — 50 đơn hàng

### 8.1. Nếu có MongoDB Database Tools (`mongoimport`)

```powershell
mongoimport --uri="mongodb://127.0.0.1:27017/thuyloi-n5" --collection=users --file=database/exported_data/users.json --jsonArray
mongoimport --uri="mongodb://127.0.0.1:27017/thuyloi-n5" --collection=products --file=database/exported_data/products.json --jsonArray
mongoimport --uri="mongodb://127.0.0.1:27017/thuyloi-n5" --collection=orders --file=database/exported_data/orders.json --jsonArray
```

### 8.2. Nếu không có `mongoimport` — Dùng Node.js Script

> **Lưu ý thực tế:** Công cụ `mongoimport.exe` không được cài kèm MongoDB Server (phải cài riêng **MongoDB Database Tools**). Giải pháp thay thế là dùng Node.js script tận dụng module `mongodb` đã có sẵn trong `be-cnpm/node_modules`.

Tạo file `be-cnpm/import_data.js`:

```javascript
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'thuyloi-n5';
// Chỉnh lại đường dẫn cho phù hợp với máy của bạn:
const DATA_DIR = path.join(__dirname, '..', 'database', 'exported_data');

// Hàm convert Extended JSON ($oid, $date) sang native MongoDB types
function convertEJSON(obj) {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) return obj.map(convertEJSON);
    if (typeof obj === 'object') {
        if ('$oid' in obj) return new ObjectId(obj['$oid']);
        if ('$date' in obj) return new Date(obj['$date']);
        if ('$numberDecimal' in obj) return parseFloat(obj['$numberDecimal']);
        if ('$numberLong' in obj) return parseInt(obj['$numberLong']);
        const result = {};
        for (const key of Object.keys(obj)) result[key] = convertEJSON(obj[key]);
        return result;
    }
    return obj;
}

async function importData() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        console.log('✅ Kết nối MongoDB thành công!');
        const db = client.db(DB_NAME);
        for (const col of ['users', 'products', 'orders']) {
            const docs = JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${col}.json`), 'utf-8')).map(convertEJSON);
            const collection = db.collection(col);
            const existing = await collection.countDocuments();
            if (existing > 0) await collection.deleteMany({});
            const result = await collection.insertMany(docs);
            console.log(`✅ Import "${col}": ${result.insertedCount} documents thành công`);
        }
        console.log('🎉 Import toàn bộ dữ liệu hoàn tất!');
    } finally {
        await client.close();
    }
}
importData();
```

> ⚠️ **Quan trọng — Extended JSON Format:** File JSON export từ MongoDB Compass lưu ObjectId và Date theo dạng Extended JSON:
>
> ```json
> { "_id": { "$oid": "69a51ff8..." }, "createdAt": { "$date": "2026-03-02T..." } }
> ```
>
> MongoDB driver không chấp nhận insert trực tiếp format này (lỗi: *`_id fields may not contain '$'-prefixed fields`*). Hàm `convertEJSON()` trong script trên đã xử lý vấn đề này.

**Chạy script:**

```powershell
cd be-cnpm
node import_data.js
```

**Kết quả mong đợi:**

```
✅ Kết nối MongoDB thành công!
✅ Import "users": 21 documents thành công
✅ Import "products": 500 documents thành công
✅ Import "orders": 50 documents thành công
🎉 Import toàn bộ dữ liệu hoàn tất!
```

---

## 9. Bước 6 — Khởi động Frontend

Giữ nguyên tab Terminal của Backend đang chạy, mở một Terminal mới:

```powershell
cd fe-cnpm
npm start
```

**Kết quả kỳ vọng:**

```
Compiled successfully!

You can now view thuyloi-n5 in the browser.
  Local:  http://khanhtrang:3000
```

> ⚠️ **Sự cố phát sinh — Module `ajv` không tương thích:**
>
> Khi chạy lần đầu, React Scripts có thể báo lỗi:
>
> ```
> Cannot find module 'ajv/dist/compile/codegen'
> ```
>
> **Nguyên nhân:** Xung đột version giữa `ajv` (v6 vs v8) trong chuỗi phụ thuộc `webpack-dev-server → schema-utils → ajv-keywords`.
>
> **Cách fix:**
>
> ```powershell
> npm install ajv@^8 --legacy-peer-deps
> ```
>
> Sau đó chạy lại `npm start`.

> ⚠️ **Lưu ý quan trọng:** `create-react-app` chỉ đọc file `.env` khi khởi động, **không hot-reload**. Nếu bạn tạo hoặc sửa file `.env` trong khi server đang chạy, bắt buộc phải dừng (Ctrl+C) và chạy lại `npm start` để cấu hình có hiệu lực.

---

## 10. Kiểm tra & Khắc phục: Frontend không hiển thị dữ liệu

### Triệu chứng

Sau khi cả backend lẫn frontend đều chạy, trang chủ load được nhưng **không hiển thị sản phẩm**.

### Cách phân tích

**Bước 1:** Kiểm tra API backend trực tiếp:

```powershell
Invoke-RestMethod -Uri "http://khanhtrang:3001/api/product/get-all?limit=6" -Method GET
```

Nếu backend trả về dữ liệu bình thường → vấn đề nằm ở frontend.

**Bước 2:** Kiểm tra biến môi trường frontend. Nếu log backend có dòng:

```
Proxy error: Could not proxy request /undefined/product/get-all
```

→ Biến `REACT_APP_API_URL` chưa được định nghĩa.

### Cách khắc phục

Tạo/kiểm tra file `fe-cnpm/.env`, đảm bảo có dòng:

```env
REACT_APP_API_URL=http://khanhtrang:3001/api
```

Sau đó **restart hoàn toàn** React dev server (Ctrl+C rồi `npm start` lại).

---

## 11. Tổng kết — Trạng thái Hệ thống sau Triển khai

| Dịch vụ | Trạng thái | URL / Địa chỉ |
|---|---|---|
| Backend API (Node.js) | ✅ Running | `http://khanhtrang:3001` |
| Frontend (React) | ✅ Running | `http://khanhtrang:3000` |
| MongoDB | ✅ Connected | `127.0.0.1:27017/thuyloi-n5` |
| Users | ✅ Imported | 21 tài khoản |
| Products | ✅ Imported | 500 sản phẩm |
| Orders | ✅ Imported | 50 đơn hàng |

---

## 12. Sổ tay Sử dụng Web (Tài khoản Test)

Do dự án tích hợp hệ thống kiểm duyệt Role Base Access Control (RBAC), nhóm đã đổ sẵn dữ liệu hạt giống (Seed Data) vào MongoDB. Giảng viên có thể dùng thông tin này để kiểm thử nhanh:

### Tài khoản đăng nhập thực tế (sau khi import dữ liệu)

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | `trangtk.ftu@gmail.com` | `n5admin@175tayson` |
| Khách hàng | `khachhang1@gmail.com` | *(xem database)* |

### Tài khoản mặc định (Seed Data)

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin (Toàn quyền) | `admin.n5@gmail.com` | `Password123!` |
| Khách hàng Demo | `khachhang01@gmail.com` | `Password123!` |

### Đường dẫn truy cập

- 🌐 **Trang chủ:** `http://khanhtrang:3000`
- 🔧 **Admin Dashboard:** `http://khanhtrang:3000/system/admin`

---

## 13. Đóng gói & Build Môi trường Mạng thật (Production Deploy)

*(Chỉ dành cho tình huống nếu Đồ án yêu cầu đưa Web chạy Public trên Internet).*

1. **Với Backend:**
   - Cập nhật `.env` port động theo Hosting.
   - Run bằng công cụ cấp Server: `pm2 start src/index.js --name "api-ecommerce"`.
   - Nền tảng Deploy Gợi ý: Render.com hoặc Railway.app.
2. **Với Frontend:**
   - Dừng lệnh Test hiện tại đi. Gõ: `npm run build`.
   - Node sẽ tối ưu và sinh ra thư mục `/build` với các file HTML/CSS/JS thuần tĩnh siêu nhẹ.
   - Đem thư mục `/build` này upload và Deploy public tĩnh trực tiếp trên Vercel hoặc Netlify (Tất cả hoàn toàn miễn phí cho sinh viên).

---

## 14. Bộ Xử lý Lỗi và Lập Hồ Sơ Kỹ Thuật (Troubleshooting & Known Issues)

Trong quá trình cài đặt chạy thử, không hiếm lúc phát sinh các chướng ngại vật ngoại cảnh. Dưới đây là bộ từ điển "Khắc phục nhanh" (FAQ Troubleshoot):

| # | Khái quát Sự cố (Error Name) | Nguyên nhân gốc rễ (Root Cause) | Cách khắc phục Nhanh (Workaround) |
|---|---|---|---|
| 1 | Backend báo `ECONNREFUSED` gãy kết nối Mongo | Window tự phân giải `khanhtrang` sang địa chỉ IPv6 (`::1`), mà MongoDB cài offline chỉ nghe ở IPv4 truyền thống | Sửa chữ `khanhtrang` ở file `.env` thành biến URI số IP cấp thấp: `<mongodb://127.0.0.1:27017>` |
| 2 | Tải Data Seed báo lỗi `$oid not valid for storage` | File mẫu .JSON lấy từ web xuống dính định dạng Extended JSON (Dùng định dạng $oid ngầm), hệ thống cơ bản không bóc tách đọc được. | Sửa code ở hàm đọc Seed bỏ rườm rà, hoặc chạy script `import_data.js` xịn nhóm đã code chuyển nhịp tự động. |
| 3 | Chạy UI Frontend ra màn trắng tinh không thấy Đồ (Blank/Network Err) | Đã chạy FE nhưng bỏ lỡ mất bước Thêm file cấu hình môi trường gốc chỉ cho máy tính biết Backend đang nằm ở đâu. | Tắt màn hình console React đi, tạo và dán cấu hình `.env` cho vào biến `REACT_APP_API_URL`. Gõ `start` lại. |
| 4 | Terminal văng màn viền Đỏ ở `ajv/dist/compile` | NodeJS bị sốc phản vệ phiên bản `Webpack/ajv` do bộ source cũ sinh ra xung đột chuẩn mới trên Windows. | Ép cài đè dứt điểm bằng lệnh Bypass: `npm install ajv@^8 --legacy-peer-deps` |
| 5 | Không upload được Hình Ảnh | Giới hạn dung lượng tải ảnh gốc Base64 của Node.js Express quá nhỏ để nuốt trọn được ảnh kích thước xịn. | Mở `index.js` phía Backend, tăng tham số dung lượng lên Max `app.use(express.json({limit: '50mb'}))` |

---

## 15. Quy trình Bảo trì & Sao lưu Hệ thống (Maintenance & Backup)

Để dự án không "chết yểu" sau ngày chấm điểm môn học, vòng đời phần mềm (SDLC) quy định bắt buộc phải có kế hoạch chăm sóc rủi ro hằng tháng:

- **Bảo trì Khắc phục (Corrective):** Nếu giảng viên bấm thanh toán mà bị kẹt luồng đỏ chót, Kỹ sư phải vào Database xóa kẹt lệnh ngay lập tức và tung bản vá lỗi khẩn cấp (Hot-fix).
- **Bảo trì Thích ứng (Adaptive):** Giả sử cuối năm 2026 Google Chrome đổi bộ quy tắc lõi hoặc MongoDB ra mắt phiên bản mới, nhóm sẽ nâng cấp các Driver tương ứng để Web vẫn chạy mượt mà không bị "hết đát".
- **Lịch Sao lưu An toàn (Backup Routine):** Cứ định kỳ Chủ Nhật hàng tuần, một con Bot tự động sẽ copy toàn bộ kho dữ liệu `ecommerceDB` nén thành file Zip gửi về email của trưởng nhóm để phòng hờ trường hợp bị Hacker vào phá sập dữ liệu cũ.

---

*Tài liệu được cập nhật và biên soạn bởi: Trần Khánh Trang (232248749) — Nhóm 5, Học phần CNPM TLU 2025–2026.*
*Cập nhật lần cuối: 05/03/2026 — Tích hợp biên bản triển khai thực tế với sự hỗ trợ của AI Assistant (Antigravity / Google DeepMind).*
