function download(){
    let toBeReplaced = document.getElementById("remote");
    let replaceElement = document.createElement('div');
    let replaceContent = document.createTextNode("Downloading data");
    replaceElement.appendChild(replaceContent);
    replaceElement.setAttribute("id", "remote")
    let parent = toBeReplaced.parentNode;
    parent.replaceChild(replaceElement, toBeReplaced)
    
}

function getData(){
    const area = document.getElementById('area').value;
    const location = document.getElementById('location').value;
    const myRequest = {
        method: "POST",
        mode: 'cors'
        
      };

    fetch('http://worldtimeapi.org/api/timezone/' + area + '/' + location, myRequest)
    .then(response => response.json())
    .then(result =>{
        let toBeReplaced = document.getElementById("remote");
        let replaceElement = document.createElement('div');
        let replaceContent = document.createTextNode(`${result.datetime}`);
        replaceElement.appendChild(replaceContent);
        replaceElement.setAttribute("id", "remote")
        let parent = toBeReplaced.parentNode;
        parent.replaceChild(replaceElement, toBeReplaced)
    })
    .catch(err =>{
        console.log(err);
    })

    fetch('http://localhost:8081/')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html')
        let date = doc.getElementById("data")
        let time = doc.getElementById("czas")
        let toBeReplaced = document.getElementById("local");
        let replaceElement = document.createElement('div');
        replaceElement.setAttribute("id", "local");
        replaceElement.appendChild(date)
        replaceElement.appendChild(time)
        let parent = toBeReplaced.parentNode;
        parent.replaceChild(replaceElement, toBeReplaced)
    })
    .catch(err =>{
        console.log(err);
    })
}

function getDate(){
    let date = Date()
    let toBeReplaced = document.getElementById("local");
    let replaceElement = document.createElement('div');
    let firstSpan = document.createElement("span")
    firstSpan.setAttribute("id", "data");
    let firstSpanText = document.createTextNode(date.toDateString())
    firstSpan.appendChild(firstSpanText);
    replaceElement.setAttribute("id", "local")

    let secondSpan = document.createElement("span")
    secondSpan.setAttribute("id", "czas");
    let secondSpanText = document.createTextNode(date.toTimeString())
    secondSpan.appendChild(secondSpanText)
    replaceElement.appendChild(firstSpan);
    replaceElement.appendChild(secondSpan);

    let parent = toBeReplaced.parentNode;
    parent.replaceChild(replaceElement, toBeReplaced)
}

