export async function delay(ms: number, signal: AbortSignal) {
  return new Promise<void>((res, rej) => {
    const timer = setTimeout(() => {
      res();
    }, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      rej();
    });
  });
}
