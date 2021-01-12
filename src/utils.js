export async function request(url, method = 'GET', data = null) {
  const headers = {}
  let body = null
  if (method === 'POST') {
    headers['Content-Type'] = 'application/json'

    if (data) {
      body = JSON.stringify(data)
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    body
  })

  return response.json()
}

export function convertFirebaseResponse(data = []) {
  return Object.keys(data).map(id => {
    return {
      id,
      ...data[id]
    }
  })
}

export function dangerAlert(message) {
  return {
    type: 'danger',
    title: 'Ошибка',
    text: message
  }
}
