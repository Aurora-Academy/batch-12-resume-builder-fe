import { Link, useNavigate } from "react-router";
import { useState, useRef } from "react";
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
import { UserCircle } from "lucide-react";

import { axiosInstance } from "@/lib/axios";
import { URLS } from "@/constants";

export default function RegisterPage() {
  const navigate = useNavigate();
  const formPayloadRef = useRef<any>(null);
  const fileInputRef = useRef<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [error, setErr] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); //blob
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const rawFormData = formPayloadRef.current;
      const fileInput = fileInputRef.current?.files[0];
      const formData = new FormData(rawFormData);
      formData.append("picture", fileInput);
      formData.delete("confirmPassword");
      const { data } = await axiosInstance.post(`${URLS.USERS}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMsg(data.data);
      setTimeout(() => {
        navigate("/auth/email-verification", {
          state: {
            email: formData.get("email"),
          },
        });
      }, 5000);
    } catch (e: any) {
      console.log({ e });
      setErr(e?.err);
    } finally {
      e.target.reset();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <form ref={formPayloadRef} onSubmit={(e) => handleSubmit(e)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Picture (Optional)</Label>
              <div className="flex flex-col items-center">
                <div
                  className="relative h-24 w-24 overflow-hidden rounded-full border border-gray-200 bg-gray-50 cursor-pointer"
                  onClick={handleUploadClick}
                >
                  {preview ? (
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Profile preview"
                      className="object-cover fill"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <UserCircle className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple={false}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
            </div>

            {error && (
              <>
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              </>
            )}
            {msg && (
              <>
                <Alert variant="success" className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700">{msg}</AlertDescription>
                </Alert>
              </>
            )}
            <div className="gap-3"></div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit">
              Create Account
            </Button>
            <div className="text-center text-sm">
              Already have an account?&nbsp;
              <Link to="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
