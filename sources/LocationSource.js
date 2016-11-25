var LocationSource = {
  fetch: () => {
    // returning a Promise because that's what a fetch does.
    return new Promise((resolve, reject) => {
      // simulate an asynchronous action where data is fetched on
      // a remote server somewhere
      setTimeout(() => {
        // resolve with mock data
        resolve(mockData)
      }, 250)
    })
  }
}
