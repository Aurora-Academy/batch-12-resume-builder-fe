import { ErrorBoundary } from "react-error-boundary";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <Alert className="border-green-200 bg-green-50">
        <AlertTitle className="text-green-800">Something went wrong</AlertTitle>
        <AlertDescription className="text-green-700">{error.message}</AlertDescription>
        <button onClick={resetErrorBoundary}>Try Again</button>
      </Alert>
    </div>
  );
};

export const withErrorBoundary = (Component: React.ComponentType) => {
  return function WrappedwithErrorBoundary(props: any) {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};
