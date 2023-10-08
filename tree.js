import Node from './node.js'

export default class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);

    let node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }
  insert(data) {
    this.root = this.recursiveInsert(this.root, data);
  }
  recursiveInsert(node, data) {
    if (node === null) {
      node = new Node(data);
      return node;
    }
    if (data < node.data) {
      node.left = this.recursiveInsert(node.left, data);
    } else if (data > node.data) {
      node.right = this.recursiveInsert(node.right, data);
    }
    return node;
  }
  remove(data) {
    this.root = this.recursiveDelete(this.root, data);
  }
  recursiveDelete(node, data) {
    //node is what is being inspected, data is what we want deleted
    if (node === null) {
      //base case, tree is empty
      //the node w/ the data we're looking for is not in the tree
      return node; //as node = null, we are actually returning null
    }
    if (data < node.data) {
      node.left = this.recursiveDelete(node.left, data);
    } else if (data > node.data) {
      node.right = this.recursiveDelete(node.right, data);
    } else {
      //if this code is reached, we are on the node we want to delete
      if (node.left === null) {
        return node.right; //either return replaces the current node with its left/right child, in effect deleting it
      } else if (node.right === null) {
        return node.left;
      }
      //if the node has 2 children, we must get the inorder successor
      node.data = this.recursiveMin(node.right);
      node.right = this.recursiveDelete(node.right, node.data); //this line deletes the inorder successor after replacing it
    }
    return node;
  }
  recursiveMin(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }
  findMin() {
    let node = this.root;
    if (node === null) {
      return null;
    }
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }
  findMax() {
    let node = this.root;
    if (node === null) {
      return null;
    }
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
  dfsInOrder(fn) {
    let results = [];

    const traverse = (node) => {
      if (node.left) traverse(node.left);

      if (fn && typeof fn === "function") {
        fn(node.data);
      } else {
        results.push(node.data);
      }

      if (node.right) traverse(node.right);
    };
    traverse(this.root)
    if (!fn) {
      return results;
    }
  }
  dfsPreOrder(fn) {
    let results = [];

    const traverse = (node) => {
      if (fn && typeof fn === "function") {
        fn(node.data);
      } else {
        results.push(node.data);
      }

      if (node.left) traverse(node.left);

      if (node.right) traverse(node.right);
    };
    traverse(this.root)
    if (!fn) {
      return results;
    }
  }
  dfsPostOrder(fn) {
    let results = [];

    const traverse = (node) => {
      if (node.left) traverse(node.left);

      if (node.right) traverse(node.right);

      if (fn && typeof fn === "function") {
        fn(node.data);
      } else {
        results.push(node.data);
      }
    };
    traverse(this.root)
    if (!fn) {
      return results;
    }
  }
  levelOrder(fn) {
    let results = [];
    let queue = [this.root];
    let currentNode;

    while (queue.length > 0) {
      currentNode = queue.pop();
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      if (fn && typeof fn === "function") {
        fn(currentNode);
      } else {
        results.push(currentNode.data);
      }
    }

    if (!fn) {
      return results;
    }
  }
  find(value) {
    let node = this.root;

    while (node !== null) {
      if (value === node.data) {
        return node;
      } else if (value < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }
  height(node) {
    if (!node) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return 1 + this.maximum(leftHeight, rightHeight);
  }
  maximum(a, b) {
    return a > b ? a : b;
  }
  depth(value) {
    let root = this.root;
    return this.recursiveDepthSearch(root, value, 0);
  }
  recursiveDepthSearch(node, value, currentDepth) {
    if (node === null) {
      //value not found in tree, means -1
      return -1;
    }
    if (node.data === value) {
      //this is the base case to stop recursion
      return currentDepth; //the currentDepth is returned having been incremented for each call
    }

    let leftDepth = this.recursiveDepthSearch(
      //recursive calls for each left node, incrementing depth count each time
      node.left,
      value,
      currentDepth + 1
    );
    if (leftDepth !== -1) {
      return leftDepth;
    }

    let rightDepth = this.recursiveDepthSearch(
      node.right,
      value,
      currentDepth + 1
    );
    if (rightDepth !== -1) {
      return rightDepth;
    }
    return -1;
  }
  isBalanced(node) {
    if (!node) return true;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return this.areHeightsBalanced(leftHeight, rightHeight);
  }
  areHeightsBalanced(a, b) {
    return Math.abs(a - b) <= 1;
  }
  rebalance(){
    const inOrderArr = this.dfsInOrder()
    let start = 0
    let end = inOrderArr.length -1;

    this.root = this.buildTree(inOrderArr, start, end)

  }
}
export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};



