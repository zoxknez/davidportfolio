import { describe, it, expect } from "vitest";
import { contactFormSchema, checkoutFormSchema } from "../validations";

describe("contactFormSchema", () => {
  it("validates correct contact form data", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a test message with enough words",
    };

    expect(() => contactFormSchema.parse(validData)).not.toThrow();
  });

  it("rejects name that is too short", () => {
    const invalidData = {
      name: "J",
      email: "john@example.com",
      message: "This is a test message",
    };

    expect(() => contactFormSchema.parse(invalidData)).toThrow();
  });

  it("rejects invalid email", () => {
    const invalidData = {
      name: "John Doe",
      email: "not-an-email",
      message: "This is a test message with enough words",
    };

    expect(() => contactFormSchema.parse(invalidData)).toThrow();
  });

  it("rejects message that is too short", () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      message: "Short",
    };

    expect(() => contactFormSchema.parse(invalidData)).toThrow();
  });

  it("sanitizes dangerous characters from name", () => {
    const data = {
      name: "John<script>alert('xss')</script>Doe",
      email: "john@example.com",
      message: "This is a test message with enough words",
    };

    const result = contactFormSchema.parse(data);
    expect(result.name).not.toContain("<script>");
  });

  it("rejects message with script tags", () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      message: "<script>alert('xss')</script> This is a test message",
    };

    expect(() => contactFormSchema.parse(invalidData)).toThrow();
  });

  it("trims whitespace from fields", () => {
    const data = {
      name: "  John Doe  ",
      email: "  john@example.com  ",
      message: "  This is a test message with enough words  ",
    };

    const result = contactFormSchema.parse(data);
    expect(result.name).toBe("John Doe");
    expect(result.email).toBe("john@example.com");
  });
});

describe("checkoutFormSchema", () => {
  it("validates correct checkout data", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      card: "4532015112830366", // Valid test card
      expiry: "12/25",
      cvv: "123",
    };

    expect(() => checkoutFormSchema.parse(validData)).not.toThrow();
  });

  it("validates card number with Luhn algorithm", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      card: "4532015112830366", // Valid
      expiry: "12/25",
      cvv: "123",
    };

    expect(() => checkoutFormSchema.parse(validData)).not.toThrow();
  });

  it("rejects invalid card number (Luhn check fails)", () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      card: "4532015112830367", // Invalid (last digit changed)
      expiry: "12/25",
      cvv: "123",
    };

    expect(() => checkoutFormSchema.parse(invalidData)).toThrow();
  });

  it("rejects expired card", () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      card: "4532015112830366",
      expiry: "12/20", // Expired
      cvv: "123",
    };

    expect(() => checkoutFormSchema.parse(invalidData)).toThrow();
  });

  it("rejects invalid expiry format", () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      card: "4532015112830366",
      expiry: "1225", // Should be MM/YY
      cvv: "123",
    };

    expect(() => checkoutFormSchema.parse(invalidData)).toThrow();
  });

  it("rejects CVV that is too short", () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      card: "4532015112830366",
      expiry: "12/25",
      cvv: "12",
    };

    expect(() => checkoutFormSchema.parse(invalidData)).toThrow();
  });

  it("accepts 4-digit CVV", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      card: "378282246310005", // Amex
      expiry: "12/25",
      cvv: "1234",
    };

    expect(() => checkoutFormSchema.parse(validData)).not.toThrow();
  });
});

