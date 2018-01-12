# Splay Tree
Javascript implementation of Splay tree

A splay tree is a self-balancing binary search tree which the root always points to the recently accessed element.
All base operations like insert, delete and search have **O(log n)** time-complexity.

More information: [Splay tree Wikipedia](https://en.wikipedia.org/wiki/Splay_tree)

## Example
```javascript
const SplayTree = require('./SplayTree');

const tree = new SplayTree();

tree.insert(2, 'Apple');
tree.insert(37, 'Orange');
tree.insert(12, 'Banana');

tree.delete(37);

console.log(tree.keys());
```

## API
| Method | Description |
| --- | --- |
| `insert` | Add new entry to the tree |
| `delete` | Remove entry with given key from the tree |
| `search` | Search for the enty with the given key |
| `keys` | Return list of tree keys |
| `maxNode` | Return the entry with largest key |
| `minNode` | Return the entry with smallest key |
| `root` | Return root of the tree |
| `size` | Return size of the tree |
| `isEmpty` | Checks if tree is empty or not |
