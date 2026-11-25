// Live requests stay in place. This wrapper is the only switch to demo
// records: a failed call, an HTTP error body, or a call that is still
// pending after DEMO_TIMEOUT_MS.

export const DEMO_TIMEOUT_MS = 12000;

export function withDemoFallback(request, makeFallback) {
  const controller = new AbortController();
  let settled = false;

  const pending = Promise.resolve()
    .then(() => request(controller.signal))
    .catch((error) => {
      throw error;
    });
  // If the timeout already won, a later rejection should not surface as unhandled.
  pending.catch(() => {});

  return new Promise((resolve) => {
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };

    const timer = setTimeout(() => {
      controller.abort();
      finish({ data: makeFallback(), demo: true });
    }, DEMO_TIMEOUT_MS);

    pending.then(
      (result) => {
        if (result == null || result.error) {
          finish({ data: makeFallback(), demo: true });
          return;
        }
        finish(result);
      },
      () => {
        finish({ data: makeFallback(), demo: true });
      }
    );
  });
}
