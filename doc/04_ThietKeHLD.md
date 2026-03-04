# TÀI LIỆU THIẾT KẾ CẤP CAO (HLD - High-Level Design)

## 1. Kiến trúc Hệ thống (Architecture)

Hệ thống sử dụng mô hình **Client-Server Architecture** (Kiến trúc Khách - Chủ) tiêu chuẩn. Việc giao tiếp giữa UI trên trình duyệt người dùng và Máy chủ đều tuân thủ qua định tuyến **RESTful APIs** (Chuẩn giao thức gửi và nhận dữ liệu an toàn trên diện rộng của Internet).

```mermaid
graph TD
    Browser[Trình duyệt Khách hàng] -->|Render| UI[Frontend App - ReactJS / Redux]
    UI <--> |HTTP Requests / JSON / REST| API[Backend RESTful API - Node.js/Express]
    API <--> |Mongoose ODM (Driver)| DB[(Database - MongoDB)]
```

### 1.1 Tầng Frontend (ReactJS/SPA)

Tuân theo mô hình phân lớp Component - Caching - Global State:

- **Components:** Các "Viên gạch" đồ họa chia nhỏ, có tính tái sử dụng cao như Giao diện một nút bấm, Menu phía trên (Header), Khung thông tin một thẻ sản phẩm. Chúng được ghép vào nhau như Lego để ra giao diện lớn.
- **Pages (Trang):** Tập hợp trọn vẹn các thành phần màn hình độc lập như Trang Chủ, Trang Chi Tiết Sản Phẩm, Trang Admin Quản trị.
- **Redux/Toolkit:** Kho tàng lưu trữ dữ liệu thông tin toàn cục trên mặt web (Ví dụ giúp các trang nhớ được bạn đang đăng nhập là Mẹ Bé Bông, nhớ được Giỏ hàng Của bạn đang có 3 hộp sữa mà không cần gọi hỏi máy chủ).
- **React Query:** Bộ công cụ xịn làm nhiệm vụ đi "đòi" dữ liệu từ máy chủ API đem về cho màn hình, có khả năng ghi nhớ đệm (Caching) để cùng 1 câu hỏi sẽ ưu tiên đem kho đã nhớ ra cho bạn xem nhanh thay vì cất công gọi máy điện báo lại.

### 1.2 Tầng Backend (Logical Server)

Xây dựng trên Runtime Environment NodeJS, framework Express tuân theo dạng **Route -> Controller -> Service Model**. Cắt giảm phụ thuộc code logic chồng chéo:

- **Routes (`src/routes`):** Định tuyến URL endpoint từ các HTTP methods (GET, POST, PUT, DELETE). Routing check Auth tại đây.
- **Controllers (`src/controllers`):** Xử lý input từ client gửi lên (Req.body, Req.params), điều phối kết quả trả về đúng format Response (JSON).
- **Services (`src/services`):** Khối lõi logic nghiệp vụ sâu (logic tính toán doanh thu, mã hóa, transaction).
- **Models (`src/models`):** Khai báo schema chuẩn từ Mongoose ánh xạ vào các Collection riêng tại MongoDB.

## 2. Thiết kế Cơ sở Dữ liệu (Database Schema / Entities)

Hệ thống sử dụng MongoDB là Cơ sở dữ liệu phi quan hệ (NoSQL), do đó các bản ghi được lưu dưới dạng "Tài liệu" (Documents / JSON Object) rất linh hoạt thay vì ép vào khung Dạng bảng (Tables) cứng nhắc như SQL truyền thống. Dưới đây là Sơ đồ quan hệ thực thể (ERD) và cấu trúc cốt lõi:

### 2.1 Sơ đồ Quan hệ Thực thể (ERD)

