let values = [5, 3, 8, 1, 9, 2];

updateVisualization(values); 

function randomizeArray() {
  values.sort(() => Math.random() - 0.5); 
  updateVisualization(values); 
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function  insertionSort() {
  for (let i = 1; i < values.length; i++) {
    let key = values[i];
    let j = i - 1;

    while (j >= 0 && values[j] > key) {
      values[j + 1] = values[j];
      j--;
    }

    values[j + 1] = key;
    updateVisualization(values); 
    await sleep(500);
  }
}

async function selectionSort() {
  for (let i = 0; i < values.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < values.length; j++) {
      if (values[j] < values[minIndex]) {
        minIndex = j;
      }
    }

    [values[i], values[minIndex]] = [values[minIndex], values[i]];
    updateVisualization(values); 
    await sleep(500);
  }
}

async function bubbleSort() {
    for (let i = 0; i < values.length - 1; i++) {
      for (let j = 0; j < values.length - i - 1; j++) {
        if (values[j] > values[j + 1]) {
          [values[j], values[j + 1]] = [values[j + 1], values[j]]; 
        }
        updateVisualization(values);
        await sleep(500);
      }
    }
    return values;
  }

async function quick(){
    values =  quickSort(values);
    await sleep(1000)
    updateVisualization(values);
    return values;
}

function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === Math.floor(arr.length / 2)) {
        continue;
      }
  
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
      
    }
    ans =  quickSort(left).concat([pivot], quickSort(right));
    return  ans;
  }

function mergeSort(){
    values = mergeSortfun(values);
    updateVisualization(values);
    return values;
}

  function mergeSortfun(arr) {
    if (arr.length <= 1) return arr;
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSortfun(left), mergeSortfun(right));
  }
  
  function merge(left, right) {
    const result = [];
    while (left.length > 0 && right.length > 0) {
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return [...result, ...left, ...right];
  }

  async function shellSort() {
    let gap = Math.floor(values.length / 2);
    while (gap > 0) {
      for (let i = gap; i < values.length; i++) {
        let j = i;
        while (j >= gap && values[j] < values[j - gap]) {
          [values[j], values[j - gap]] = [values[j - gap], values[j]];
          j -= gap;
        }
      }
      gap = Math.floor(gap / 2);
      await sleep(500);
      updateVisualization(values);
    }
    return values;
  }
  
  

function updateVisualization(arr) {

    const canvas = document.getElementById("visualization");
    const ctx = canvas.getContext('2d');

    const barWidth = 20; 
    const barSpacing = 10; 
    const margin = 10; 

    const canvasWidth = arr.length * (barWidth + barSpacing) + 2 * margin;
    const canvasHeight = 300; 
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const maxValue = Math.max(...arr);
    const scaleFactor = canvasHeight / maxValue;

    ctx.fillStyle = 'lightblue';
    for (let i = 0; i < arr.length; i++) {
    const barHeight = arr[i] * scaleFactor;
    const x = i * (barWidth + barSpacing) + margin;
    const y = canvasHeight - barHeight;
    ctx.fillRect(x, y, barWidth, barHeight);
    }
    ctx.fillStyle = 'black'; 
  ctx.font = '12px Arial'; 
  for (let i = 0; i < arr.length; i++) {
    const barHeight = arr[i] * scaleFactor;
    const x = i * (barWidth + barSpacing) + margin + barWidth / 2; 
    const y = canvasHeight - barHeight + 15; 
    ctx.fillText(arr[i], x, y);
  }
}



const randomizeButton = document.getElementById("randomize");
const insertionButton = document.getElementById("insertion");
const selectionButton = document.getElementById("selection");
const bubbleButton = document.getElementById("bubble");
const quickButton = document.getElementById("quick");
const mergeButton = document.getElementById("merge");
const shellButton = document.getElementById("shell");

randomizeButton.addEventListener("click", randomizeArray);
insertionButton.addEventListener("click", insertionSort);
selectionButton.addEventListener("click", selectionSort);
bubbleButton.addEventListener("click", bubbleSort);
quickButton.addEventListener("click", quick);
mergeButton.addEventListener("click", mergeSort);
shellButton.addEventListener("click", shellSort);