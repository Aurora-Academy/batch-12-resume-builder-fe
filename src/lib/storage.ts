export const setItem = (key = "access_token", value: any) => localStorage.setItem(key, value);
export const getItem = (key = "access_token") => localStorage.getItem(key);
export const removeItem = (key: any) => localStorage.removeItem(key);
export const removeAllItems = () => localStorage.clear();
