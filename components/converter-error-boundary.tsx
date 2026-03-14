"use client";

import { Component, type ReactNode } from "react";
import { PillButton } from "@/components/pill";

type ConverterErrorBoundaryProps = {
  children: ReactNode;
  onReset: () => void;
  resetKeys?: readonly unknown[];
};

type ConverterErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

function getFriendlyMessage(error: Error) {
  if (error.message.includes("across categories")) {
    return "These units cannot be converted together. Reset the converter to choose a matching pair.";
  }

  if (error.message.includes("valid number")) {
    return "Enter a valid number to keep converting.";
  }

  return "Something went wrong while calculating that conversion. Try resetting the converter.";
}

export class ConverterErrorBoundary extends Component<
  ConverterErrorBoundaryProps,
  ConverterErrorBoundaryState
> {
  state: ConverterErrorBoundaryState = {
    hasError: false,
    message: "",
  };

  override componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
      message: getFriendlyMessage(error),
    });
  }

  override componentDidUpdate(previousProps: ConverterErrorBoundaryProps) {
    const previousResetKeys = previousProps.resetKeys ?? [];
    const currentResetKeys = this.props.resetKeys ?? [];

    if (
      this.state.hasError &&
      (previousResetKeys.length !== currentResetKeys.length ||
        previousResetKeys.some((value, index) => value !== currentResetKeys[index]))
    ) {
      this.setState({
        hasError: false,
        message: "",
      });
    }
  }

  static getDerivedStateFromError(error: Error): ConverterErrorBoundaryState {
    return {
      hasError: true,
      message: getFriendlyMessage(error),
    };
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      message: "",
    });
    this.props.onReset();
  };

  override render() {
    if (this.state.hasError) {
      return (
        <section className="shell-card p-4 sm:p-5">
          <div className="space-y-3">
            <span className="mono-kicker">converter unavailable</span>
            <h2 className="text-xl font-medium tracking-[-0.03em] text-[color:var(--text)]">
              Conversion error
            </h2>
            <p className="text-sm leading-7 text-[color:var(--muted)]">{this.state.message}</p>
            <div className="flex flex-wrap gap-2">
              <PillButton onClick={this.handleReset}>reset converter</PillButton>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
