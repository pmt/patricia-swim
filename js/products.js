document.addEventListener('DOMContentLoaded', () => {
    // Function to get query parameters
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let match;
        while ((match = regex.exec(queryString))) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return params;
    }

    // Function to build the image path based on the selected options
    function getImagePath(part, option) {
        return `images/products/${option}-${part}.png`;
    }

    const params = getQueryParams();
    const productTop = document.getElementById('product-top');
    const productBottom = document.getElementById('product-bottom');

    if (params.top) {
        productTop.src = getImagePath('top', params.top);
        productTop.alt = getImagePath('top', params.top);
    }
    if (params.bottom) {
        productBottom.src = getImagePath('bottom', params.bottom);
        productBottom.alt = getImagePath('bottom', params.bottom);
    }
});
