document.addEventListener('DOMContentLoaded', () => {
    const model = document.getElementById('model');

    // Function to build the image path based on the selected options
    function getImagePath(size, part, option) {
        return `images/${size}/${part}/${option}.svg`;
    }

    // Function to update all model images based on size
    function updateAllModelImagesForSize(size) {
        model.querySelectorAll('img').forEach(img => {
            const part = img.id;
            const option = img.alt;
            img.src = getImagePath(size, part, option);
        });
    }

    // Function to update the model image for other options
    function updateModelImage(part, option) {
        const imgElement = model.querySelector(`#${part}`);
        const selectedSizeButton = document.querySelector('#size .selected');
        const size = selectedSizeButton ? selectedSizeButton.id.split('-')[1] : 'medium'; // default to 'medium' if no size selected
        imgElement.src = getImagePath(size, part, option);
        imgElement.alt = `${option}`;
    }

    // Function to remove and add selected class
    function updateSelectedClass(selectedButton) {
        const optionButtons = selectedButton.parentNode.querySelectorAll('button');
        optionButtons.forEach(button => {
            button.classList.remove('selected');
        });
        selectedButton.classList.add('selected');
    }

    // Attach event listeners to non-size option buttons
    document.querySelectorAll('#model-options .option button:not(#size button)').forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedButton = event.target;
            const optionId = selectedButton.id;
            const [type, option] = optionId.split('-'); // splits 'hair-blonde' to ['hair', 'blonde']

            updateModelImage(type, option);
            updateSelectedClass(selectedButton);
        });
    });

    // Attach event listener to size option buttons
    document.querySelectorAll('#size button').forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedButton = event.target;
            const size = selectedButton.id.split('-')[1];

            updateAllModelImagesForSize(size);
            updateSelectedClass(selectedButton);
        });
    });

    // Optional: If you want to automatically select the first option of each type on page load
    document.querySelectorAll('#model-options .option').forEach(optionGroup => {
        const firstButton = optionGroup.querySelector('button');
        if (firstButton) {
            firstButton.click();
        }
    });
});
