# Task Tracker API

ระบบ API สำหรับจัดการงาน (Task Tracker) สร้างด้วย **NestJS** โดยปรับใช้สถาปัตยกรรม Clean Architecture / Hexagonal Architecture

---

## 🛠️ Tech Stack & Architecture

- **Framework:** NestJS (TypeScript)
- **Database / ORM:** Prisma / Supabase (PostgreSQL)
- **API Documentation:** Swagger UI
- **Architecture:** Clean Architecture (Domain, Use Cases, Infrastructure, Presentation)

---

## ⚙️ Environment Setup

สร้างหรือตรวจสอบไฟล์ `.env` ที่ root directory ของโปรเจกต์:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:5432/<db_name>?schema=task"
SUPABASE_URL="https://<your-project>.supabase.co"
SUPABASE_KEY="<your-supabase-key>"
PREFIX="/api"
PORT=3001
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run start:dev
```

เซิร์ฟเวอร์จะรันที่: `http://localhost:3001` (หรือพอร์ตที่ตั้งค่าไว้ใน `.env`)

---

## 📖 API Documentation (Swagger)

สามารถทดสอบ API และอ่านเอกสารข้อมูลในรูปแบบ Interactive ผ่าน Swagger UI ได้ที่:
👉 **`http://localhost:3001/api/docs`**

---

## 📌 API Endpoints Summary

Base URL Prefix: `/api`

### 1. Get Tasks (ดึงรายการงาน)

- **Method:** `GET`
- **Path:** `/api/task`
- **Query Parameters:**
  - `status` _(optional)_: กรองตามสถานะงาน (`NOT_DONE` | `IN_PROGRESS` | `DONE`)
- **Example Request:**
  ```http
  GET /api/task?status=IN_PROGRESS
  ```

---

### 2. Create Task (สร้างงานใหม่)

- **Method:** `POST`
- **Path:** `/api/task/create`
- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "detail": "รายละเอียดงานที่ต้องทำ"
  }
  ```

---

### 3. Update Task (แก้ไขรายละเอียดงาน)

- **Method:** `PUT`
- **Path:** `/api/task/update`
- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "id": "task-uuid-here",
    "detail": "รายละเอียดงานที่อัปเดตใหม่"
  }
  ```

---

### 4. Delete Task (ลบงาน)

- **Method:** `DELETE`
- **Path:** `/api/task/delete`
- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "id": "task-uuid-here"
  }
  ```

---

## 📊 Data Models & Enums

### Task Status Enum (`TaskStatus`)

| Status        | Description          |
| :------------ | :------------------- |
| `NOT_DONE`    | ยังไม่ได้เริ่มทำ     |
| `IN_PROGRESS` | อยู่ระหว่างดำเนินการ |
| `DONE`        | ทำเสร็จเรียบร้อยแล้ว |

### Task Model Schema

| Field        | Type         | Required | Description                |
| :----------- | :----------- | :------- | :------------------------- |
| `id`         | `string`     | Yes      | รหัสระบุตัวตนของงาน (UUID) |
| `detail`     | `string`     | Yes      | ข้อความรายละเอียดงาน       |
| `status`     | `TaskStatus` | Yes      | สถานะปัจจุบันของงาน        |
| `created_at` | `Date`       | Yes      | วันเวลาที่สร้าง            |
| `updated_at` | `Date`       | Yes      | วันเวลาที่อัปเดตล่าสุด     |
