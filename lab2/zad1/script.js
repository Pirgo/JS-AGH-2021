var inputs = document.getElementsByTagName('input');


inputs[2].addEventListener('click', ()=>{
    console.log(inputs[0].value);
    console.log(typeof(inputs[0].value));
    console.log(inputs[1].value);
    console.log(typeof(inputs[1].value));
})
