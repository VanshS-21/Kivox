type RateLimitInfo = {
  count: number;
  resetAt: number;
};

export class RateLimiter {
  private cache = new Map<string, RateLimitInfo>();
  private windowMs: number;
  private maxRequests: number;
  private maxEntries: number;

  constructor(windowMs = 15 * 60 * 1000, maxRequests = 5, maxEntries = 1000) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.maxEntries = maxEntries;
  }

  public check(ip: string): { success: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const record = this.cache.get(ip);

    // Clean up expired record
    if (record && record.resetAt < now) {
      this.cache.delete(ip);
    }

    if (this.cache.size >= this.maxEntries && !this.cache.has(ip)) {
      this.cleanup(now);

      if (this.cache.size >= this.maxEntries) {
        const oldestKey = this.cache.keys().next().value;
        if (oldestKey) this.cache.delete(oldestKey);
      }
    }

    const currentRecord = this.cache.get(ip);

    if (!currentRecord) {
      const resetAt = now + this.windowMs;
      this.cache.set(ip, { count: 1, resetAt });
      return { success: true, remaining: this.maxRequests - 1, resetAt };
    }

    if (currentRecord.count >= this.maxRequests) {
      return { success: false, remaining: 0, resetAt: currentRecord.resetAt };
    }

    currentRecord.count += 1;
    return {
      success: true,
      remaining: this.maxRequests - currentRecord.count,
      resetAt: currentRecord.resetAt,
    };
  }

  // Optional: A method to clean up all expired entries (could be run on a setInterval if needed, but not strictly required for small loads)
  public cleanup(now = Date.now()) {
    for (const [key, value] of this.cache.entries()) {
      if (value.resetAt < now) {
        this.cache.delete(key);
      }
    }
  }
}

// Export a singleton instance for standard API route limiting
// Max 5 requests per 15 minutes by default
export const apiRateLimiter = new RateLimiter(15 * 60 * 1000, 5);
