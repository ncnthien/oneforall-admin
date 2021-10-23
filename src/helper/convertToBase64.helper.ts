const convertToBase64 = (
  file: Blob
): Promise<string | ProgressEvent<FileReader>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = error => {
      reject(error)
    }
  })
}

export default convertToBase64
