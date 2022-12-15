export default function refreshToken(response) {
  if (response.headers['x-new-token']) {
    localStorage.setItem('token', response.headers['x-new-token'])
  }
}
