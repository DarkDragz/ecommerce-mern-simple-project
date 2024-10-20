let storeSingleton;

export const setStore = (store) => {
  if (!storeSingleton || store === undefined) {
    storeSingleton = store;
  }
};

export const getStore = () => storeSingleton;
