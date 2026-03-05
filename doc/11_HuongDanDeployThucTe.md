# HƯỚNG DẪN DEPLOY HỆ THỐNG THỰC TẾ (BIÊN BẢN TRIỂN KHAI — 05/03/2026)

> **Ghi chú:** Tài liệu này ghi lại **toàn bộ quá trình triển khai thực tế** hệ thống Thủy Lợi N5 trên máy tính cá nhân (localhost), bao gồm từng bước Clone source code, cài đặt môi trường, kết nối CSDL, import dữ liệu và khắc phục các sự cố phát sinh. Được thực hiện vào ngày **05/03/2026** với sự hỗ trợ của AI Assistant (Antigravity / Google DeepMind).

---

## 1. Thông tin Môi trường Triển khai

| Thành phần | Phiên bản / Cấu hình |
|---|---|
| Hệ điều hành | Windows (PowerShell) |
| Node.js | v20.19.1 |
| npm | Đi kèm Node.js |
| MongoDB Server | 8.x (Service đang chạy tại `D:\database\MongoDB\Server\8.2`) |
| MongoDB Shell | `D:\database\MongoDB\Shell\mongosh` |
| Thư mục dự án | `d:\CNPM\WIP\cnpm-solution` |
| Backend Port | 3001 |
| Frontend Port | 3000 |

> **Lưu ý về hostname:** File `C:\Windows\System32\drivers\etc\hosts` đã được cấu hình sẵn:
> ```
> 127.0.0.1   khanhtrang
> ::1          khanhtrang
> ```
> Do đó `khanhtrang` và `localhost` đều trỏ về cùng một địa chỉ `127.0.0.1` trên máy này.

---

## 2. Bước 1 — Clone Source Code từ GitHub

Mở PowerShell và chuyển vào thư mục làm việc, sau đó clone repo:

```powershell
cd d:\CNPM\WIP
git clone https://github.com/tran-khanhtrang/cnpm-solution.git
```

**Kết quả đạt được:**
- Tải về toàn bộ 800 objects (~113 MB), giải nén 509 files
- Dự án được tạo tại `d:\CNPM\WIP\cnpm-solution`
- Cấu trúc thư mục sau khi clone:

```
cnpm-solution/
├── be-cnpm/        ← Backend Node.js + Express
├── fe-cnpm/        ← Frontend ReactJS
├── database/       ← Scripts seed & dữ liệu export
├── doc/            ← Tài liệu dự án
├── sqa/            ← Tài liệu SQA
└── urd/            ← Tài liệu URD
```

---

## 3. Bước 2 — Cài đặt Dependencies

### 3.1. Backend (`be-cnpm`)

```powershell
cd d:\CNPM\WIP\cnpm-solution\be-cnpm
npm install
```

**Kết quả:** Cài đặt thành công **296 packages** (bao gồm Express, Mongoose, JWT, Bcrypt, Nodemailer...).

> ⚠️ Có 5 cảnh báo `high severity vulnerabilities` — đây là vấn đề thường gặp với các dự án dùng thư viện cũ, không ảnh hưởng đến hoạt động trong môi trường demo/nội bộ.

### 3.2. Frontend (`fe-cnpm`)

```powershell
cd d:\CNPM\WIP\cnpm-solution\fe-cnpm
npm install --legacy-peer-deps
```

> **Lý do dùng `--legacy-peer-deps`:** Frontend dùng React 18 và một số thư viện có peer dependency conflict với nhau (antd, react-slick...). Cờ này cho phép npm bỏ qua conflict và cài đặt bình thường.

**Kết quả:** Cài đặt thành công **1.672 packages**.

---

## 4. Bước 3 — Cấu hình Biến Môi trường (.env)

### 4.1. Backend — Tạo file `be-cnpm/.env`

Tạo file mới `.env` tại thư mục gốc của `be-cnpm`:

```env
PORT=3001
Mongo_DB=mongodb://127.0.0.1:27017/thuyloi-n5
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret
EMAIL_APP_PASSWORD=your_email_app_password
EMAIL_FROM=your_email@gmail.com
```

> **Lưu ý quan trọng về MongoDB URI:**
> - Dùng `127.0.0.1` thay vì `localhost` để tránh lỗi IPv6 resolution với Mongoose 6.x.
> - Trên máy này, cả hai đều hợp lệ (vì `khanhtrang` → `127.0.0.1` qua hosts file), nhưng `127.0.0.1` là chắc chắn nhất.
> - Tên biến trong code là `Mongo_DB` (phân biệt hoa thường — phải viết đúng).

