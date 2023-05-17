const { workerData, parentPort } = require('worker_threads');
/*Змінена функція для пошуку вершини 
з мінімальною відстанню із множини вершин, 
які ще не включено до найкоротших шляхів*/
function minDistance(dist,visited, start, end)
{
    // Ініціалізація 
    let min = Number.MAX_VALUE;
    let index_of_min_vertex = -1; 
    for(let v = start; v < end; v++)
    {
        if (visited[v] == false && dist[v] <= min) 
        {
            min = dist[v];
            index_of_min_vertex = v;
        }
    }
    return index_of_min_vertex;
}
const { graph, distances, start, end } = workerData;
const localDist = [];

for (const node of graph) {
  const nodeValue = minDistance(node, distances, start, end);
  if (nodeValue <= minDistance) {
    localDist.push(node);
  }
}

parentPort.postMessage(localDist);
