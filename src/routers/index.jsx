import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter(
  [
    {
      // ใช้ basename ในการจัดการเส้นทางหลัก
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true, // ใช้ index: true แทน path: '/' สำหรับหน้าแรก
          element: <HomePage />,
        },
        {
          path: "chat", // ไม่ต้องมี / ข้างหน้าใน children
          element: <ChatPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
  ],
  {
    basename: "/t_check", // ยืนยันว่าต้องมีบรรทัดนี้
  },
);

export default router;
