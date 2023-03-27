export const createClientId = () => {
  const array = new Uint8Array(20);

  window.crypto.getRandomValues(array);

  return Array.from(array, (dec) =>
    ('0' + dec.toString(16)).substring(-2),
  ).join('');
};
