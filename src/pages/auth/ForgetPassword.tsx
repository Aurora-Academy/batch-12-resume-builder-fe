import { useState, useTransition } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { forgetPassword } from "@/services/auth";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [formPayload, setFormPayload] = useState({
    email: "",
    msg: "",
    err: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const { data } = await forgetPassword({ email: formPayload?.email });
        setFormPayload((prev) => {
          return { ...prev, msg: data?.data };
        });
        setTimeout(() => {
          navigate("/auth/forget-verification", { state: { email: formPayload?.email } });
        }, 2000);
      } catch (e: any) {
        setFormPayload((prev) => {
          return { ...prev, err: e?.response?.data?.err || "Something went wrong" };
        });
      } finally {
        setTimeout(() => {
          setFormPayload({
            email: "",
            msg: "",
            err: "",
          });
        }, 4000);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you an email with OTP to reset your password
          </CardDescription>
        </CardHeader>

        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent className="space-y-4">
            {formPayload?.err && (
              <>
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{formPayload?.err}</AlertDescription>
                </Alert>
              </>
            )}
            {formPayload?.msg && (
              <>
                <Alert variant="success" className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700">{formPayload?.msg}</AlertDescription>
                </Alert>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={formPayload?.email}
                placeholder="m@example.com"
                onChange={(e) =>
                  setFormPayload((prev) => {
                    return { ...prev, email: e?.target?.value };
                  })
                }
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-3">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? " Sending Email..." : "Send Email"}
            </Button>
            <div className="text-center text-sm">
              Remember your password?
              <Link to="/auth/login" className="text-primary hover:underline">
                &nbsp;Back to login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
