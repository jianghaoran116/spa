function getRedirectPath({ type }) {
  const url = (type === 'boss') ? '/boss' : '/genius';
  // if (!avatar) {
  //   url += 'info';
  // }
  return url;
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_');
}

export default {
  getRedirectPath,
};
