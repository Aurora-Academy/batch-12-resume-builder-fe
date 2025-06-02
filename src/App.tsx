import { Routes, Route } from "react-router";
import { Toaster } from "sonner";

import PrivateRoute from "./components/PrivateRoute";
import RouteWatcher from "./components/RouteWatcher";

import AdminLayout from "./layout/AdminLayout";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Error from "@/pages/Error";
import ForgotPasswordPage from "@/pages/auth/ForgetPassword";
import VerifyEmailPage from "@/pages/auth/EmailVerification";
import ForgetPasswordVerification from "@/pages/auth/ForgetPasswordVerification";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import UserLayout from "./layout/UserLayout";
import AddResume from "./pages/admin/resumes/AddResume";
import User from "./pages/admin/users";
import AdminResumes from "./pages/admin/resumes";
import AddUser from "./pages/admin/users/Add";
import EditUser from "./pages/admin/users/Edit";

export default function App() {
  return (
    <>
      <RouteWatcher />
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
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="resumes"
            element={
              <PrivateRoute>
                <AdminResumes />
              </PrivateRoute>
            }
          />
          <Route
            path="resumes/add"
            element={
              <PrivateRoute>
                <AddResume />
              </PrivateRoute>
            }
          />
          <Route
            path="users/:id"
            element={
              <PrivateRoute adminOnly={false}>
                <EditUser />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute adminOnly>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="users/add"
            element={
              <PrivateRoute adminOnly={false}>
                <AddUser />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Toaster richColors closeButton position="bottom-right" />
    </>
  );
}
