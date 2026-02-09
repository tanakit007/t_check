import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-gray-500 text-sm bg-white dark:bg-gray-900">
        <p>
          &copy; {new Date().getFullYear()} T-Check. Powered by Advanced AI.
        </p>
      </footer>
    </div>
  );
}
