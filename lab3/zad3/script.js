var licznik = document.querySelector("#licznik")
var spans = document.getElementsByTagName("span")

function decrement(){
    for (span of spans){
        if(span.value > 0) span.value = span.value - 1;
    }
}

window.addEventListener("load", ()=>{
    for(span of spans){
        console.log(span)
        span.innerHTML = "10";
    }
})


licznik.addEventListener("change", ()=>{
    console.log("dupa")
})

window.setInterval(decrement, 1000);