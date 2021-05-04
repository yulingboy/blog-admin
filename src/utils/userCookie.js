import Cookies from 'js-cookie';

/**
 * 设置cookie
 * @param {Object} info
 */
export function setCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i++) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}
// 获取cookie
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    state: Cookies.get('state'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
    token: Cookies.get('token')
  };
}
// 移出cookie
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('state');
  Cookies.remove('role');
  Cookies.remove('email');
  Cookies.remove('token');
  return true;
}
