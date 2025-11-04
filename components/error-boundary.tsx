"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-dvh font-sans text-white relative overflow-hidden bg-black">
          <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 sm:px-6 py-12 z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">Something went wrong</h1>
              <p className="text-sm text-white/70 mb-2">
                We encountered an unexpected error.
              </p>
              {this.state.error && (
                <p className="text-xs text-white/50 mb-6 font-mono">
                  {this.state.error.message}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="h-11 rounded-full border border-white/10 bg-white/5 px-6 text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Try Again
              </Button>
              <Button
                variant="ghost"
                className="h-11 rounded-full border border-white/10 bg-white/5 px-6 text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}

