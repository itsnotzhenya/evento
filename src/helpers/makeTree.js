export const makeTree = data => {
  console.log(data)
  const inputData = data.items
  const parents = []
  let outputData = []
  const getChildren = (parentData, inputData) => {
    parentData.children = []
    inputData.map((item, index) => {
      if (item.parent_id === parentData.id) {
        let child = item
        parentData.children.push(child)
        delete inputData[index]
        getChildren(child, inputData)
      }
    })
  }
  inputData.map((item, index) => {
    if (!item.parent_id) {
      parents.push(item)
      delete inputData[index]
    }
  })
  if (parents.length > 0) {
    parents.map(parent => {
      getChildren(parent, inputData)
    })
    outputData.push(parent)
  }
  return outputData
}
