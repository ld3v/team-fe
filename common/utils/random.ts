export const random = (keys: string[]): string => {
  const keyLength = keys.length;
  return keys[Math.floor(Math.random() * keyLength)];
};
