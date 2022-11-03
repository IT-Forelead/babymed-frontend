export default function refreshToken(response) {
  if (response.headers["x-new-token"]) {
      sessionStorage.setItem('token', JSON.stringify({'value': response.headers["x-new-token"]}))
      // document.cookie.split(';')[0].split('=')[1]
  }
}