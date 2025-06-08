declare global {
    interface Window {
        route?: (...args: unknown[]) => unknown;
    }
}

export const route = (...args: unknown[]) => {
    if (typeof window !== 'undefined' && typeof window.route === 'function') {
        return window.route(...args);
    }
    return '#';
};