### 4.2. Frontend — Tạo file `fe-cnpm/.env`

Tạo file `.env` tại thư mục gốc của `fe-cnpm`:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

> **Đây là bước cực kỳ quan trọng!** Nếu thiếu file này, toàn bộ API call từ React sẽ bị lỗi:
> - `process.env.REACT_APP_API_URL` sẽ là `undefined`
> - URL gọi API sẽ thành `/undefined/product/get-all` → frontend không lấy được dữ liệu dù backend đang chạy bình thường.

---

## 5. Bước 4 — Khởi động Backend

```powershell
cd d:\CNPM\WIP\cnpm-solution\be-cnpm
npm start
```

Backend dùng `nodemon` để tự động restart khi có thay đổi code.

**Kết quả kỳ vọng trên console:**
```
[nodemon] starting `node src/index.js`
Server is running on port: 3001
Connect Db success!
```

> ⚠️ **Sự cố phát sinh & Cách khắc phục:** Lần đầu start, Mongoose báo lỗi `TopologyDescription type: Unknown` — không kết nối được MongoDB dù service đang chạy.
>
> **Nguyên nhân:** Khi đó file `.env` dùng `localhost` thay vì `127.0.0.1`. Trên một số hệ thống Windows, Node.js resolve `localhost` sang `::1` (IPv6) trong khi MongoDB chỉ lắng nghe trên `127.0.0.1` (IPv4).
>
> **Cách fix:** Đổi `Mongo_DB=mongodb://localhost:27017/...` thành `Mongo_DB=mongodb://127.0.0.1:27017/...`, sau đó gõ `rs` vào terminal nodemon để restart:
> ```
> rs
> ```

---

## 6. Bước 5 — Import Dữ liệu vào MongoDB

Dữ liệu xuất khẩu từ môi trường gốc được lưu tại `database/exported_data/` gồm 3 file JSON:
- `users.json` — 21 tài khoản người dùng
- `products.json` — 500 sản phẩm
- `orders.json` — 50 đơn hàng

### 5.1. Vấn đề phát sinh với `mongoimport`

Công cụ `mongoimport.exe` không có trong PATH hệ thống và không được cài đặt cùng MongoDB Server (phải cài riêng **MongoDB Database Tools**).

**Giải pháp thay thế:** Viết Node.js script tận dụng module `mongodb` đã có sẵn trong `node_modules` của `be-cnpm`.

### 5.2. Script Import — `be-cnpm/import_data.js`

```javascript
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'thuyloi-n5';
const DATA_DIR = 'd:\\CNPM\\WIP\\cnpm-solution\\database\\exported_data';

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
        const db = client.db(DB_NAME);
        for (const col of ['users', 'products', 'orders']) {
            const docs = JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${col}.json`), 'utf-8')).map(convertEJSON);
            const collection = db.collection(col);
            const existing = await collection.countDocuments();
            if (existing > 0) await collection.deleteMany({});
            const result = await collection.insertMany(docs);
            console.log(`✅ Import "${col}": ${result.insertedCount} documents`);
        }
    } finally {
        await client.close();
    }
}
importData();
```

> ⚠️ **Sự cố quan trọng — Extended JSON Format:** File JSON export từ MongoDB Compass lưu ObjectId và Date theo dạng Extended JSON:
> ```json
> { "_id": { "$oid": "69a51ff8..." }, "createdAt": { "$date": "2026-03-02T..." } }
> ```
> MongoDB driver không chấp nhận insert trực tiếp format này (lỗi: *`_id fields may not contain '$'-prefixed fields`*). Phải dùng hàm `convertEJSON()` để convert trước.

### 5.3. Chạy script

```powershell
cd d:\CNPM\WIP\cnpm-solution\be-cnpm
node import_data.js
```

**Kết quả:**
```
✅ Kết nối MongoDB thành công!
✅ Import "users": 21 documents thành công
✅ Import "products": 500 documents thành công
✅ Import "orders": 50 documents thành công
🎉 Import toàn bộ dữ liệu hoàn tất!
```

---

## 7. Bước 6 — Khởi động Frontend

```powershell
cd d:\CNPM\WIP\cnpm-solution\fe-cnpm
npm start
```

> ⚠️ **Sự cố phát sinh — Module `ajv` không tương thích:**
>
> Khi chạy lần đầu, React Scripts báo lỗi:
> ```
> Cannot find module 'ajv/dist/compile/codegen'
> ```
> **Nguyên nhân:** Xung đột version giữa `ajv` (v6 vs v8) trong chuỗi phụ thuộc `webpack-dev-server → schema-utils → ajv-keywords`.
>
> **Cách fix:**
> ```powershell
> npm install ajv@^8 --legacy-peer-deps
> ```
> Sau đó chạy lại `npm start`.

**Kết quả kỳ vọng:**
```
Compiled successfully!