```mermaid
erDiagram
    USER ||--o{ ORDER : "tạo (đặt) nhiều"
    ORDER }o--|{ PRODUCT : "chứa/bao gồm nhiều"
    
    USER {
        ObjectID _id PK
        String name
        String email "Mới & Duy nhất"
        String password "Đã băm mã hóa"
        Boolean isAdmin "Mặc định: false"
        String phone
        String address
    }
    
    PRODUCT {
        ObjectID _id PK
        String name "Duy nhất"
        String image "Link ảnh URL"
        String type "Danh mục"
        Number price "Giá bán"
        Number countInStock "Lượng hàng tồn"
        Number rating "Trung bình sao"
        String description
        Number discount
    }
    
    ORDER {
        ObjectID _id PK
        ObjectID user_id FK "Chỉ tới User"
        List orderItems "Chứa List Product"
        Object shippingAddress
        String paymentMethod
        Number totalPrice
        Boolean isPaid
        Boolean isDelivered
        Date createdAt "Thời gian tự sinh"
    }
```

### 2.2 Đặc tả Thực thể: `User` (Tài khoản)

- `_id`: ObjectID
- `name`: String (Required)
- `email`: String (Required + Unique)
- `password`: String (Required, được Hash BCrypt)
- `isAdmin`: Boolean (Default false)
- `phone`: String
- `address`: String

### 2.3 Đặc tả Thực thể: `Product` (Sản phẩm)

- `_id`: ObjectID
- `name`: String (Unique)
- `image`: String (URL or Base64 encode)
- `type`: String (Category)
- `price`: Number
- `countInStock`: Number (Phục vụ nghiệp vụ bán hàng)
- `rating`: Number (Mức đánh giá)
- `description`: String (Mô tả thông tin chi tiết item)
- `discount`: Number

### 2.4 Đặc tả Thực thể: `Order` (Đơn đặt hàng)

- `_id`: ObjectID
- `orderItems`: Array of Object `{ name, amount, image, price, product(Ref: ObjectID) }`
- `shippingAddress`: Object `{ fullName, address, city, phone }`
- `paymentMethod`: String (VD: FAST, GOJEK, CASH...)
- `itemsPrice`: Number
- `shippingPrice`: Number (Phí giao hàng)
- `totalPrice`: Number (Tổng giá bill cuối cùng)
- `user`: ObjectID (Ref to `User`)
- `isPaid`: Boolean (Xác nhận thu tiền)
- `paidAt`: Date
- `isDelivered`: Boolean
- `deliveredAt`: Date
- `createdAt` / `updatedAt`: Timestamps tự sinh **(Cực kỳ quan trọng để vẽ biểu đồ và xuất báo cáo KPI Revenue)**.

## 3. Sequence Diagram (Luồng Đặt hàng cốt yếu - Checkout flow logic)

Dưới đây là lưu đồ hoạt động ở nghiệp vụ nhạy cảm và quan trọng nhất: Đặt hàng xử lý giao dịch cơ bản.

```mermaid
sequenceDiagram
    participant U as User (Frontend)
    participant C as Order Controller (Backend)
    participant S as Order Service
    participant DB as MongoDB
    
    U->>C: POST `api/order/create` (Req_Body chứa thông tin Giỏ Hàng)
    activate C
    C->>S: createOrder(Req.body.data)
    activate S
    S->>DB: Kiểm tra số lượng tồn kho từng item (`countInStock`)
    DB-->>S: Trả về trạng thái Inventory
    
    alt Không đủ tồn kho (Out of Stock)
        S-->>C: Data báo Lỗi "Hết hàng"
        C-->>U: Trả HTTP 400 - Failed status (SP không đủ hàng bán)
    else Tồn kho đầy đủ (Sufficient)
        S->>DB: Trừ đi lượng hàng đã đặt (Update Product Inventory)
        S->>DB: Lưu Đơn hàng mới (Insert new Order record)
        DB-->>S: Trạng thái Order created OK.
        S-->>C: Load dữ liệu hóa đơn kết quả mới nhất
        C-->>U: Trả HTTP 200 - OK, Xóa Cache trên Frontend Giỏ hàng.
    end
    deactivate S
    deactivate C
```

