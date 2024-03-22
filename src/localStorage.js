export function loadLocalStorageData(key) {
  try {
    const serializedData = localStorage.getItem(key);
    if (!serializedData) return undefined;

    const data = JSON.parse(serializedData);
    return data;
  } catch (err) {
    return undefined;
  }
}
