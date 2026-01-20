# แผนการทดสอบระบบ (Testing Plan)

เอกสารนี้รวบรวมกลยุทธ์และแผนการทดสอบระบบ BMI Calculator Web Application เพื่อให้มั่นใจในคุณภาพ ความถูกต้อง และความปลอดภัยของระบบ

## 1. เครื่องมือและสภาพแวดล้อม (Tools & Environment)
- **Testing Framework**: Playwright (End-to-End Testing)
- **Language**: TypeScript
- **Test Runner**: Playwright Test Runner
- **Browser**: Chromium (Headless mode)
- **Base URL**: `http://localhost:3000`

## 2. รายการทดสอบปัจจุบัน (Implemented Test Cases)
ปัจจุบันมี Test Cases ที่สร้างและทดสอบผ่านแล้วจำนวน **11 Cases** ครอบคลุมฟังก์ชันหลักดังนี้:

### 2.1 การจัดการผู้ใช้งาน (User Management)
| Test Case ID | ชื่อการทดสอบ | รายละเอียด | สถานะ |
| :--- | :--- | :--- | :--- |
| AUTH-01 | **Register Success** | สมัครสมาชิกสำเร็จ ระบบต้อง Redirect ไปหน้า Login | ✅ Pass |
| AUTH-02 | **Register Duplicate** | สมัครสมาชิกด้วย Username ซ้ำ ระบบต้องแจ้งเตือนข้อผิดพลาด | ✅ Pass |
| AUTH-03 | **Login Success** | เข้าสู่ระบบถูกต้อง ระบบต้อง Redirect ไปหน้า Dashboard | ✅ Pass |
| AUTH-04 | **Login Failure** | เข้าสู่ระบบผิดพลาด (รหัสผิด) ระบบต้องแจ้งเตือน | ✅ Pass |
| AUTH-05 | **Logout** | ออกจากระบบ ระบบต้อง Redirect กลับหน้า Home และล้าง Session | ✅ Pass |
| AUTH-06 | **Auth Guard** | พยายามเข้า Dashboard โดยไม่ Login ระบบต้อง Redirect ไป Login | ✅ Pass |

### 2.2 ฟังก์ชันคำนวณ BMI (BMI Calculation)
| Test Case ID | ชื่อการทดสอบ | รายละเอียด | สถานะ |
| :--- | :--- | :--- | :--- |
| BMI-01 | **BMI Calculation Flow** | กรอกน้ำหนัก/ส่วนสูง คำนวณ และตรวจสอบว่าบันทึกประวัติได้ | ✅ Pass |
| BMI-02 | **BMI Status Logic** | ตรวจสอบตรรกะการแปลผล (เช่น BMI 24.2 = Overweight) | ✅ Pass |
| BMI-03 | **Input Validation** | กดคำนวณโดยไม่กรอกข้อมูล ระบบต้องไม่ทำการคำนวณ | ✅ Pass |

### 2.3 การแสดงผลและการนำทาง (UI & Navigation)
| Test Case ID | ชื่อการทดสอบ | รายละเอียด | สถานะ |
| :--- | :--- | :--- | :--- |
| UI-01 | **Home Page Elements** | ตรวจสอบหน้าแรก แสดงชื่อแอปและรหัสนักศึกษา (67162110559-4) | ✅ Pass |
| UI-02 | **Reports Access** | ตรวจสอบลิงก์ไปยังหน้ารายงานผล (Reports) จาก Dashboard | ✅ Pass |

## 3. แผนการทดสอบเพิ่มเติม (Future Test Plan)
แผนงานสำหรับการทดสอบในเฟสถัดไป:

### 3.1 Performance Testing (ประสิทธิภาพ)
- **Goal**: รองรับผู้ใช้งานพร้อมกัน (Concurrent Users) ได้อย่างน้อย 50 คนโดยไม่ล่ม
- **Metrics**: 
  - Response Time (P95) < 500ms
  - Error Rate < 1%
- **Tools**: k6 หรือ JMeter

### 3.2 Security Testing (ความปลอดภัย)
- **SQL Injection**: ตรวจสอบช่องโหว่ใน Input Fields
- **XSS (Cross-Site Scripting)**: ตรวจสอบการแสดงผลข้อมูลที่รับจาก User
- **Session Timeout**: ตรวจสอบว่า Session หมดอายุตามเวลาที่กำหนดหรือไม่

### 3.3 API Testing (Contract Testing)
- ตรวจสอบ Response Schema ของ API `/api/auth/*` และ `/api/bmi`
- ตรวจสอบ HTTP Status Codes (200, 400, 401, 500) ให้ถูกต้องตามมาตรฐาน

## 4. วิธีการรันชุดทดสอบ (Execution Guide)

### 4.1 รันการทดสอบทั้งหมด (Run All Tests)
```bash
npx playwright test
```

### 4.2 รันเฉพาะไฟล์ (Run Specific File)
```bash
npx playwright test tests/login.spec.ts
```

### 4.3 ดูรายงานผลการทดสอบ (View Report)
```bash
npx playwright show-report
```

### 4.4 รันในโหมด UI (Debug Mode)
```bash
npx playwright test --ui
```
