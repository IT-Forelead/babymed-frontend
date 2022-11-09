export default function refreshToken(response) {
  if (response.headers['x-new-token']) {
    sessionStorage.setItem('token', response.headers['x-new-token'])
  }
}
