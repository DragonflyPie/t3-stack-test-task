export const validateUrl = (url?: string) => {
  if (!url) return false;
  const re = new RegExp("^http");
  return re.test(url);
};
