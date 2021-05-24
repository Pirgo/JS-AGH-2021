function onRequest_8080(request, response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(`<form>
        <label for="area"></label>
        <input type="text" name="area" id="area">
        <label for="location"></label>
        <input type="text" name="location" id="location">
        <input type="button" value="Pobierz" onclick="download()">
        </form>`);
  response.write(`<h1>Remote</h1>
    <div id='remote'>
    Remote date and time
    </div>
    <!-- ***************** -->
    <h1>Local</h1>
    <div id='local'>
    Local date and time
    </div>`);
  response.write(`<script>
    function download(){
        let toBeReplaced = document.getElementById("remote");
        let replaceElement = document.createElement('div');
        let replaceContent = document.createTextNode("Downloading data");
        replaceElement.appendChild(replaceContent);
        replaceElement.setAttribute("id", "remote")
        let parent = toBeReplaced.parentNode;
        parent.replaceChild(replaceElement, toBeReplaced)
        getData()
    }
    function getData(){
        const area = document.getElementById('area').value;
        const location = document.getElementById('location').value;
    
        fetch('http://worldtimeapi.org/api/timezone/' + area + '/' + location)
        .then(response => response.json())
        .then(result =>{
            let toBeReplaced = document.getElementById("remote");
            let replaceElement = document.createElement('div');
            let replaceContent = document.createTextNode(result.datetime);
            replaceElement.appendChild(replaceContent);
            replaceElement.setAttribute("id", "remote")
            let parent = toBeReplaced.parentNode;
            parent.replaceChild(replaceElement, toBeReplaced)
            console.log(result)
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
  </script>`);
  response.end();
}

function onRequest_8081(request, response) {
  let date = new Date();
  response.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
  response.write(`<div>
    <span id="data">${date.toDateString()}</span>
    <span id="czas">${date.toTimeString()}</span>
</div>`);
  response.end();
}

/* ************************************************** */
/* Main block
  /* ************************************************** */
var http = require("http");

http.createServer(onRequest_8080).listen(8080);
http.createServer(onRequest_8081).listen(8081);
console.log("The server was started on port 8080 and 8081");
console.log("To stop the server, press 'CTRL + C'");
