import './style.css';
import menu from './images/menu.svg';


// Menu Factory 
const mobileMenuMaker = () =>{
    let active = false;

    function generateMobileMenu(button, navContainer){
        init(navContainer, button);
        button.style["z-index"] = "1";
        button.style.position = "relative";
        button.addEventListener("click", ()=>{
            if(active){
                hideItems(navContainer);
                removeDimScreen();
                active = false;
            }
            else{
                showItems(navContainer);
                dimScreen();
                active = true;
            }

        })

    }

    function menuItemsInit(arr, navContainer){
        for(let i = 0; i < arr.length; i++){
            arr[i].addEventListener("click", () => {
                hideItems(navContainer);
                removeDimScreen();
                active = false;
             }
            );
        }
    }

    // Hide items
    function hideItems(navContainer){
        navContainer.style.position = "fixed";
        navContainer.style.overflow = "hidden";
        navContainer.style["max-height"] = "0px";
    }

    function showItems(navContainer){
        navContainer.style["max-height"] = "100%";
    }

    function dimScreen(){
        const fullscreen = document.createElement("div");
        fullscreen.id = "fullscreen";
        fullscreen.style.width = "100%";
        fullscreen.style.height = "100%";
        fullscreen.style.position = "absolute";
        fullscreen.style.top = "0";
        fullscreen.style.left = "0";
        fullscreen.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        fullscreen.style["z-index"] = "0";
        document.body.appendChild(fullscreen);
    }

    function removeDimScreen(){
        document.body.removeChild(document.getElementById("fullscreen"));
    }

    function init(navContainer, button){
        navContainer.style["z-index"] = "1";
        navContainer.transition = "max-height 0.5s ease-in";
        hideItems(navContainer);
        const icon = new Image();
        icon.src = menu;
        button.appendChild(icon);
    }




    return {
        generateMobileMenu,
        menuItemsInit,
    };

};

export {mobileMenuMaker};