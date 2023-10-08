import Tree, { prettyPrint } from "./tree.js";

const randomNumberArray = (size, range) => {
  let newSet = new Set();
  while (newSet.size < size) {
    newSet.add(Math.round(Math.random() * range));
  }
  let setToArray = [...newSet];
  let sortedArray = setToArray.sort((a, b) => a - b);
  return sortedArray;
};

let newTree = new Tree(randomNumberArray(25, 100))

prettyPrint(newTree.root);

console.log('tree is balanced:', newTree.isBalanced(newTree.root))
console.log('level order',newTree.levelOrder())
console.log('Inorder',newTree.dfsInOrder())
console.log('Post order',newTree.dfsPostOrder())
console.log('Pre order',newTree.dfsPreOrder())

newTree.insert(120)
newTree.insert(140)
newTree.insert(160)

console.log('tree is balanced:', newTree.isBalanced(newTree.root))

newTree.rebalance()
console.log('tree is balanced:', newTree.isBalanced(newTree.root))

console.log('level order',newTree.levelOrder())
console.log('Inorder', newTree.dfsInOrder())
console.log('Post order',newTree.dfsPostOrder())
console.log('Pre order',newTree.dfsPreOrder())








