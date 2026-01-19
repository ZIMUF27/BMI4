# Software Requirements Specification (SRS) - BMI Web Application

## 1. บทนำ (Introduction)
### 1.1 จุดประสงค์ (Purpose)
เอกสารนี้จัดทำขึ้นเพื่อระบุความต้องการของระบบสำหรับเว็บแอปพลิเคชันคำนวณและติดตามค่าดัชนีมวลกาย (BMI) ที่รองรับผู้ใช้งานหลายคน พร้อมระบบรายงานสรุปผล (MIS Report)

### 1.2 ขอบเขต (Scope)
ระบบเป็น Web Application ที่ช่วยให้ผู้ใช้งานสามารถลงทะเบียน เข้าสู่ระบบ เพื่อบันทึกน้ำหนักและส่วนสูง คำนวณค่า BMI และดูประวัติย้อนหลังได้ โดยระบบจะมีการสรุปรายงานเชิงบริหาร (MIS) ในรูปแบบรายวัน รายสัปดาห์ รายเดือน และรายปี

## 2. เทคโนโลยีที่ใช้ (Technology Stack)
- **Frontend & Backend Framework:** Next.js (Latest Version)
- **Database:** SQLite
- **Styling:** Tailwind CSS (แนะนำ)
- **Authentication:** NextAuth.js (หรือ library ที่เหมาะสม)

## 3. ความต้องการของระบบ (Functional Requirements)

### 3.1 ระบบจัดการผู้ใช้งาน (User Management)
- **FR-01:** ระบบต้องรองรับผู้ใช้งานได้หลายคน (Multi-user support)
- **FR-02:** ผู้ใช้งานสามารถสมัครสมาชิก (Register) ได้
- **FR-03:** ผู้ใช้งานสามารถเข้าสู่ระบบ (Login) และออกจากระบบ (Logout) ได้
- **FR-04:** ข้อมูลของผู้ใช้งานแต่ละคนต้องแยกจากกัน (Private Data)

### 3.2 การจัดการข้อมูล BMI (BMI Management)
- **FR-05:** ผู้ใช้งานสามารถกรอกน้ำหนัก (kg) และส่วนสูง (cm) เพื่อบันทึกข้อมูลได้
- **FR-06:** ระบบต้องคำนวณค่า BMI อัตโนมัติจากข้อมูลที่กรอกและบันทึกลงฐานข้อมูลพร้อมวันที่และเวลา
- **FR-07:** ระบบต้องแสดงผลแปลค่า BMI (เช่น ผอม, ปกติ, ท้วม, อ้วน) ตามมาตรฐานสากล

### 3.3 รายงานและประวัติ (Reports & History)
- **FR-08:** ผู้ใช้งานสามารถดูประวัติการบันทึก BMI ของตนเองได้
- **FR-09:** ระบบต้องมีหน้า Dashboard หรือรายงาน MIS Report ที่แสดงแนวโน้มและสถิติ
- **FR-10:** ระบบต้องสามารถสร้างรายงานสรุปย้อนหลังได้ดังนี้:
    - รายงานรายวัน (Daily Report)
    - รายงานรายสัปดาห์ (Weekly Report)
    - รายงานรายเดือน (Monthly Report)
    - รายงานรายปี (Yearly Report)

## 4. การออกแบบฐานข้อมูลเบื้องต้น (Database Schema Draft - SQLite)

### 4.1 ตาราง Users
เก็บข้อมูลผู้ใช้งาน
- `id` (Primary Key, Integer/UUID)
- `username` (Text, Unique)
- `password_hash` (Text)
- `created_at` (DateTime)

### 4.2 ตาราง BMI_Records
เก็บประวัติการบันทึกค่า BMI
- `id` (Primary Key, Integer/UUID)
- `user_id` (Foreign Key -> Users.id)
- `weight` (Real) - น้ำหนัก (kg)
- `height` (Real) - ส่วนสูง (cm)
- `bmi_value` (Real) - ค่า BMI ที่คำนวณได้
- `record_date` (DateTime) - วันที่และเวลาที่บันทึก

## 5. ความต้องการที่ไม่ใช่ฟังก์ชัน (Non-Functional Requirements)
- **Performance:** ระบบต้องประมวลผลและแสดงรายงานได้อย่างรวดเร็ว
- **Usability:** ใช้งานง่าย รองรับการแสดงผลบนมือถือ (Responsive Design)
- **Security:** รหัสผ่านต้องถูกเข้ารหัส (Hash) ก่อนบันทึกลงฐานข้อมูล