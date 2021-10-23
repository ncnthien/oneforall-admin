function checkFalsyKey<T>(item: T): boolean {
  let result = true
  Object.entries(item).forEach(([, value]) => {
    if (value === '') {
      result = false
    }
  })

  return result
}

export default checkFalsyKey
