/**
 * Toast notification utilities
 * Wrapper around sonner with custom styling
 */

import { toast as sonnerToast } from "sonner";

export const toast = {
  /**
   * Show success toast
   */
  success: (message: string, description?: string) => {
    return sonnerToast.success(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Show error toast
   */
  error: (message: string, description?: string) => {
    return sonnerToast.error(message, {
      description,
      duration: 5000,
    });
  },

  /**
   * Show info toast
   */
  info: (message: string, description?: string) => {
    return sonnerToast.info(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Show warning toast
   */
  warning: (message: string, description?: string) => {
    return sonnerToast.warning(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Show loading toast
   */
  loading: (message: string) => {
    return sonnerToast.loading(message);
  },

  /**
   * Show promise toast (automatically handles loading, success, error states)
   */
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, messages);
  },

  /**
   * Dismiss a specific toast
   */
  dismiss: (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId);
  },

  /**
   * Custom toast with full control
   */
  custom: sonnerToast,
};

/**
 * Helper for API call toasts
 * 
 * @example
 * ```ts
 * const result = await apiToast(
 *   fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) }),
 *   {
 *     loading: 'Sending message...',
 *     success: 'Message sent successfully!',
 *     error: 'Failed to send message',
 *   }
 * );
 * ```
 */
export async function apiToast<T>(
  promise: Promise<T>,
  messages: {
    loading?: string;
    success: string;
    error: string;
  }
): Promise<T> {
  const toastId = messages.loading ? toast.loading(messages.loading) : null;

  try {
    const result = await promise;
    if (toastId) toast.dismiss(toastId);
    toast.success(messages.success);
    return result;
  } catch (error) {
    if (toastId) toast.dismiss(toastId);
    const errorMessage =
      error instanceof Error ? error.message : messages.error;
    toast.error(messages.error, errorMessage !== messages.error ? errorMessage : undefined);
    throw error;
  }
}

