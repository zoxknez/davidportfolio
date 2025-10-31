import { useEffect, useState } from "react";

/**
 * Hook for fade-in animations when component mounts
 * @returns mounted state that becomes true after mount
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

