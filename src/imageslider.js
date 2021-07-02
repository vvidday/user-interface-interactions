// Timeout object Factory Function
const Interval = (fn, interval) =>{
    let pointer = null;
    function startInterval(){
        pointer = setInterval(fn, interval);
    }
    function resetInterval(){
        clearInterval(pointer);
        startInterval();
    }
    return {
        startInterval,
        resetInterval,
    };
}

// Image Slider Factory
const imageSliderMaker = (picturearray) =>{
    const original = picturearray;
    const images = picturearray.slice();
    const imageDiv = document.getElementById("image-div");
    const intervalHandler = Interval(moveForward, 5000);
    const buttonDiv = document.getElementById("buttons");

    function init(){
        generateButtons();
        addImage();
        intervalHandler.startInterval();
        initLeftRightButtons();
    }

    // Displays the first image in the array.
    function addImage(){
        if(imageDiv.children.length > 0) imageDiv.removeChild(imageDiv.children[0]);
        const img = document.createElement("img");
        img.src = images[0];
        img.style.opacity = "0.5";
        imageDiv.appendChild(img);
        //Need to set a 1ms delay for CSS transition to work.
        setTimeout(()=>img.style.opacity = "1", 1);

        const index = original.indexOf(images[0]);
        updateButtonVisuals(index);
    }

    function moveForward(){
        images.push(images.splice(0, 1)[0]);
        addImage();
    }

    function moveBackward(){
        images.unshift(images.pop());
        addImage();
    }

    function moveToIndex(index){
        let x = images.splice(0, index);
        for(let i = 0; i < x.length; i++){
            images.push(x[i]);
        }
        addImage();
    }

    function initLeftRightButtons(){
        document.getElementById("move-back-button").addEventListener("click", ()=>{
            moveBackward();
            intervalHandler.resetInterval();
        });
        document.getElementById("move-forward-button").addEventListener("click", ()=>{
            moveForward();
            intervalHandler.resetInterval();
        });
    }


    //Buttons
    function generateButtons(){
        for(let i = 0; i < images.length; i++){
            const button = document.createElement("button");
            button.textContent = "#";
            if(i===0) button.classList.add("image-buttons-active")
            else button.classList.add("image-buttons");

            button.addEventListener("click", function(){
                const index = images.indexOf(original[i]);
                moveToIndex(index);
                intervalHandler.resetInterval();

            })

            buttonDiv.appendChild(button);
        }
    }

    function updateButtonVisuals(active){
        const buttonList = [...buttonDiv.children];
        //Remove current
        const current = document.getElementsByClassName("image-buttons-active")[0];
        current.classList.remove("image-buttons-active");
        current.classList.add("image-buttons");
        // Add new
        buttonList[active].classList.add("image-buttons-active");
        buttonList[active].classList.remove("image-buttons");
    }

    return {
        init,
        moveForward,
    };

}

export {imageSliderMaker};