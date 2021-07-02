import './style.css';
import { dropDownMaker } from './dropdown';
import { mobileMenuMaker } from './mobilemenu';
import { imageSliderMaker } from './imageslider';
import { navHandler } from './mainnav';
import bear1 from './images/bear1.jpg';
import bear2 from './images/bear2.jpg';
import bear3 from './images/bear3.jpg';
import bear4 from './images/bear4.jpg';
import bear5 from './images/bear5.jpg';



function init(){
    //Dropdown init
    const gen = dropDownMaker();
    const applyButton = document.getElementById("apply-css-button");
    const slider = document.getElementById("dropdown-slider");
    
    applyButton.addEventListener("click", () =>{
        const textArea = document.getElementById("hover-properties");
        const textArea2 = document.getElementById("content-properties");
        const trigger = document.getElementsByClassName("dropdown-trigger")[0];
        const content = document.getElementsByClassName("dropdown-content")[0];
        if(slider.value === '1') gen.generateDropDownDynamic(trigger, content, "click", textArea.value, textArea2.value);
        else gen.generateDropDownDynamic(trigger, content, "mouseenter", textArea.value, textArea2.value);
    })

    //MobileMenu init
    const mobileButton = document.getElementById("mobile-menu-button");
    const mobileContainer = document.getElementById("mobile-nav-container");
    const mob = mobileMenuMaker();
    mob.generateMobileMenu(mobileButton, mobileContainer);
    mob.menuItemsInit(Array.from(document.querySelectorAll(".link-item")), mobileContainer);

    //ImageSlider init
    const imgslider = imageSliderMaker([bear1, bear2, bear3, bear4, bear5]);
    imgslider.init();

    //NavHandler init
    const navhandler = navHandler();
    navhandler.init();
}








init();