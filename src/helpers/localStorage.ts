export const setStorage = (key: string, object: object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const getStorage = (key: string) => {
  const localStorageData = localStorage.getItem(key);
  return JSON.parse(localStorageData ?? 'null');
};