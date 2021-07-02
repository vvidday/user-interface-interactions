

// Nav factory
const navHandler = () =>{
    const dropdown = document.getElementById("dropdown");
    const mobilemenu = document.getElementById("mobile-menu");
    const imageslider = document.getElementById("image-slider");
    let arrnav  = [...document.getElementById("main-nav").children];
    let arr = [dropdown, mobilemenu, imageslider];
    let current = 0;

    

    function init(){
        for(let i = 0; i < 3; i++){
            arrnav[i].addEventListener("click", ()=>{
                if(current != i) {
                    clearCurrent();
                    add(i);
                }
            })
        }
        arrnav[0].classList.add("nav-active");
}

    function clearCurrent(){
        arr[current].classList.add("invisible");
        arr[current].classList.add("absolute");
        arrnav[current].classList.remove("nav-active");
    }

    function add(toAdd){
        arr[toAdd].classList.remove("invisible");
        arr[toAdd].classList.remove("absolute");
        arrnav[toAdd].classList.add("nav-active");
        current = toAdd;
    }
    return {init};
}

export {navHandler};