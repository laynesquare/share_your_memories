const decodeAndCutString = (text, limit, mediumSizedWindow) => {
  let cleanerText = text.replace(/&#39;/g, "'");
  if (mediumSizedWindow) return cleanerText;

  if (cleanerText.length > limit) {
    cleanerText = text.substring(0, limit) + ' ...';
  }

  // if (type === 'title' && text.length > 50) {
  //   cleanerText = text.substring(0, 50) + ' ...';
  // } else if (type === 'channel' && text.length > 30) {
  //   cleanerText = text.substring(0, 30) + ' ...';
  // }
  return cleanerText;
};

export default decodeAndCutString;
