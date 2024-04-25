document.addEventListener('DOMContentLoaded', () => {
    const model = document.getElementById('model');
    const scene = document.getElementById('scene');

    // Function to build the image path based on the selected options
    function getImagePath(size, part, option) {
        return `images/${size}/${part}/${option}.svg`;
    }

    // Function to update the model image for a particular part
    function updateModelImage(part, option) {
        const size = document.querySelector('#size .selected').id.split('-')[1]; // get the selected size
        const imgElement = model.querySelector(`#${part}`);
        imgElement.src = getImagePath(size, part, option);
        imgElement.alt = option;
    }

    // Function to update the background image
    function updateBackgroundImage(bgNumber) {
        scene.style.backgroundImage = `url('images/backgrounds/bg-${bgNumber}.jpg')`;
    }

    // Function to remove and add selected class
    function updateSelectedClass(selectedButton, group) {
        // Remove 'selected' class from all buttons within the same group
        const buttons = document.querySelectorAll(`#${group} button`);
        buttons.forEach(button => button.classList.remove('selected'));
        // Add 'selected' class to the clicked button
        selectedButton.classList.add('selected');
    }

    // Attach event listeners to option buttons
    document.querySelectorAll('#model-options .option button').forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedButton = event.target;
            const [type, option] = selectedButton.id.split('-');
            updateModelImage(type, option);
            updateSelectedClass(selectedButton, type);
        });
    });

    // Attach event listeners to size buttons
    document.querySelectorAll('#size button').forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedButton = event.target;
            updateSelectedClass(selectedButton, 'size');
            // Update all model images based on the new size
            ['hair', 'top', 'bottom', 'body'].forEach(part => {
                const currentOption = model.querySelector(`#${part}`).alt;
                updateModelImage(part, currentOption);
            });
        });
    });

    // Event listeners for background options
    document.querySelectorAll('#background-options button').forEach((button, index) => {
        button.addEventListener('click', () => {
            updateBackgroundImage(index + 1);
            updateSelectedClass(button, 'background-options');
        });
    });

    // Arrays to hold the options for tops and bottoms
    const topOptions = ['blue', 'maroon', 'orange'];
    const bottomOptions = ['blue', 'maroon', 'orange'];

    // Update clothing item based on navigation clicks
    function updateClothingItem(itemType, options, direction) {
        const indexKey = itemType + 'Index';
        const currentIndex = window[indexKey] = (window[indexKey] || 0) + direction;
        // Loop around the array if index goes out of bounds
        window[indexKey] = (currentIndex < 0 ? options.length - 1 : currentIndex) % options.length;
        updateModelImage(itemType, options[window[indexKey]]);
    }

    // Function to get a random element from an array
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Event listeners for clothing navigation
    document.getElementById('tops-next').addEventListener('click', () => updateClothingItem('top', topOptions, 1));
    document.getElementById('tops-prev').addEventListener('click', () => updateClothingItem('top', topOptions, -1));
    document.getElementById('bottoms-next').addEventListener('click', () => updateClothingItem('bottom', bottomOptions, 1));
    document.getElementById('bottoms-prev').addEventListener('click', () => updateClothingItem('bottom', bottomOptions, -1));

    // Set default selections on page load
    document.getElementById('size-medium').click();
    document.getElementById('body-tan').click();
    document.getElementById('hair-ginger').click();
    document.getElementById('tops-next').click(); // Set a random top
    document.getElementById('bottoms-next').click(); // Set a random bottom
    updateBackgroundImage(1); // default background
});
