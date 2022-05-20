export const themeStorage = {
  key: 'theme',
  get: () => localStorage.getItem(themeStorage.key),
  set: () => localStorage.setItem(themeStorage.key, JSON.stringify('dark')),
  remove: () => localStorage.removeItem(themeStorage.key),
};

export const mainDescStorage = {
  key: 'mainDesc',
  get: () => localStorage.getItem(mainDescStorage.key),
  set: () => localStorage.setItem(mainDescStorage.key, JSON.stringify('true')),
  remove: () => localStorage.removeItem(mainDescStorage.key),
};

export const openStorage = {
  key: 'open',
  get: () => localStorage.getItem(openStorage.key),
  set: () => localStorage.setItem(openStorage.key, JSON.stringify('true')),
  remove: () => localStorage.removeItem(openStorage.key),
};
