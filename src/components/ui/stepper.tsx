import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between px-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                  index < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "border-primary bg-background text-primary"
                    : "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {index < currentStep ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
              </div>
              <span className="mt-2 text-xs font-medium text-muted-foreground text-center max-w-[80px] leading-tight">
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 bg-muted-foreground/30 mx-2 min-w-[20px]",
                  index < currentStep && "bg-primary"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
