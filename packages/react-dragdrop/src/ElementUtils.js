export function FindReactElement(node: any){
  return node[Object.keys(node).filter(function(_,i){ return _.startsWith('__reactInternalInstance$')})[0]]
}