export default function authHeader() {
  let user = JSON.parse(sessionStorage.getItem('token'))
  if (user && user.value) {
    return { Authorization: 'Bearer ' + user.value }
  } else {
    return {}
  }
}
