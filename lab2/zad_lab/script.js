var txt = document.getElementsByTagName("textarea")[0];
var check = document.getElementById("check");
var savedMap = new Map();
var cntMap = new Map();





document.getElementById("myBtn").addEventListener("click", ()=>{
    let n = parseInt(document.getElementById("N").value);
    let res;
    let cnt;
    var flag = false;
    if(check.checked){
        res = savedMap;
        cnt = cntMap;
    }
    else{
        res = new Map();
        cnt = new Map();
        flag = true;
    }
    for (str of txt.value.split(' ')){

        if(!cnt.has(str.length)){
            cnt.set(str.length, 1);
        }
        else{
            cnt.set(str.length, cnt.get(str.length)+1);
        }

        if(!res.has(str)){
            res.set(str, 1)
        }
        else{
            res.set(str, res.get(str)+1);
        }

        if(flag){
            if(!cntMap.has(str.length)){
                cntMap.set(str.length, 1);
            }
            else{
                cntMap.set(str.length, cntMap.get(str.length)+1);
            }
    
            if(!savedMap.has(str)){
                savedMap.set(str, 1)
            }
            else{
                savedMap.set(str, savedMap.get(str)+1);
            }
        }
    }
    
    console.log(res);
    console.log(cnt.get(n));

})