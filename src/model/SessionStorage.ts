export const customSessionStorage = {
    setItem: (name: string, item: any): void => {
        window.sessionStorage.setItem(name, JSON.stringify(item));
    },
    getItem: (name: string): any | null => {
        const item = window.sessionStorage.getItem(name);
        return item ? JSON.parse(item) : null;
    },
    removeItem: (name: string): void => {
        window.sessionStorage.removeItem(name);
    },
    clear: (): void => {
        window.sessionStorage.clear();
    }
};
