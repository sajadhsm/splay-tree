/** Class representing a SplayTree */
class SplayTree {
  /**
   * Create a SplayTree
   */
  constructor() {
    this._root = null;
    this._size = 0;
  }
  /**
   * Insert new entry and make it as the new root
   * @param {number} key 
   * @param {*} value 
   * @returns {object} The new root
   */
  insert(key, value) {
    let root = this._root;
    let p = null;

    const node = {
      parent: null,
      right: null,
      left: null,
      key: key,
      value: value
    };

    if (!root) {
      // Inserting first node (the root)
      this._root = node;
      root = node;
      this._size++;
      return this._root;
    } else {
      // BST Insertion with no dublicates
      while (root) {
        p = root;
        if (root.key === key) {
          return false;
        } else {
          root = (key > root.key) ? root.right : root.left;
        }
      }

      node.parent = p;
      root = node;

      if (key > p.key) p.right = node;
      else p.left = node;
    }

    this.splay(root);
    this._size++;
    return root;
  }

  /**
   * Splay the tree base on x as root
   * @param {object} x - The node to splay
   */
  splay(x) {
    let p, gp, ggp, l, r;

    while (x.parent) {
      p = x.parent;
      gp = p.parent;

      if (gp && gp.parent) {
        ggp = gp.parent;
        if (ggp.left === gp) ggp.left = x;
        else ggp.right = x;
        x.parent = ggp;
      } else {
        x.parent = null;
        this._root = x;
      }

      l = x.left;
      r = x.right;

      if (x === p.left) { // left
        if (gp) {
          if (gp.left === p) {
            /* zig-zig */
            if (p.right) {
              gp.left = p.right;
              gp.left.parent = gp;
            } else gp.left = null;

            p.right = gp;
            gp.parent = p;
          } else {
            /* zig-zag */
            if (l) {
              gp.right = l;
              l.parent = gp;
            } else gp.right = null;

            x.left = gp;
            gp.parent = x;
          }
        }
        if (r) {
          p.left = r;
          r.parent = p;
        } else p.left = null;

        x.right = p;
        p.parent = x;
      } else { // right
        if (gp) {
          if (gp.right === p) {
            /* zig-zig */
            if (p.left) {
              gp.right = p.left;
              gp.right.parent = gp;
            } else gp.right = null;

            p.left = gp;
            gp.parent = p;
          } else {
            /* zig-zag */
            if (r) {
              gp.left = r;
              r.parent = gp;
            } else gp.left = null;

            x.right = gp;
            gp.parent = x;
          }
        }
        if (l) {
          p.right = l;
          l.parent = p;
        } else p.right = null;

        x.left = p;
        p.parent = x;
      }
    }
  }

  /**
   * Search if given key is in the tree
   * If found splays the tree base on it
   * if not splays the tree base on last accessed node
   * @param {number} key - The key of entry to search 
   */
  search(key) {
    let r = this._root;

    while (r) {
      if (key === r.key) {
        this.splay(r);
        return r;
      };

      if (key > r.key) {
        if (r.right) r = r.right;
        else {
          this.splay(r);
          return null;
        }
      } else {
        if (r.left) r = r.left;
        else {
          this.splay(r);
          return null;
        }
      }
    }
  }

  /**
   * Search for the entry
   * if it found splays the tree base on it and then remove it
   * if not, last accessed node will be root
   * @param {number} key - The key of entry to be removed
   */
  delete(key) {
    const result = this.search(key);

    if (!result) return false;

    let r = this._root;


    if (!r.left && !r.right) {
      this._root = null;

    } else if (!r.left) {
      this._root = this._root.right;
      this._root.parent = null;

    } else if (!r.right) {
      this._root = this._root.left;
      this._root.parent = null;

    } else {
      const leftMax = this.maxNode(r.left);
      this.splay(leftMax);
      this._root.right = this._root.right.right;
      this._root.right.parent = this._root
    }
    this._size--;
  }

  /**
   * Find the largest key in the given tree
   * @param {object} n - The node as the root
   * @returns {object} The node with the largest key
   */
  maxNode(n = this._root) {
    if (n) {
      while (n.right) n = n.right;
    }
    return n;
  }

  /**
   * Find the smallest key in the given tree
   * @param {object} n - The node as the root
   * @returns {object} The node with the smallest key
   */
  minNode(n = this._root) {
    if (n) {
      while (n.left) n = n.left;
    }
    return n;
  }

  /**
   * Returns node keys
   * @returns {number[]} Array containing keys
   */
  keys() {
    const keysArray = [];
    inorderTraverse(this._root, keysArray);
    return keysArray;
  }

  /**
   * Check if the tree is empty or not
   * @returns {boolean}
   */
  isEmpty() {
    return this._root === null;
  }

  /**
   * Return the number of nodes in the tree
   * @returns {number}
   */
  get size() {
    return this._size;
  }

  /**
   * Returns the root of the tree
   * @returns {Object} Root of the tree
   */
  get root() {
    return this._root;
  }
}

// Hepler tree traversal function
function inorderTraverse(node, array) {
  if (node === null) return;
  inorderTraverse(node.left, array);
  array.push(node.key);
  inorderTraverse(node.right, array);
}

module.exports = SplayTree;