exports.dijkstra = (graph, startNode = Object.keys(graph)[0]) => {
    const distances = {};
    const visited = {};
    const queue = [];
  
    // Initialize distances and visited flags
    for (const node in graph) {
      distances[node] = Infinity;
      visited[node] = false;
    }
  
    // Set distance of the start node to 0
    distances[startNode] = 0;
  
    // Add start node to the queue
    queue.push(startNode);
  
    while (queue.length > 0) {
      // Get the node with the minimum distance from the queue
      const currentNode = queue.shift();
  
      if (visited[currentNode]) {
        continue; // Skip if already visited
      }
  
      visited[currentNode] = true;
  
      // Explore neighbors of the current node
      for (const neighbor in graph[currentNode]) {
        const distance = distances[currentNode] + graph[currentNode][neighbor];
  
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          queue.push(neighbor);
        }
      }
    }
  
    return distances;
  }