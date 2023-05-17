exports.mergeChunks = (chunks) => {
  const mergedChunk = {};

  for (let i = 1; i < chunks.length; i++) {
    const currentChunk = i==1 ? chunks[0]: mergedChunk;
    const nextChunk = chunks[i];

    let tentativeVertex = currentChunk[Object.keys(nextChunk)[0]];

    if (tentativeVertex) {
      // Merge properties from the current chunk
      for (const property in nextChunk) {
          if (nextChunk && property in nextChunk) {
            let tentativeDistance = tentativeVertex + nextChunk[property];
            let currentDistance = currentChunk[property];
            // Property present in both or second chunk
            mergedChunk[property] = typeof currentDistance == 'number' ? 
                                                    Math.min(currentDistance, tentativeDistance)
                                                    : tentativeDistance;
          }
          else {
            // Property only present in the current chunk
            mergedChunk[property] = currentChunk[property];
          }
      }
    } else {
      continue; // Stop merging if the first property of the next chunk doesn't match the initial one
    }
  }

  return mergedChunk;
}
/*
const chunks = [
  { A: 0, B: 5, C: 2, D: 9 },
  { C: 0, D: 7, A: 13, B: 1 },
  { D: 0, F: 2, E: 4 },
];

const mergedChunk = mergeChunks(chunks);
console.log(mergedChunk);
*/




/*

function mergeChunks(chunks) {
  const mergedChunk = {};

  for (let i = 1; i < chunks.length; i++) {
    const currentChunk = i==1 ? chunks[0]: mergedChunk;
    const nextChunk = chunks[i];
    console.log(Object.keys(nextChunk)[0]);
    console.log(currentChunk[Object.keys(nextChunk)[0]]);
    if (currentChunk[Object.keys(nextChunk)[0]]) {
      // Merge properties from the current chunk
      for (const property in nextChunk) {
        if (property !== 0) {
          if (nextChunk && property in nextChunk) {
            // Property present in both chunks
            mergedChunk[property] = currentChunk[property]? Math.min(
                                                            currentChunk[property],
                                                            currentChunk[property] + nextChunk[property])
                                                          : nextChunk[property];
          }
          else {
            // Property only present in the current chunk
            mergedChunk[property] = currentChunk[property];
          }
        }
      }
    } else {
      break; // Stop merging if the first property of the next chunk doesn't match the initial one
    }
  }

  return mergedChunk;
}
const chunks = [
  { A: 0, B: 5, C: 2, D: 9 },
  { C: 0, D: 7, A: 13, B: 1 },
  { D: 0, F: 2, E: 4 },
];

const mergedChunk = mergeChunks(chunks);
console.log(mergedChunk);
*/