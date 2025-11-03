import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QuizProgress } from "../quiz-progress";

describe("QuizProgress", () => {
  it("renders current step and total steps", () => {
    render(<QuizProgress current={1} total={3} />);
    
    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
  });

  it("displays correct percentage", () => {
    render(<QuizProgress current={2} total={4} />);
    
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("shows 100% on last step", () => {
    render(<QuizProgress current={3} total={3} />);
    
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders progress bar with correct width", () => {
    const { container } = render(<QuizProgress current={2} total={4} />);
    
    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar).toHaveStyle({ width: "50%" });
  });

  it("handles edge case with 1 total step", () => {
    render(<QuizProgress current={1} total={1} />);
    
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});

