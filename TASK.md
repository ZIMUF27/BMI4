# Project Plan: BMI Web Application

แผนงานการพัฒนาตามเอกสาร SRS.md โดยแบ่งเป็นระยะ (Phases) เพื่อให้ง่ายต่อการติดตาม

## Phase 1: Project Initialization (เริ่มต้นโครงการ)
- [ ] **Setup Project:** สร้างโปรเจกต์ Next.js พร้อมติดตั้ง Tailwind CSS
- [ ] **Database Setup:** ติดตั้งและตั้งค่า SQLite (แนะนำให้ใช้ Prisma ORM เพื่อความสะดวก)
- [ ] **Authentication Setup:** ติดตั้ง NextAuth.js และตั้งค่า Provider เบื้องต้น

## Phase 2: Database Schema (ออกแบบและสร้างฐานข้อมูล)
- [ ] **Schema Design:** ออกแบบตาราง `User` (เก็บข้อมูลผู้ใช้)
- [ ] **Schema Design:** ออกแบบตาราง `BMI_Record` (เก็บประวัติ BMI)
- [ ] **Migration:** รันคำสั่งเพื่อสร้างตารางในฐานข้อมูล SQLite

## Phase 3: User Management (ระบบจัดการผู้ใช้งาน)
- [ ] **Register API:** สร้าง API สำหรับสมัครสมาชิก (Hash password)
- [ ] **Register Page:** สร้างหน้า UI สำหรับสมัครสมาชิก
- [ ] **Login/Logout:** ตั้งค่า NextAuth Credentials Provider สำหรับเข้าสู่ระบบ
- [ ] **Protected Routes:** ตั้งค่า Middleware หรือ Session Check เพื่อป้องกันการเข้าถึงข้อมูลส่วนตัว

## Phase 4: BMI Core Features (ฟังก์ชันหลัก BMI)
- [ ] **BMI Logic:** เขียนฟังก์ชันคำนวณ BMI และแปลผล (ผอม, ปกติ, ท้วม, อ้วน)
- [ ] **Input Form:** สร้างหน้าจอสำหรับกรอกน้ำหนักและส่วนสูง
- [ ] **Save API:** สร้าง API สำหรับบันทึกข้อมูลลงตาราง `BMI_Record` เชื่อมกับ `User`
- [ ] **Result Display:** แสดงผลลัพธ์การคำนวณทันทีหลังจากกรอกข้อมูล

## Phase 5: History & Dashboard (ประวัติและรายงานผล)
- [ ] **History API:** สร้าง API ดึงข้อมูลประวัติ BMI ของผู้ใช้งาน
- [ ] **History Page:** สร้างหน้าแสดงรายการประวัติย้อนหลัง (Table/List)
- [ ] **Dashboard UI:** สร้างโครงหน้า Dashboard สำหรับแสดงกราฟหรือสถิติรวม
- [ ] **Chart/Stats Component:** สร้าง Component สำหรับแสดงผลสถิติ

## Phase 6: MIS Reports (รายงานสรุปผู้บริหาร)
- [ ] **Daily Report:** พัฒนา Logic และหน้าจอสรุปรายวัน
- [ ] **Weekly Report:** พัฒนา Logic และหน้าจอสรุปรายสัปดาห์
- [ ] **Monthly Report:** พัฒนา Logic และหน้าจอสรุปรายเดือน
- [ ] **Yearly Report:** พัฒนา Logic และหน้าจอสรุปรายปี

## Phase 7: UI/UX & Final Polish (ปรับแต่งและตรวจสอบ)
- [ ] **Responsive Check:** ตรวจสอบการแสดงผลบนมือถือ
- [ ] **Usability Test:** ทดสอบการใช้งานจริง (Flow สมัคร -> คำนวณ -> ดูรายงาน)
- [ ] **Cleanup:** ลบโค้ดที่ไม่ได้ใช้และปรับปรุง UI ให้สวยงาม