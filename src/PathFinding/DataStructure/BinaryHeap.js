// this the modified version of binary heap implementation from eloquent javascript book
// you can see the original version here: https://eloquentjavascript.net/1st_edition/appendix2.html

export default class BinaryHeap {
  constructor(getScore) {
    this.content = [];
    // instead of hard-coding getter for node's value, we will receive as an argument
    //! But whenever we need node's value, we will call this function like getScore(node)
    //! instead of hard-coding like node.value
    this.getScore = getScore;
  }
  push(node) {
    // add new element to the end of array
    this.content.push(node);
    // let it bubble up
    this.bubbleUp(this.content.length - 1);
  }
  pop() {
    let result = this.content[0];

    // get last node and replace it with first node
    let endNode = this.content.pop(); // this is Array.prototype.pop, not this class method pop

    // let it sinkDown
    if (this.content.length > 0) {
      this.content[0] = endNode;
      this.sinkDown(0);
    }

    return result;
  }

  remove(node) {
    let length = this.content.length;
    let nodeValue = this.getScore(node);
    // to remove a node, we must find item that's equal to node's value
    for (let i = 0; i < length; i++) {
      // continue to next item if node value is not equal to current one
      if (nodeValue !== this.getScore(this.content[i])) continue;

      // get reference to the last item
      let endNode = this.content.pop(); // this pop() is Array.prototype.pop

      // if node is the last item, we r done
      if (i === length - 1) break;
      // replace the node with the last node
      this.content[i] = endNode;
      // let it bubble up or sinkdown to reorder the node and then break out the loop, we r done
      this.bubbleUp(i);
      this.sinkDown(i);
      break;
    }
  }
  size() {
    return this.content.length;
  }
  reorderNode(node) {
    let index = this.content.indexOf(node);
    this.bubbleUp(index);
    this.sinkDown(index);
  }
  sinkDown(i) {
    let index = i;
    let node = this.content[index];
    let nodeValue = this.getScore(node);
    let length = this.content.length;

    while (true) {
      let rightIndex = (index + 1) * 2;
      let leftIndex = rightIndex - 1;
      let rightNode = this.content[rightIndex];
      let rightNodeValue = this.getScore(rightNode);
      let leftNode = this.content[leftIndex];
      let leftNodeValue = this.getScore(leftNode);
      let temp = null;

      // if left child exists
      if (leftIndex < length) {
        if (leftNodeValue < nodeValue) temp = leftIndex;
      }
      // if right child exists
      if (rightIndex < length) {
        if (rightNodeValue < (temp === null ? nodeValue : leftNodeValue))
          temp = rightIndex;
      }
      // if temp is null, node is smaller than both of its children
      if (temp === null) break;
      // swap
      this.content[index] = this.content[temp];
      this.content[temp] = node;
      index = temp;
    }
  }

  bubbleUp(i) {
    let index = i;
    let node = this.content[index];
    let nodeValue = this.getScore(node);

    // except root node
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.content[parentIndex];
      // node value is greater than parent value, break out the loop
      if (nodeValue >= this.getScore(parent)) break;
      // swap node and it's parent
      this.content[parentIndex] = node;
      this.content[index] = parent;
      index = parentIndex;
    }
  }
}
