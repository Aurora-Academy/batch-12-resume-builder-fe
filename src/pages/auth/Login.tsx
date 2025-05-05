import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { URLS } from "@/constants";

import { axiosInstance } from "@/lib/axios";

import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setErr("");
      const { data } = await axiosInstance.post(`${URLS.USERS}/login`, payload);
      const { access_token, refresh_token, data: msg } = data;
      setMsg(msg);
      login(access_token, refresh_token);

      // Send user to dashboard
      navigate("/admin/dashboard");
    } catch (e: any) {
      const errMsg = e?.response?.data?.err || "Something went wrong";
      setErr(errMsg);
    } finally {
      setPayload({
        email: "",
        password: "",
      });
      setTimeout(() => {
        setMsg("");
        setErr("");
      }, 5000);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <form onSubmit={(e) => handleSubmit(e)}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to sign in to your account
              </CardDescription>
              <div className="m-2">
                {err && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{err}</AlertDescription>
                  </Alert>
                )}
                {msg && (
                  <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-teal-700">{msg}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={payload?.email}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return {
                        ...prev,
                        email: e.target.value,
                      };
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/auth/forget-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  required
                  autoComplete="on"
                  value={payload?.password}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return {
                        ...prev,
                        password: e.target.value,
                      };
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit">
                Sign in
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/auth/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
