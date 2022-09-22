/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    let neighbors = vertex.adjacent;

    for (let neighbor of neighbors) {
      neighbor.adjacent.delete(vertex);
    }
    // you can iterate over a set like this?

    vertex.adjacent.clear();
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    /* Start at start and add to visited set as we visit
    use a stack (implemented by an array) to traverse and pop off values
    Use a while loop with a current node */

    let visited = new Set();
    let toVisitStack = [start];

    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      visited.add(current.value);

      for (let neighbor of current.adjacent) {

        if (!visited.has(neighbor.value)) {
          toVisitStack.push(neighbor);
        }
      }
    }

    let visitedArray = Array.from(visited);

    return visitedArray;
  }
//recursively
  depthFirstSearch(start, visited = new Set()) {
    /* Start at start and add to visited set as we visit */

    visited.add(start);
    for (let neighbor of start.adjacent) {
      if (!visited.has(neighbor)) {
        this.depthFirstSearch(neighbor, visited);
      }
    }
    return Array.from(visited).map(node => node.value);
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let visited = new Set();
    let toVisitQueue = [start];

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      visited.add(current.value);

      for (let neighbor of current.adjacent) {

        if (!visited.has(neighbor.value)) {
          toVisitQueue.push(neighbor);
        }
      }
    }

    let visitedArray = Array.from(visited);

    return visitedArray;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    /* Recursion with Math.min +1
    return 0 when it reaches end
     */

    // if (start === end) return 0;
    // visited.add(start);
    // let adjacents = Array.from(start.adjacent);

    // let notVisited = adjacents.filter(adjacent => !visited.has(adjacent));

    // return Math.min(notVisited.map(adjacent =>
    //   this.distanceOfShortestPath(adjacent, end, visited))
    // ) + 1;
    // better to do iteratively

    if (start === end) return 0;

    let visited = new Set();
    let toVisitQueue = [[start, 0]];
//would pop work?
    while (toVisitQueue.length) {
      let [current, distance] = toVisitQueue.shift();
      if (current === end) return distance;
        for (let neighbor of current.adjacent) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            toVisitQueue.push([neighbor, distance + 1]);
        }
      }
    }
  }

}

module.exports = { Graph, Node };
