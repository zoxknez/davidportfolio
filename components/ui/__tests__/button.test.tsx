import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole("button"));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies default variant styles", () => {
    render(<Button>Default Button</Button>);
    
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
  });

  it("applies ghost variant styles", () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-accent");
  });

  it("applies destructive variant styles", () => {
    render(<Button variant="destructive">Delete</Button>);
    
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive");
  });

  it("applies different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    
    await user.click(screen.getByRole("button"));
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test");
  });
});

