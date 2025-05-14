import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <FileText className="h-6 w-6" />
          <span>ProResume Builder</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/auth/login">Create Resume</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
