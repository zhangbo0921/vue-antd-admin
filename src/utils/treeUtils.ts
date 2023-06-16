// 1.将tree解析为[{},{}]给list
// 2.list数组长度大于0，就一直循环
// 3.循环体一直获取第一个list元素
// 4.如果元素曾经访问过，就从path最后删除，从list第一个删除
// 5.如果node没有被访问过，就添加到访问列表，和path最后，如果有子节点，将子节点解析成数组，放到list最前面
// 6.如果node满足func函数判断，则返回path，得到路径
export function findPath<T = any>(tree: any, func: (t: T) => Boolean): T[] | null {
  const path: T[] = []
  const list = [...tree]
  const visitedSet = new Set()

  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      path.push(node)
      node.children && list.unshift(...node.children)
      if (func(node)) {
        return path
      }
    }
  }
  return null
}
