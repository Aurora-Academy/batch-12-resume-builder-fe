import { Link } from "react-router";
import { FileText, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 mx-auto">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-5 w-5" />
          <span>ProResume Builder</span>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} ProResume Builder. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="https://github.com" className="text-muted-foreground hover:text-foreground">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
