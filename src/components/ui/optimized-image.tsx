import * as React from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

function OptimizedImage({
  className,
  alt = "",
  loading = "lazy",
  decoding = "async",
  fallback,
  onError,
  ...props
}: OptimizedImageProps) {
  const [hasError, setHasError] = React.useState(false);

  const handleError = React.useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setHasError(true);
      onError?.(e);
    },
    [onError]
  );

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <img
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={cn(className)}
      onError={handleError}
      {...props}
    />
  );
}

export { OptimizedImage };
