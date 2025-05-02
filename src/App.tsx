import { Routes, Route } from "react-router";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Error from "@/pages/Error";
import ForgotPasswordPage from "@/pages/auth/ForgetPassword";
import VerifyEmailPage from "@/pages/auth/EmailVerification";
import ForgetPasswordVerification from "@/pages/auth/ForgetPasswordVerification";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <>
      <Routes>
        {/* Auth Pages */}
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="email-verification" element={<VerifyEmailPage />} />
          <Route path="forget-password" element={<ForgotPasswordPage />} />
          <Route path="forget-verification" element={<ForgetPasswordVerification />} />
        </Route>
        {/* Admin */}
        <Route path="/admin">
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
