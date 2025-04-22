import { Routes, Route } from "react-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Error from "@/pages/Error";
import ForgotPasswordPage from "@/pages/ForgetPassword";
import VerifyEmailPage from "@/pages/EmailVerification";
import ForgetPasswordVerification from "@/pages/ForgetPasswordVerification";

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
          <Route path="fp-verification" element={<ForgetPasswordVerification />} />
        </Route>
        {/* Admin */}
        <Route></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
