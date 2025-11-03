import { z } from "zod";
import { VALIDATION_LIMITS } from "./constants";

/**
 * Sanitize string input to prevent XSS attacks
 * Removes or escapes potentially dangerous characters
 */
function sanitizeString(value: string): string {
  return value
    .trim()
    .replace(/[<>]/g, "") // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, ""); // Remove event handlers like onclick=
}

/**
 * Validate string doesn't contain script tags or dangerous patterns
 */
function validateNoScriptTags(value: string): boolean {
  const dangerousPatterns = [
    /<script/i,
    /<\/script>/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /javascript:/i,
    /onerror=/i,
    /onclick=/i,
  ];

  return !dangerousPatterns.some((pattern) => pattern.test(value));
}

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_LIMITS.name.min, `Name must be at least ${VALIDATION_LIMITS.name.min} characters`)
    .max(VALIDATION_LIMITS.name.max, `Name must be less than ${VALIDATION_LIMITS.name.max} characters`)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
    .transform(sanitizeString)
    .refine(validateNoScriptTags, { message: "Invalid characters detected in name" }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .max(VALIDATION_LIMITS.email.max, `Email must be less than ${VALIDATION_LIMITS.email.max} characters`)
    .transform((val) => val.trim())
    .refine((val) => !val.includes(".."), { message: "Email cannot contain consecutive dots" })
    .refine(validateNoScriptTags, { message: "Invalid email format" }),
  message: z
    .string()
    .min(VALIDATION_LIMITS.message.min, `Message must be at least ${VALIDATION_LIMITS.message.min} characters`)
    .max(VALIDATION_LIMITS.message.max, `Message must be less than ${VALIDATION_LIMITS.message.max} characters`)
    .transform(sanitizeString)
    .refine(validateNoScriptTags, { message: "Message contains invalid characters" })
    .refine((val) => val.split(/\s+/).length >= 3, { message: "Message must contain at least 3 words" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Checkout form validation schema
export const checkoutFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_LIMITS.name.min, `Name must be at least ${VALIDATION_LIMITS.name.min} characters`)
    .max(VALIDATION_LIMITS.name.max, `Name must be less than ${VALIDATION_LIMITS.name.max} characters`)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
    .transform(sanitizeString)
    .refine(validateNoScriptTags, { message: "Invalid characters detected in name" }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .max(VALIDATION_LIMITS.email.max, `Email must be less than ${VALIDATION_LIMITS.email.max} characters`)
    .transform((val) => val.trim())
    .refine((val) => !val.includes(".."), { message: "Email cannot contain consecutive dots" })
    .refine(validateNoScriptTags, { message: "Invalid email format" }),
  card: z
    .string()
    .regex(/^\d{13,19}$/, `Card number must be between ${VALIDATION_LIMITS.card.min} and ${VALIDATION_LIMITS.card.max} digits`)
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
    }, "Invalid card number. Please check and try again."),
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
    .regex(/^\d{3,4}$/, `CVV must be ${VALIDATION_LIMITS.cvv.min} or ${VALIDATION_LIMITS.cvv.max} digits`)
    .refine((val) => /^[0-9]+$/.test(val), { message: "CVV must contain only numbers" }),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

