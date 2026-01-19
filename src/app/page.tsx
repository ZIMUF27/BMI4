import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
            BMI Health Tracker
          </h1>
          <p className="text-xl font-semibold text-blue-700">
            Student ID: 67162110559-4
          </p>
          <p className="text-lg text-gray-600">
            ดูแลสุขภาพของคุณด้วยการติดตามค่า BMI และประวัติการเปลี่ยนแปลงของร่างกายอย่างต่อเนื่อง
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
          {session ? (
            <div className="space-y-4">
              <p className="text-gray-700 font-medium">
                สวัสดี, <span className="text-blue-600 font-bold">{session.user?.name}</span>
              </p>
              <Link
                href="/dashboard"
                className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                ไปที่แดชบอร์ด
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <Link
                href="/login"
                className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                เข้าสู่ระบบ
              </Link>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">หรือ</span>
                </div>
              </div>
              <Link
                href="/register"
                className="block w-full py-3 px-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition duration-200"
              >
                สมัครสมาชิก
              </Link>
            </div>
          )}
        </div>
        
        <footer className="text-sm text-gray-400 mt-8">
          © {new Date().getFullYear()} BMI Health Tracker. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