## 4. Đặc tả Giao thức Cổng giao tiếp (API Specification)

Khi trình duyệt của người dùng (ReactJS) muốn báo yêu cầu gì cho máy chủ (Node.js) xử lý (như Lấy hàng ra xem, hay Thêm mới hàng), hai bên sẽ tuân thủ dùng đúng 4 loại "Khẩu lệnh" (HTTP Methods) theo chuẩn RESTful.

Dưới đây là thiết kế cổng giao tiếp mạng cơ bản cho luồng Phase 1:

### 4.1. Quy ước (Conventions)

- **Base URL (Cổng gốc):** `http://khanhtrang:3001/api`
- **Định dạng dữ liệu gửi-nhận:** Hoàn toàn bằng chuỗi siêu nhẹ `application/json`.
- **Bảo mật:** Với API của phần cá nhân (Giỏ hàng, Hồ sơ) và API của mục Quản lý đều cần đính kèm "Thẻ nhớ" `Authorization: Bearer <AccessToken>` vào tiêu đề gói tin gửi đi.

### 4.2. Khối API Sản phẩm (Product Endpoint)

| Mã Khẩu Lệnh (Method) | Đường dẫn (URL Endpoint) | Mục đích (Description) | Ai được gọi? | Data trả về (Response) |
|-----------------------|--------------------------|------------------------|--------------|------------------------|
| **GET**               | `/product/get-all`       | Trả về toàn bộ danh sách Hàng hóa cho người xem. Có hỗ trợ tham số lọc `?search=` | Khách hàng vãng lai | `[{ _id, name, price, stock }]` |
| **GET**               | `/product/details/:id`   | Bấm vào 1 thẻ Sản phẩm, hệ thống mở hình ảnh mô tả ở trang chi tiết | Khách hàng vãng lai | `{ ProductModel object }` |
| **POST**              | `/product/create`        | Tạo ra 1 món hàng mới (Bơm hàng vào kho) | **Admin** | `{ status: 'OK', message: 'Tạo thành công' }` |
| **PUT**               | `/product/update/:id`    | Lưu lại chỉnh sửa thông tin (Đổi giá, thay tên, sửa ảnh) | **Admin** | `{ data_moi: ... }` |
| **DELETE**            | `/product/delete/:id`    | Cho mặt hàng vào thùng rác tiêu hủy | **Admin** | `200 OK` |

### 4.3. Khối API Đơn hàng & Thanh Toán (Order Endpoint)

| Mã Khẩu Lệnh (Method) | Đường dẫn (URL Endpoint) | Mục đích (Description) | Ai được gọi? | Dữ liệu đầu vào bắt buộc (Request Body) |
|-----------------------|--------------------------|------------------------|--------------|-----------------------------------------|
| **POST**              | `/order/create`          | Giao dịch Thanh toán. Bơm List Giỏ hàng (Cart) thành Đơn hàng thực tế | Tài khoản đã Đăng Nhập | `{ orderItems, shippingAddress, paymentMethod, totalPrice }` |
| **GET**               | `/order/get-all-order`   | Mở danh sách toàn bộ các Đơn Hàng trong tuần/tháng để làm Báo cáo Doanh thu | **Admin** | (Không cần Data đầu vào) |
| **GET**               | `/order/get-order-details/:id`| Soi kỹ trong Đơn hàng số XYZ có những dòng Item nào, khách tên gì | User của đơn đó, Admin | (Tự động bóc tách từ Token) |

> **Ghi chú kiến thức:**
>
> - `[GET]` nghĩa là đi "Lấy" hoặc "Đòi" thông tin về để hiển thị lên màn hình.
> - `[POST]` là "Gửi đi" form thông tin đăng ký lên hệ thống.
> - `[PUT]` là "Sửa" hay "Thay thế" những hàng hóa đã mọc rễ.
> - `[DELETE]` là tiêu diệt triệt để.
