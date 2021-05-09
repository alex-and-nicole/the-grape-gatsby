// App name space object variable 
const gatsbyApp = {}
gatsbyApp.apiKey = '1c9c06b783734e7c83e8eb8afb05185f';

gatsbyApp.url = new URL('https://api.spoonacular.com/food/wine/pairing');
gatsbyApp.urlTwo = new URL('https://api.spoonacular.com/food/wine/recommendation');

// Method that contains cached HTML element variables
gatsbyApp.gatherElements = () => {
    gatsbyApp.form = document.querySelector('form');
    gatsbyApp.input = document.querySelector('input');
    gatsbyApp.wineResults = document.querySelector('.wine');
    gatsbyApp.resultsContainer = document.querySelector('.results-container');
    gatsbyApp.resultsHeading = document.querySelector('.results-heading');
    gatsbyApp.pairingDescription = document.querySelector('.results-text');
    gatsbyApp.errorMessage = document.querySelector('.error');
    gatsbyApp.modal = document.querySelector('.modal');
    gatsbyApp.modalContent = document.querySelector('.modal-content');
    gatsbyApp.modalResults = document.querySelector('.product-list');
}

// Method that will hide the modal
gatsbyApp.hideModal = () => {
    // When user clicks on any part of the modal
    window.addEventListener('click', (event) => {
        if (event.target === gatsbyApp.modal) {
            gatsbyApp.modal.classList.add('hide');
        }
    });
    // When user presses esc key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            gatsbyApp.modal.classList.add('hide');
        }
    });
    
    // Store modal-exit button in a variable
    const modalExit = document.querySelector('.modal-exit');
    // Hide modal when 'x' icon is clicked
    modalExit.addEventListener('click', () => {
        gatsbyApp.modal.classList.add('hide');
    })
}

// Method that will display the recommended wine products from second API call in modal box
gatsbyApp.displayInModal = (recommendedProducts) => {
    if (recommendedProducts.length === 0) {
        const nothingMessage = document.createElement('li');
        nothingMessage.classList.add('nothing-message');
        nothingMessage.textContent = `"Sorry, I couldn't find any matches for this wine."`;
        gatsbyApp.modalResults.appendChild(nothingMessage);
    } else {
        recommendedProducts.forEach((product) => {
            const modalList = document.createElement('li');
            modalList.innerHTML = `
            <a href="${product.link}">${product.title}</a>, ${product.price}
            `;
            gatsbyApp.modalResults.append(modalList);
        })
    }
}

// Make second call to API to gather data on recommended wines
gatsbyApp.getMoreData = (wineClicked) => {
    gatsbyApp.urlTwo.search = new URLSearchParams({
        apiKey: gatsbyApp.apiKey,
        wine: wineClicked,
        number: 5,
    })

    fetch(gatsbyApp.urlTwo)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            //Call display method
            gatsbyApp.displayInModal(jsonResponse.recommendedWines);
        })
}

// Method that adds event listeners to the wine buttons 
gatsbyApp.activateButtons = () => {
    const wineButton = document.querySelectorAll('.text-box');
    for (let i of wineButton) {
        // Add event listener to the new buttons from results
        i.addEventListener('click', (event) => {
            const wineType = event.target.innerText;
            // Call method which make request to API's second endpoint, pass in event.target.innerText as argument
            gatsbyApp.getMoreData(wineType);

            //clear the old results
            gatsbyApp.modalResults.replaceChildren();

            //show modal when a button is clicked
            gatsbyApp.modal.classList.remove('hide');
        })
    }
}

// A method that displays the data returned from API call
gatsbyApp.displayData = (pairedWines, pairingText) => {
    gatsbyApp.resultsContainer.classList.remove('hide');
    // Error handling
    // * if user inputs an invalid string (i.e a main dish that doesn't return any data), print to the page that there are no results
    if (pairedWines === undefined || (pairingText === "" && pairedWines.length === 0)) {
        gatsbyApp.errorMessage.textContent = "I'm sorry, Old Sport. I don't think wine will go well with that.";
    // * if the API returns only a pairing description, and no wines, append only that description
    } else if (pairedWines.length === 0 && pairingText !== "") {
        gatsbyApp.pairingDescription.innerHTML = `
            <h3>"I don't have a specific wine for that, but here is its flavour profile--"</h3>
            <p>${pairingText}</p>
        `;
    // * if the API returns data, display the data on the page
    } else {
        // Iterates through wine pairing array
        pairedWines.forEach((wine) => {
            // Create element that will hold result heading
            gatsbyApp.resultsHeading.textContent = 'Suggested wine pairings:';
    
            // <li> that will hold each wine suggestion
            gatsbyApp.pairingOption = document.createElement('li');
            
            // HTML that will be contained within <li> (pairingOption)
            gatsbyApp.pairingOption.innerHTML = `
                    <img src="./assets/wine-icon.png" alt="">
                    <button class="text-box">
                        <p>${wine}</p>
                    </button>
                `;
            // Appends newly created <li> elements to the <ul> AKA wineResults
            gatsbyApp.wineResults.append(gatsbyApp.pairingOption);

            // HTML that is generated within div.results-text
            gatsbyApp.pairingDescription.innerHTML = `
                <h3>Wine Pairing Flavour Profile:</h3>
                <p>${pairingText}</p>
            `;
        });

        // Call to activateButtons method so that the buttons do something when clicked
        gatsbyApp.activateButtons();
    }
}


// A method that makes the initial API call to the browser
gatsbyApp.getData = (userInput) => {
    gatsbyApp.url.search = new URLSearchParams({
        food: userInput,
        apiKey: gatsbyApp.apiKey
    })

    fetch(gatsbyApp.url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            gatsbyApp.displayData(jsonResponse.pairedWines, jsonResponse.pairingText);
        })
}


// Initialization method
gatsbyApp.init = () => {
    // Call the gatherElements method to have all HTML elements ready before running rest of app
    gatsbyApp.gatherElements();

    // Event listener
    // * On submit: create variable to store user's form input (i.e. their main dish)
    // * take user's input to make a request to the API (i.e call the API call function and pass in the user's input as the argument)
    gatsbyApp.form.addEventListener('submit', (event) => {
        // Prevent page refresh on submit
        event.preventDefault();
        
        // Stores user input in a variable
        gatsbyApp.userInput = gatsbyApp.input.value.trim();

        // Clear form input
        gatsbyApp.input.value = '';

        // Calls API request function (pass userInput as argument)
        gatsbyApp.getData(gatsbyApp.userInput);
        
        // Clear previous search results
        const clearPairOption = gatsbyApp.wineResults;
        clearPairOption.replaceChildren();
        gatsbyApp.pairingDescription.innerHTML = '';

        // Remove error message on submit
        gatsbyApp.errorMessage.textContent = '';
        
        // Remove "Suggested wine pairings" heading
        gatsbyApp.resultsHeading.textContent = '';
            
    });

    // Call method that hides the modal when it is clicked or when esc key is pressed
    gatsbyApp.hideModal();

}


// Initialize the app
gatsbyApp.init();