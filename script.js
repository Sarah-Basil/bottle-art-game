window.onload = function() {
    var playButton = document.getElementById('play-button');
    var titleScreen = document.getElementById('title-screen');
    var bottleSelectionScreen = document.getElementById('bottle-selection-screen');
    var colorSelectionScreen = document.getElementById('color-selection');
    var colorPicker = document.getElementById('color-picker');
    var selectedBottleDiv = document.getElementById('selected-bottle-div'); 
    var bottles = document.getElementsByClassName('bottle');
    var nextButton = document.getElementById('next-button');
    var colorNextButton = document.getElementById('color-next-button');
    var backButtonBottle = document.getElementById('back-button-bottle');
    var backButtonColor = document.getElementById('back-button-color');
    var restartButtonBottle = document.getElementById('restart-button-bottle');
    var restartButtonColor = document.getElementById('restart-button-color');
    var presetColors = document.getElementsByClassName('preset-color');
    var selectedBottle;
    var patternSelectionScreen = document.getElementById('pattern-selection');
    var patternedBottleDiv = document.getElementById('patterned-bottle-div'); 
    var presetPatterns = document.getElementsByClassName('preset-pattern');
    var patternNextButton = document.getElementById('pattern-next-button');
    var backButtonPattern = document.getElementById('back-button-pattern');
    var restartButtonPattern = document.getElementById('restart-button-pattern');
    //
    //var patternedBottleClone = selectedBottleDiv.querySelector('.bottle').cloneNode(true);
    //
    var selectedPattern;

    const bottleElements = Array.from(document.getElementsByClassName('bottle'));

    // Fetch and load SVG for each bottle
    bottleElements.forEach((bottleElement) => {
        const svgContainer = document.createElement('div');
        svgContainer.className = 'svg-container';
        bottleElement.appendChild(svgContainer);
    
        const svgUrl = bottleElement.getAttribute('data-bottle-src');
    
        fetch(svgUrl)
        .then((response) => {
            return response.text();
        })
        .then((svgData) => {
            svgContainer.innerHTML = svgData;
            
            // Access the first layer of SVG if it's named 'Layer_1', you might need to adjust this part based on your actual SVG structure
            var svgLayer = svgContainer.querySelector('#Layer_1');
            if (svgLayer) {
                svgLayer.classList.add('reset');
                setTimeout(() => {
                    svgLayer.classList.remove('reset');
                }, 100); // adjust timing as needed
            }
    
            // Add the click event listener after the SVG is fully loaded
            bottleElement.addEventListener('click', function(e) {
                for (var j = 0; j < bottles.length; j++) {
                    bottles[j].classList.remove('selected');
                    var otherSvgLayer = bottles[j].querySelector('.svg-container #Layer_1');
                    if (otherSvgLayer) {
                        otherSvgLayer.classList.remove('svg-selected');
                    }
                }
                this.classList.add('selected');
                if (svgLayer) {
                    svgLayer.classList.add('svg-selected');
                }
                selectedBottle = this;
            });
        });
    });

    for (var i = 0; i < bottles.length; i++) {
        bottles[i].addEventListener('click', function(e) {
            for (var j = 0; j < bottles.length; j++) {
                bottles[j].classList.remove('selected');
            }
            this.classList.add('selected');
            selectedBottle = this;
        });        
    }

    for (var i = 0; i < presetColors.length; i++) {
        presetColors[i].addEventListener('click', function(e) {
            colorPicker.value = rgbToHex(e.target.style.backgroundColor);
            changeBottleColor(colorPicker.value);
        });
    }

    colorPicker.addEventListener('input', function() {
        changeBottleColor(colorPicker.value);
    });

    playButton.onclick = function() {
        titleScreen.style.display = 'none';
        bottleSelectionScreen.style.display = 'block';
    }

    nextButton.onclick = function() {
        if (!selectedBottle) {
            alert('Please select a bottle first.');
            return;
        }
        bottleSelectionScreen.style.display = 'none';
        colorSelectionScreen.style.display = 'block';
        
        var selectedBottleClone = selectedBottle.cloneNode(true);
        selectedBottleClone.classList.add('selected');
        selectedBottleClone.classList.add('final-selected'); /* Add new class to disable hover effect */
        selectedBottleClone.querySelector('.svg-container').style.transform = 'scale(1)';
        
        // Reset the background color of the selected bottle SVG
        var svgLayer = selectedBottleClone.querySelector('.svg-container #Layer_1');
        if (svgLayer) {
            svgLayer.classList.remove('svg-selected');
            svgLayer.classList.add('reset');
            setTimeout(() => {
                svgLayer.classList.remove('reset');
            }, 100); // adjust timing as needed
        }
    
        selectedBottleDiv.innerHTML = '';
        selectedBottleDiv.appendChild(selectedBottleClone);
    
        for (var i = 0; i < bottles.length; i++) {
            bottles[i].classList.remove('selected');
        }

        if (selectedBottle) {
            selectedBottle.classList.remove('selected');
            var svgLayer = selectedBottle.querySelector('.svg-container #Layer_1');
            if (svgLayer) {
                svgLayer.classList.remove('svg-selected');
            }
        }
    }

    
    
    colorNextButton.onclick = function() {
        if (!selectedBottle) {
            alert('Please select a bottle first.');
            return;
        }
        colorSelectionScreen.style.display = 'none';
        patternSelectionScreen.style.display = 'block';
        
        // Clone the bottle from the color selection screen, not the original one
        var patternedBottleClone = selectedBottleDiv.querySelector('.bottle').cloneNode(true); 
        patternedBottleClone.classList.add('selected');
        patternedBottleClone.querySelector('.svg-container').style.transform = 'scale(1)';
    
        patternedBottleDiv.innerHTML = '';
        patternedBottleDiv.appendChild(patternedBottleClone);
    }
    
    colorNextButton.onclick = function() {
        if (!selectedBottle) {
            alert('Please select a bottle first.');
            return;
        }
        colorSelectionScreen.style.display = 'none';
        patternSelectionScreen.style.display = 'block';

        // Clone the bottle from the color selection screen
        var patternedBottleClone = selectedBottleDiv.querySelector('.bottle').cloneNode(true);
    
        // Debugging: Check if the clone contains the SVG
        console.log("Cloned bottle: ", patternedBottleClone); 

       
        // Clone the bottle from the color selection screen
        var patternedBottleClone = selectedBottleDiv.querySelector('.bottle').cloneNode(true);
        patternedBottleClone.classList.add('selected');
        patternedBottleClone.querySelector('.svg-container').style.transform = 'scale(1)';
        
        // Ensure the color is applied to the cloned bottle
        var bottleSvg = patternedBottleClone.querySelector('svg');
        if (bottleSvg) {
            var color = bottleSvg.style.getPropertyValue("--color");
            bottleSvg.style.setProperty("--color", color);
        }
        
        patternedBottleDiv.innerHTML = '';
        patternedBottleDiv.appendChild(patternedBottleClone);

        // Debugging: Check if the bottle is correctly appended
        console.log("Appended bottle: ", patternedBottleClone);
    }
    

    function changeBottleColor(color) {
        if (selectedBottle) {
            var bottleSvg = selectedBottleDiv.querySelector('svg');
            if (bottleSvg) {
                // This sets the CSS '--color' property of the SVG element
                bottleSvg.style.setProperty("--color", color);
            }
        }
    }


    // Back button on bottle selection screen
    backButtonBottle.onclick = function() {
        bottleSelectionScreen.style.display = 'none';
        titleScreen.style.display = 'block';

        if (selectedBottle) {
            selectedBottle.classList.remove('selected');
            var svgLayer = selectedBottle.querySelector('.svg-container #Layer_1');
            if (svgLayer) {
                svgLayer.classList.remove('svg-selected');
            }
        }
    }

    // Back button on color selection screen
    backButtonColor.onclick = function() {
        colorSelectionScreen.style.display = 'none';
        bottleSelectionScreen.style.display = 'block';

        if (selectedBottle) {
            selectedBottle.classList.remove('selected');
            var svgLayer = selectedBottle.querySelector('.svg-container #Layer_1');
            if (svgLayer) {
                svgLayer.classList.remove('svg-selected');
            }
        }
    }

    // Back button on pattern selection screen
    backButtonPattern.onclick = function() {
        patternSelectionScreen.style.display = 'none';
        colorSelectionScreen.style.display = 'block';

        if (selectedBottle) {
            selectedBottle.classList.remove('selected');
            var svgLayer = selectedBottle.querySelector('.svg-container #Layer_1');
            if (svgLayer) {
                svgLayer.classList.remove('svg-selected');
            }
        }
    }

    // Restart button on color selection screen
    restartButtonColor.onclick = function() {
        colorSelectionScreen.style.display = 'none';
        titleScreen.style.display = 'block';

        if (selectedBottle) {
            selectedBottle.classList.remove('selected');
            var svgLayer = selectedBottle.querySelector('.svg-container #Layer_1');
            if (svgLayer) {
                svgLayer.classList.remove('svg-selected');
            }
        }
        selectedBottle = null;
    }

    // Restart button on bottle selection screen
    restartButtonBottle.onclick = function() {
        bottleSelectionScreen.style.display = 'none';
        titleScreen.style.display = 'block';

        if (selectedBottle) {
            selectedBottle.classList.remove('selected');
            var svgLayer = selectedBottle.querySelector('.svg-container #Layer_1');
            if (svgLayer) {
                svgLayer.classList.remove('svg-selected');
            }
        }
        selectedBottle = null;
    }

    // Restart button on pattern selection screen
    restartButtonPattern.onclick = function() {
        patternSelectionScreen.style.display = 'none';
        titleScreen.style.display = 'block';

        if (selectedBottle) {
            selectedBottle.classList.remove('selected');
            var svgLayer = selectedBottle.querySelector('.svg-container #Layer_1');
            if (svgLayer) {
                svgLayer.classList.remove('svg-selected');
            }
        }
        selectedBottle = null;
    }

    for (var i = 0; i < presetPatterns.length; i++) {
        presetPatterns[i].addEventListener('click', function(e) {
            selectedPattern = e.target.getAttribute('data-pattern-src');
            applyPatternToBottle(selectedPattern);
        });
    }

    patternNextButton.onclick = function() {
        // Handle what happens after the pattern is selected
        console.log(selectedPattern);
    }
    
    function applyPatternToBottle(patternSrc) {
        if (selectedBottle) {
            var bottleSvg = patternedBottleDiv.querySelector('svg');
            if (bottleSvg) {
                // Remove any existing patterns
                var existingPattern = bottleSvg.querySelector('pattern');
                if (existingPattern) {
                    existingPattern.remove();
                }

                var pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
                pattern.setAttribute('id', 'pattern');
                pattern.setAttribute('patternUnits', 'userSpaceOnUse');
                pattern.setAttribute('width', '100');
                pattern.setAttribute('height', '100');
                
                var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', patternSrc);
                image.setAttribute('width', '100');
                image.setAttribute('height', '100');
                
                pattern.appendChild(image);
                bottleSvg.appendChild(pattern);
                
                var shape = bottleSvg.querySelector('.bg'); // this assumes the shape you want to fill is the first child of the svg
                shape.style.fill = 'url(#pattern)';
            }
        }
    }
    
}

function rgbToHex(rgb) {
    var a = rgb.split("(")[1].split(")")[0];
    a = a.split(",");
    var b = a.map(function(x) {
        x = parseInt(x).toString(16);
        return (x.length==1) ? "0"+x : x;
    })
    return "#" + b.join("");
}
