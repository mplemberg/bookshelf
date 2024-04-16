async function client(endpoint, customConfig = {}) {
  const url = `${process.env.REACT_APP_API_URL}/${endpoint}`
  // 🐨 create the config you'll pass to window.fetch
  //    make the method default to "GET"
  const config = {
    method: 'GET',
    ...customConfig,
  }

  const response = await fetch(url, config)
  return await response.json()
}

export {client}
