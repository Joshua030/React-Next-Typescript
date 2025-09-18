"use client";

type ErrorPageProps = {
  error: Error & { digest?: string }; // Next passes an Error with optional digest
  reset: () => void; // Re-attempt to render the route segment
};

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
