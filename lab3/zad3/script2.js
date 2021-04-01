var licznik = document.querySelector("#licznik")
var counters = document.getElementsByTagName("my-counter");

function decrement(){
    for(counter of counters){
        if(counter.count > 0){
            counter.count -= 1;
            if(counter.count == 0){
                licznik.value = 0;
            }
        }
    }

}

function update(){

    for(counter of counters){
        counter.count = licznik.value
    }
}

window.addEventListener("load", update);
licznik.addEventListener("change", update);

setInterval(decrement, 1000);