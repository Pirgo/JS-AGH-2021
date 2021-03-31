
var SetIntervalTime = [];
var SetTimeoutTime = [];
var N = 10;
var delayD =  document.getElementById("delay");
var idInt;
var idTime;
var idAnim;

function calculatePrimes(iterations, multiplier) {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
      var candidate = i * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
  }

function doTimeConsumingCallculationsWithSetInterval(){
    SetIntervalTime.push(performance.now());
    if (SetIntervalTime.length > N){
        SetIntervalTime.shift()
    }
    calculatePrimes(1000, 1000000000);
}

function doTimeConsumingCallculationsWithSetTimeout(){
    SetTimeoutTime.push(performance.now());
    if (SetTimeoutTime.length > N){
        SetTimeoutTime.shift()
    }
    calculatePrimes(1000, 1000000000);
    idTime = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, delay)
}

function drawChart(){
    let avgTimeout = 0;
    let avgInterval = 0;
    if(SetIntervalTime.length > 1 && SetTimeoutTime.length > 1){
        for (let i=SetTimeoutTime.length - 1; i>0; i--){
            avgTimeout += (SetTimeoutTime[i] - SetTimeoutTime[i-1])
        } 
        avgTimeout /= SetTimeoutTime.length - 1;
        for (let i=SetIntervalTime.length - 1; i>0; i--){
            avgInterval += (SetIntervalTime[i] - SetIntervalTime[i-1])
        }
        avgInterval /= SetIntervalTime.length - 1;
    }
    var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "Time chart"              
		},
		data: [              
		{
			type: "column",
			dataPoints: [
				{ label: "Timeout",  y: avgTimeout  },
				{ label: "Interval", y: avgInterval  },
			]
		}
		]
	});
	chart.render();
    idAnim = window.requestAnimationFrame(drawChart);
}

function start(){
    delay = delayD.value
    if(delay == "" || isNaN(delay)){
        alert("please put a number");
        return;
    }
    if(delay < 0){
        alert("positive number");
        return
    }
    idInt = window.setInterval(doTimeConsumingCallculationsWithSetInterval, parseInt(delay));
    idTime = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, parseInt(delay));
    idAnim = window.requestAnimationFrame(drawChart);


}

function stop(){
    window.cancelAnimationFrame(idAnim);
    window.clearInterval(idInt);
    window.clearTimeout(idTime);
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
