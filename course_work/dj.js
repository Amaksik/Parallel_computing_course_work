exports.dijkstra = (graph, startNode = Object.keys(graph)[0]) => {
    const distances = {};
    const visited = {};
    const queue = [];
    // Ініціалізуємо відстані та масив відвіданих
    for (const node in graph) {
      distances[node] = Infinity;
      visited[node] = false;
    }
    // Вказуємо відстань до початкової вершини рівну 0
    distances[startNode] = 0;
    // Додаємо початкову вершину до черги
    queue.push(startNode);
    //Поки черга не порожня а=виконуємо наступні кроки
    while (queue.length > 0) {
      // отримуємо вузол з найменшою відстанню з черги
      const currentNode = queue.shift();
  
      if (visited[currentNode]) {
        continue; // Пропускаємо якщо він вже був відвіданим
      }
  
      visited[currentNode] = true;
  
      // Вивчаємо сусідні вершини до цієї
      for (const neighbor in graph[currentNode]) {
        const distance = distances[currentNode] + graph[currentNode][neighbor];
  
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          queue.push(neighbor);
        }
      }
    }
    //Повертаємо список мінімальних відстань до усіх вершин
    return distances;
  }