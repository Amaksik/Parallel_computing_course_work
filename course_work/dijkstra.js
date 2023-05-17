//Алгоритм Дейкстри для матриці суміжностей    
// Змінна для кількості вершин графу
let V;
const graph = [
    [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
    [ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
    [ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
    [ 0, 0, 7, 0, 9, 14, 0, 0, 0],
    [ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
    [ 0, 0, 4, 14, 10, 0, 2, 0, 0],
    [ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
    [ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
    [ 0, 0, 2, 0, 0, 0, 6, 7, 0 ]];
/*Допоміжна функція для пошуку вершини 
з мінімальною відстанню із множини вершин, 
які ще не включено до найкоротших шляхів*/
function minDistance(dist,visited)
{
    // Ініціалізація 
    let min = Number.MAX_VALUE;
    let index_of_min_vertex = -1;
      
    for(let v = 0; v < V; v++)
    {
        if (visited[v] == false && dist[v] <= min) 
        {
            min = dist[v];
            index_of_min_vertex = v;
        }
    }
    return index_of_min_vertex;
}
  
/*Допоміжна функція для виведеня результату*/
function printResult(dist)
{
    console.log("Вершина \t\t Відстань від початкової");
    for(let i = 0; i < V; i++)
    {
        console.log(i + " \t\t " +  dist[i]);
    }
}
  
dijkstra = (graph, startNode = graph[0][0]) =>
{
    V = graph[0].length; // Вираховуємо кількість вершин в отриманому графі
    let dist = new Array(V);
    let visited = new Array(V);  
    /*
    Ініціалізуємо відстань до всіх вершин як Нескінченність 
    І виставляємо для кожної вершини значення хибність(false) в списку відвіданих
    */
    for(let i = 0; i < V; i++)
    {
        dist[i] = Number.MAX_VALUE;
        visited[i] = false;
    }
    // Для початкової вершини відстань до початку завжди нульова
    dist[startNode] = 0;
    // Шукаємо найкоротший шлях для всіх вершин 
    for(let count = 0; count < V - 1; count++)
    {
        /*
        Обираємо вершину з мінімальною відстанню
        з множини вершин що ще не оброблено. 
        змінна u завжди дорівнює початковій (startNode) на першій ітерації.
        */
        let u = minDistance(dist, visited);
      
        // Відмічаємо обрану вершину як оброблену
        visited[u] = true;
          
        // Оновлюємо значення dist суміжних вершин до обраної вершини.*/
        for(let v = 0; v < V; v++)
        {
              
            /*
            ЛОГІКА ОНОВЛЕННЯ ВІДСТАНЕЙ
            Оновлюємо dist[v], лише 
                якщо вершине не знаходиться в «відвіданому» списку, 
                є ребро від u до v, 
                загальна вага шляху від очатку до v через u менша за поточне значення dist[v]
            */
            if (!visited[v] && graph[u][v] != 0 && 
                   dist[u] != Number.MAX_VALUE &&
                   dist[u] + graph[u][v] < dist[v])
            {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
      
    // Виводимо результат
    //Необхідно закоментувати для тестування швидкодії та єкспериментів
    printResult(dist);
    //return dist;
}

//console.log("paralel algorithm result")
//dijkstra(graph, 0);
