const decodeAndCutString = (text, limit, mediumSizedWindow) => {
  let cleanerText = text.replace(/&#39;/g, "'");
  if (mediumSizedWindow) return cleanerText;

  if (cleanerText.length > limit) {
    cleanerText = text.substring(0, limit) + ' ...';
  }

  return cleanerText;
};

export default decodeAndCutString;
