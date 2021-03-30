document.getElementById("set").addEventListener("click", ()=>{

    for (el of document.getElementsByTagName("h1")){
        el.classList.add("h1-c");
    }
    for (el of document.getElementsByTagName("aside")){
        el.classList.add("aside-c");
        el.classList.add("azure");
    }
    for (el of document.getElementsByTagName("footer")){
        el.classList.add("footer-c");
        el.classList.add("azure");
    }
    for (el of document.getElementsByTagName("header")){
        el.classList.add("header-c");
        el.classList.add("azure");
    }
    for (el of document.getElementsByTagName("main")){
        el.classList.add("main-c");
        el.classList.add("azure");
    }
    for (el of document.getElementsByTagName("nav")){
        el.classList.add("nav-c");
        el.classList.add("azure")
    }
    for (el of document.getElementsByTagName("blockquote")){
        el.classList.add("blockquote-c");
    }
    document.getElementsByTagName("div")[0].classList.add("grid-container");
    document.getElementById("animation").classList.add("h1-animation");


})

document.getElementById("del").addEventListener("click", ()=>{
    for (el of document.getElementsByTagName("h1")){
        el.classList.remove("h1-c");
    }
    for (el of document.getElementsByTagName("aside")){
        el.classList.remove("aside-c");
        el.classList.remove("azure");
    }
    for (el of document.getElementsByTagName("footer")){
        el.classList.remove("footer-c");
        el.classList.remove("azure");
    }
    for (el of document.getElementsByTagName("header")){
        el.classList.remove("header-c");
        el.classList.remove("azure");
    }
    for (el of document.getElementsByTagName("main")){
        el.classList.remove("main-c");
        el.classList.remove("azure");
    }
    for (el of document.getElementsByTagName("nav")){
        el.classList.remove("nav-c");
        el.classList.remove("azure")
    }
    for (el of document.getElementsByTagName("blockquote")){
        el.classList.remove("blockquote-c");
    }
    document.getElementsByTagName("div")[0].classList.remove("grid-container");
    document.getElementById("animation").classList.remove("h1-animation");
})