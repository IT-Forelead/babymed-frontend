import jwt_decode from "jwt-decode";

export default function decodeJwt(token) {
  return JSON.parse(window.atob(token.split('.')[1]))
}

export function cleanObjectEmptyFields(obj) {
  for (let propName in obj) {
    if (!obj[propName]) {
      delete obj[propName]
    }
  }
  return obj
}

export function parseJwt() {
  try {
    return jwt_decode(localStorage.getItem('token'))
  } catch (err) {
    let token = localStorage.getItem('token')
    if (token) {
      alert("Your token is not valid!")
      localStorage.clear()
      window.location.reload()
    } else {
      localStorage.clear()
      window.location.reload()
    }
  }

}