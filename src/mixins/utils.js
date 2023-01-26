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
    let base64Url = localStorage.getItem('token').split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )

    return JSON.parse(jsonPayload)
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