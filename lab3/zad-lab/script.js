let points = 0;
const gameArea = document.querySelector("#game-area");
const pointHTML = document.querySelector("#points");

function setCellClass() {
  let red = "red-";
  let green = "green-";
  let className = "table-cell-";
  let number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  let randomColor = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  if (randomColor == 1) {
    return [className + red + String(number), -number];
  } else {
    return [className + green + String(number), number];
  }
}

function clickEv(event) {
  points += parseInt(event.target.attributes.value.nodeValue);
  pointHTML.innerHTML = points;
}

function endGame() {
  cells = document.getElementsByTagName("td");
  for (cell of cells) {
    cell.removeEventListener("click", clickEv);
  }
}

function changeColor() {
  cells = document.getElementsByTagName("td");
  if (cells.length > 1) {
    let rand1 = Math.floor(Math.random() * cells.length);
    let rand2 = Math.floor(Math.random() * cells.length);
    while (rand1 == rand2) {
      rand2 = Math.floor(Math.random() * cells.length);
    }
    let oldClass1 = cells[rand1].classList[0];
    let oldClass2 = cells[rand2].classList[0];
    cells[rand1].classList.remove(oldClass1);
    cells[rand2].classList.remove(oldClass2);
    let classVal1 = setCellClass();
    let classVal2 = setCellClass();
    while (oldClass1 == classVal1[0]) {
      classVal1 = setCellClass();
    }
    while (oldClass2 == classVal2[0]) {
      classVal2 = setCellClass();
    }
    cells[rand1].classList.add(classVal1[0]);
    cells[rand1].setAttribute("value", classVal1[1]);
    cells[rand2].classList.add(classVal2[0]);
    cells[rand2].setAttribute("value", classVal2[1]);
  }
}

function modifyCellNumber() {
  let number = Math.floor(Math.random() * 4);
  if (number == 0) {
    if (gameArea.children.length != 0) {
      let toDel = Math.floor(Math.random() * gameArea.children.length);
      gameArea.removeChild(gameArea.children[toDel]);
    }
  } else if (number == 1) {
    let rows = document.getElementsByTagName("tr");
    if (rows.length != 0 && rows[0].children.length != 0) {
      let toDel = Math.floor(Math.random() * rows[0].children.length);
      for (row of rows) {
        row.removeChild(row.children[toDel]);
      }
    }
  } else if (number == 2) {
    let rows = document.getElementsByTagName("tr");
    if(rows.length == 0){
        tmp = document.createElement('tr')
        gameArea.appendChild(tmp)
        rows = document.getElementsByTagName("tr");
    }
    for (row of rows) {
      let newCell = document.createElement("td");
      tmp = setCellClass();
      newCell.classList.add(tmp[0]);
      newCell.setAttribute("value", tmp[1]);
      row.appendChild(newCell);
      newCell.addEventListener("click", clickEv);
    }
  } else {
      let newRow = document.createElement('tr');
      let rows = document.getElementsByTagName('tr')
      for(let i = 0; i < rows[0].children.length; i++){
        let newCell = document.createElement("td");
        tmp = setCellClass();
        newCell.classList.add(tmp[0]);
        newCell.setAttribute("value", tmp[1]);
        newRow.appendChild(newCell);
        newCell.addEventListener("click", clickEv);
      }
      gameArea.appendChild(newRow)
  }
}

function initArea(rowNumber, colNumber) {
  for (let i = 0; i < rowNumber; i++) {
    let newRow = document.createElement("tr");
    for (let j = 0; j < colNumber; j++) {
      let newCell = document.createElement("td");
      tmp = setCellClass();
      newCell.classList.add(tmp[0]);
      newCell.setAttribute("value", tmp[1]);
      newRow.appendChild(newCell);
      newCell.addEventListener("click", clickEv);
    }
    gameArea.appendChild(newRow);
  }
  let clearColor = setInterval(changeColor, 1000);
  let clearModify = setInterval(modifyCellNumber, 2000);

  setTimeout(() => {
    cells = document.getElementsByTagName("td");
    for (cell of cells) {
      cell.removeEventListener("click", clickEv);
    }
    clearInterval(clearColor);
    clearInterval(clearModify);
  }, 30000);
}
