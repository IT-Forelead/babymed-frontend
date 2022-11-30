export default function decodeJwt(token) {
  return JSON.parse(window.atob(token.split('.')[1]))
}

export function cleanObjectEmptyFields(obj) {
  for (var propName in obj) {
    if (!obj[propName]) {
      delete obj[propName]
    }
  }
  return obj
}