You can now view thuyloi-n5 in the browser.
  Local:  http://localhost:3000
```

---

## 8. Bước 7 — Kiểm tra & Khắc phục: Frontend không hiển thị dữ liệu

### Triệu chứng
Sau khi cả backend lẫn frontend đều chạy, trang chủ load được nhưng **không hiển thị sản phẩm**. React Query DevTools cho thấy `Data: null`.

### Phân tích nguyên nhân

1. **Kiểm tra API backend trực tiếp** bằng PowerShell:
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3001/api/product/get-all?limit=6" -Method GET
   ```
   → **Backend trả về 500 sản phẩm bình thường** (status: OK).

2. **Kiểm tra frontend service** (`fe-cnpm/src/services/ProductService.js`):
   ```javascript
   // Tất cả API call đều dùng biến môi trường:
   axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`)
   ```

3. **Kết luận:** Biến `REACT_APP_API_URL` chưa được định nghĩa → URL thực tế là `/undefined/product/get-all` → HTTP 500/404.

   *Bằng chứng trong log backend:* `Proxy error: Could not proxy request /undefined/product/get-all`

### Cách khắc phục

Tạo file `fe-cnpm/.env` (đã thực hiện ở Bước 3.2), sau đó **bắt buộc restart hoàn toàn** React dev server (vì `create-react-app` chỉ đọc `.env` khi khởi động, không hot-reload):

```powershell
# Dừng process frontend hiện tại (Ctrl+C), sau đó:
npm start
```

**Kết quả sau fix:** Dữ liệu 500 sản phẩm hiển thị đầy đủ trên giao diện.

---

## 9. Tổng kết — Trạng thái Hệ thống sau Triển khai

| Dịch vụ | Trạng thái | URL / Địa chỉ |
|---|---|---|
| Backend API (Node.js) | ✅ Running | `http://localhost:3001` |
| Frontend (React) | ✅ Running | `http://localhost:3000` |
| MongoDB | ✅ Connected | `127.0.0.1:27017/thuyloi-n5` |
| Users | ✅ Imported | 21 tài khoản |
| Products | ✅ Imported | 500 sản phẩm |
| Orders | ✅ Imported | 50 đơn hàng |

### Tài khoản đăng nhập thực tế

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | `trangtk.ftu@gmail.com` | `n5admin@175tayson` |
| Khách hàng | `khachhang1@gmail.com` | *(xem database)* |

### Đường dẫn truy cập

- 🌐 **Trang chủ:** `http://localhost:3000`
- 🔧 **Admin Dashboard:** `http://localhost:3000/system/admin`

---

## 10. Danh sách Sự cố & Bài học Kinh nghiệm

| # | Sự cố | Nguyên nhân | Cách khắc phục |
|---|---|---|---|
| 1 | Backend không kết nối MongoDB | `localhost` resolve sang IPv6 (`::1`), MongoDB chỉ listen IPv4 | Đổi URI sang `127.0.0.1` |
| 2 | `mongoimport` không tìm thấy | Chỉ cài MongoDB Server, không có MongoDB Database Tools | Dùng Node.js script thay thế |
| 3 | Import lỗi `$oid not valid for storage` | File JSON dùng Extended JSON format, không phải JSON thuần | Viết hàm `convertEJSON()` để convert trước khi insert |
| 4 | Frontend lỗi `ajv/dist/compile/codegen` | Xung đột version `ajv` trong `webpack-dev-server` | `npm install ajv@^8 --legacy-peer-deps` |
| 5 | Frontend không hiển thị dữ liệu | Thiếu file `.env` → `REACT_APP_API_URL` undefined | Tạo `fe-cnpm/.env` với giá trị đúng, restart React |

---

*Tài liệu được ghi lại và biên soạn bởi: Trần Khánh Trang (232248749) — với sự hỗ trợ của AI Assistant (Antigravity / Google DeepMind) — hỗ trợ triển khai thực tế ngày 05/03/2026.*
*Dự án: Thủy Lợi N5 eCommerce — Nhóm 5, Học phần CNPM TLU 2025–2026.*
