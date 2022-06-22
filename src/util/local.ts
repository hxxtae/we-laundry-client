/*
--------------------------
  테마 상태 storage
--------------------------
*/
export const themeStorage = {
  key: 'theme',
  get: () => localStorage.getItem(themeStorage.key),
  set: () => localStorage.setItem(themeStorage.key, JSON.stringify('dark')),
  remove: () => localStorage.removeItem(themeStorage.key),
};

/*
--------------------------
  초기 설명 상태 storage
--------------------------
*/
export const mainDescStorage = {
  key: 'mainDesc',
  get: () => localStorage.getItem(mainDescStorage.key),
  set: () => localStorage.setItem(mainDescStorage.key, JSON.stringify('true')),
  remove: () => localStorage.removeItem(mainDescStorage.key),
};

/*
--------------------------
  영업 관리 상태 storage
--------------------------
*/
export const openStorage = {
  key: 'open',
  get: () => localStorage.getItem(openStorage.key),
  set: () => localStorage.setItem(openStorage.key, JSON.stringify('true')),
  remove: () => localStorage.removeItem(openStorage.key),
};
