import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .max(255, "Email must be less than 255 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Checkout form validation schema
export const checkoutFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .max(255, "Email must be less than 255 characters"),
  card: z
    .string()
    .regex(/^\d{13,19}$/, "Card number must be between 13 and 19 digits")
    .refine((val) => {
      // Luhn algorithm for card validation
      const digits = val.split("").map(Number);
      let sum = 0;
      let isEven = false;
      
      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i]!;
        
        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        
        sum += digit;
        isEven = !isEven;
      }
      
      return sum % 10 === 0;
    }, "Invalid card number"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
    .refine((val) => {
      const [month, year] = val.split("/");
      const expiryDate = new Date(2000 + parseInt(year || "0", 10), parseInt(month || "0", 10) - 1);
      const now = new Date();
      return expiryDate > now;
    }, "Card has expired"),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

