const {dijkstra} = require('./dj');
const {readToGraph} = require('./readToGraph');
/*
const graph = {
    A: { B: 5, C: 2 },
    B: { D: 4 },
    C: { B: 1, D: 7 },
    D: {},
};
const graph100 = readToGraph('./test100.txt', 0, 99);
*/
const graph2000 = readToGraph('./test2000.txt', 0, 1999);

const graph5000 = readToGraph('./test5000.txt', 0, 4999);

const graph6000 = readToGraph('./test6000.txt', 0, 4999);

const graph8000 = readToGraph('./test8000.txt', 0, 4999);

console.time("small-test");
console.log(dijkstra(graph));
console.timeEnd("small-test");

console.time("100-test");
dijkstra(graph100);
console.timeEnd("100-test");

console.time("2000-test");
dijkstra(graph2000);
console.timeEnd("2000-test");

console.time("5000-test");
dijkstra(graph5000);
console.timeEnd("5000-test");

console.time("6000-test");
dijkstra(graph6000);
console.timeEnd("6000-test");

console.time("8000-test");
dijkstra(graph8000);
console.timeEnd("8000-test");


console.time("test");
console.log(dijkstra(graph));
console.timeEnd("test");
/*const graph = [ 
    [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
    [ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
    [ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
    [ 0, 0, 7, 0, 9, 14, 0, 0, 0],
    [ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
    [ 0, 0, 4, 14, 10, 0, 2, 0, 0],
    [ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
    [ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
    [ 0, 0, 2, 0, 0, 0, 6, 7, 0 ]];
console.time("test");
dijkstra(graph, 0);
console.timeEnd("test");*/