export async function rateLimit<T>(
    expressions: (() => Promise<T>)[],
    rateLimit: number,
  ): Promise<T[]> {
    const results: T[] = [];
    let lastQueryTimestamp = Date.now();
    
    for (const fn of expressions) {
      const currentTime = Date.now();
      const timeElapsedMs = currentTime - lastQueryTimestamp;
      console.debug(
        `Checking if request needs to be throttled. Rate limit ${rateLimit}ms, time since last request ${timeElapsedMs}`,
      );
      
      if (timeElapsedMs < rateLimit) {
        const delay = rateLimit - timeElapsedMs;
        console.debug(`Too many requests, delaying for ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      
      const result = await fn();
      results.push(result);
      lastQueryTimestamp = Date.now();
    }
    
    return results;
  }