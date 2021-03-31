var licznik = document.querySelector("#licznik");
var spans = document.getElementsByTagName("span");
var form = document.querySelector("form");

function decrement() {
  let elements = [];
  for (span of spans) {
    if (parseInt(span.innerHTML) > 0) {
      let tmp = parseInt(span.innerHTML) - 1;
      let tmpElement = document.createElement("span");
      tmpElement.appendChild(document.createTextNode(tmp));
      elements.push(tmpElement);
    }
  }
  if (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      spans[0].remove();
    }
    for (let i = 0; i < elements.length; i++) {
      form.appendChild(elements[i]);
    }
    if(elements[0].innerText == 0){
        licznik.value = 0
    }
  }
  
}

function update() {
  let elements = [];
  for (span of spans) {
    let tmpS = document.createElement("span");
    tmpS.appendChild(document.createTextNode(licznik.value));
    elements.push(tmpS);
  }

  if (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      spans[0].remove();
    }
    for (let i = 0; i < elements.length; i++) {
      form.appendChild(elements[i]);
    }
  }
}

window.addEventListener("load", () => {
  update();
});

licznik.addEventListener("change", () => {
  update()
});

setInterval(decrement, 1000);
