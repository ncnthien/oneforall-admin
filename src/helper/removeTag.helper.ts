const removeTag = (base64StringWithTag: string): string => {
  const start = base64StringWithTag.indexOf(',') + 1
  if (start === 0) {
    return base64StringWithTag
  }

  const base64StringWithoutTag = base64StringWithTag.substr(start)
  return base64StringWithoutTag
}

export default removeTag
