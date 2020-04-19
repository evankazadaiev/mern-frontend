import history from './history';
export default (function () {
  return {
    parseToken (token) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/') || null;
      try {
        return JSON.parse(window.atob(base64));
      } catch (e) {
        console.log(e.message);
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('id');
      history.push('/login');
    }
  }
})()
