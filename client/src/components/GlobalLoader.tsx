import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalLoaderProps {
  isLoading: boolean;
}

export const GlobalLoader = ({ isLoading }: GlobalLoaderProps) => {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        "animate-fade-in",
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};
