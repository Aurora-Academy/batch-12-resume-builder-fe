import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-6">
        {/* Error Illustration */}
        <div className="relative mx-auto h-64 w-64">
          <img
            src="/confused-coder.png"
            alt="404 illustration"
            width={256}
            height={256}
            className="object-contain"
          />
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">404</h1>
          <h2 className="text-2xl font-bold">Page not found</h2>
          <p className="text-muted-foreground">
            We can't seem to find the page you're looking for. The page might have been removed,
            renamed, or is temporarily unavailable.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 pt-4">
          <Button asChild size="lg" className="sm:flex-1">
            <Link to="/">Go back home</Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="sm:flex-1">
            <Link to="/auth/login">Sign in</Link>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link to="#" className="font-medium text-primary underline underline-offset-4">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
