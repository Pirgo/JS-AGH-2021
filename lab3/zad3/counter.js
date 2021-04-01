class Counter extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
    }

    get count(){
        return this.getAttribute("count");
    }

    set count(val){
        this.setAttribute("count", val);
    }

    static get observedAttributes(){
        return ["count"]
    }

    attributeChangedCallback(property, oldVal, newVal){
        if(property === 'count'){
            this.render()
        }
    }

    connectedCallback(){
        this.render()
    }

    render(){
        this.shadow.innerHTML = `
        ${this.count}`
    }
}

customElements.define("my-counter", Counter);