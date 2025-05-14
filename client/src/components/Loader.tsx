import { ErrorInfo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type LoaderProps = Partial<React.ComponentProps<typeof ErrorBoundary>> &
  Partial<{ suspense: React.ReactNode; children: React.ReactNode }>;

export const Loader = (props: LoaderProps) => {
  const { children, suspense = null, fallback = null, onError, ...others } = props;

  const handleError = (error: Error, info: ErrorInfo) => {
    console.error('LOAD MODULE ERROR: ', error, info);
    onError?.(error, info);
  };

  return (
    <ErrorBoundary fallback={fallback} onError={handleError}>
      <Suspense fallback={suspense} {...others}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
