export const formatJsonString = (jsonString: string) => {
  try {
    const jsonObject = JSON.parse(jsonString)

    return jsonObject
  } catch (err) {
    const startIndex = jsonString.indexOf('{')
    const endIndex = jsonString.lastIndexOf('}')

    const jsonContent = jsonString.substring(startIndex, endIndex + 1)
    try {
      const jsonObject = JSON.parse(jsonContent)
      return jsonObject
    } catch (error) {
      console.log('error', error)
      throw new Error(
        'Error: Invalid JSON string\nPlease re-upload the file and try again.'
      )
    }
  }
}
