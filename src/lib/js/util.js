export function yieldToMain() {
    return new Promise((resolve) => setTimeout(() => queueMicrotask(resolve), 0))
}