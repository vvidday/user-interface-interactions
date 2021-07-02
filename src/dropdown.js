import './style.css';
// Drop-down Menus - 100% JS, can be re-used without additional CSS classes.

//Drop Down factory
const dropDownMaker = () => {

    let init = false;

    // Generator - Takes as input two HTML elements, trigger and content, and adds a drop down to trigger that will 
    // toggle drop-down for content. Takes an additional argument event that specifies if the drop down should be
    // on click, or on hover.
    function generateDropDown (trigger, content, event){
        generateDropDownCustom(trigger, content, event);
        //Simulates :hover CSS properties
        trigger.addEventListener("mouseenter", hoverEntryListener);
        trigger.addEventListener("mouseleave", hoverExitListener);
    }

    // Custom Generator - Much more useful generator that allows user to supply their own CSS classes to the dropdown.
    // User should, at minimum, define a :hover property for the trigger element.
    function generateDropDownCustom (trigger, content, event){
        content.style["max-height"] = '0px';
        content.style.overflow = "hidden";
        // If default value (no user-defined transition), add our default ease-out transition of 0.2s.
        if(getComputedStyle(content).getPropertyValue('transition') == "all 0s ease 0s") content.style.transition = "max-height 0.2s ease-out";
        if(event === "mouseenter"){
            trigger.addEventListener("mouseleave", ()=> {dropDownListener(content);});
        }
        trigger.addEventListener(event, ()=> {dropDownListener(content);});
    }

    // Dynamic Generator used for this site (custom CSS input by user)
    function generateDropDownDynamic(trigger, content, event, hovercss, contentcss){
        let clonetrigger = trigger.cloneNode(true);
        let clonecontent = content.cloneNode(true);
        trigger.parentNode.replaceChild(clonetrigger, trigger);
        content.parentNode.replaceChild(clonecontent, content);
        trigger = clonetrigger;
        content = clonecontent;
        handleTrigger(trigger, hovercss);
        handleContent(content, contentcss);
            if(event === "mouseenter"){
                trigger.addEventListener("mouseleave", ()=> {dropDownListener(content);});
            }
            trigger.addEventListener(event, ()=> {dropDownListener(content);});
            init = true;

    }

    function handleTrigger(trigger, css){
        const originalcss = getComputedStyle(trigger);
        trigger.addEventListener("mouseenter", () => {
            trigger.style = css;
        });
        trigger.addEventListener("mouseout", () => {
            trigger.style = originalcss;
        })
    }

    function handleContent(content, css){
        content.style = css;
        content.style["max-height"] = '0px';
        content.style.overflow = "hidden";
    }


    // Private listener function that handles the hiding/showing of the content.
    function dropDownListener(content){
        if (content.style["max-height"] == '0px'){
            content.style["max-height"] = content.scrollHeight + "px";
        }
        else{
            content.style["max-height"] = '0px';
        }
    }

    // Private listener functions that handle the "hover" effect. Should not really be used - better to use a :hover selector in CSS.
    function hoverEntryListener(){
        this.style.cursor = "pointer";
        this.style.transform = "translateY(-2px)";
    }

    function hoverExitListener(){
        this.style.cursor = null;
        this.style.transform = "translateY(2px)";
    }

    return {
        generateDropDown,
        generateDropDownCustom,
        generateDropDownDynamic,
    };

};

export {dropDownMaker};