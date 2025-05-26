import { Loader2 } from "lucide-react";

interface AuthLoadingProps {
  projectName?: string;
}

export function AuthLoading({ projectName = "MyApp" }: AuthLoadingProps) {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{projectName}</h1>
          <p className="text-sm text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    </div>
  );
}
