//Pseudo Code for The Grape Gatsby

//App name space object variable: 
const gatsbyApp = {}
gatsbyApp.apiKey = '1c9c06b783734e7c83e8eb8afb05185f';
// gatsbyApp.apiKey = '440d6164874e4c1cadd56c5f2f61dcbd';
gatsbyApp.url = new URL('https://api.spoonacular.com/food/wine/pairing');
gatsbyApp.urlTwo = new URL('https://api.spoonacular.com/food/wine/recommendation');

// Store HTML elements in variables within a function
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

// Hide modal when user clicks on any part of the modal
window.addEventListener('click', (event) => {
  if (event.target === gatsbyApp.modal) {
    gatsbyApp.modal.classList.add('hide');
  }
})
// Hide modal when user presses esc key
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    gatsbyApp.modal.classList.add('hide');
  }
})

// Method that will display the recommended wine products from second API call in modal box
gatsbyApp.displayInModal = (recommendedProducts) => {
    if (recommendedProducts.length === 0) {
        gatsbyApp.nothingMessage = document.createElement('p');
        gatsbyApp.nothingMessage.textContent = `"Sorry, I couldn't find any matches for this wine."`;
        // !! Below is not semantically correct b/c <p> is nested in a <ul> when nothingMessage (p) is appended to modalResults (ul)
        gatsbyApp.modalResults.appendChild(gatsbyApp.nothingMessage);
    } else {
        recommendedProducts.forEach((product) => {
            console.log(product.title); 
            gatsbyApp.modalList = document.createElement('li');
            gatsbyApp.modalList.innerHTML = `
            <a href="${product.link}">${product.title}</a>, ${product.price}
            `;
            gatsbyApp.modalResults.append(gatsbyApp.modalList);
        })
    }
}

// Make second call to API to gather data on recommended wines (!! Can I make both API calls in one? There is a noticeable lag right now when second call is made)
gatsbyApp.getMoreData = (wineClicked) => {
    gatsbyApp.urlTwo.search = new URLSearchParams({
        apiKey: gatsbyApp.apiKey,
        wine: wineClicked,
        number: 5,
    })

    fetch(gatsbyApp.urlTwo)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse);

            //Call display function
            gatsbyApp.displayInModal(jsonResponse.recommendedWines);
        })
}

// Method that adds event listeners to the wine buttons 
gatsbyApp.activateButtons = () => {
    gatsbyApp.wineButton = document.querySelectorAll('.text-box');
    // console.log(gatsbyApp.wineButton[0]);
    for (let i of gatsbyApp.wineButton) {
        // Add event listener to the new buttons from results
        i.addEventListener('click', (event) => {
            gatsbyApp.wineType = event.target.innerText;
            // console.log(gatsbyApp.wineType);
            //Call method which make request to API's second endpoint, pass in event.target.innerText as argument
            gatsbyApp.getMoreData(gatsbyApp.wineType);

            //clear the old results
            gatsbyApp.modalResults.textContent = '';

            //show modal when a button is clicked
            gatsbyApp.modal.classList.remove('hide');
        })
    }
}

// A method that displays the data returned from API call
gatsbyApp.displayData = (pairedWines, pairingText) => {
    gatsbyApp.resultsContainer.classList.remove('hide');
    //5 - Error handling
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
            //Create element that will hold result heading
            gatsbyApp.resultsHeading.textContent = 'Suggested wine pairings:';
    
            //<li> that will hold each wine suggestion
            gatsbyApp.pairingOption = document.createElement('li');
            
            //HTML that will be contained within <li> (pairingOption)
            gatsbyApp.pairingOption.innerHTML = `
                    <img src="./assets/wine-icon.png" alt="">
                    <button class="text-box">
                        <p>${wine}</p>
                    </button>
                `;
            //Appends newly created <li>s to the <ul> AKA wineResults
            gatsbyApp.wineResults.append(gatsbyApp.pairingOption);

            //HTML that is generated within div.results-text
            gatsbyApp.pairingDescription.innerHTML = `
                <h3>Wine Pairing Flavour Profile:</h3>
                <p>${pairingText}</p>
            `;
        });

        // Call the activateButtons method so that the buttons do something when clicked
        gatsbyApp.activateButtons();
    }
}


// A function that makes the initial API call to the browser
gatsbyApp.getData = (userInput) => {
    gatsbyApp.url.search = new URLSearchParams({
        food: userInput,
        apiKey: gatsbyApp.apiKey
    })

    fetch(gatsbyApp.url)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse);
            gatsbyApp.displayData(jsonResponse.pairedWines, jsonResponse.pairingText);
        })
}


//Defines the initialization function
gatsbyApp.init = () => {
    // Call the gatherElements function to have all HTML elements ready before running rest of app
    gatsbyApp.gatherElements();

    // Event listener
    // * On submit: create variable to store user's form input (i.e. their main dish)
    // * take user's input to make a request to the API (i.e call the API call function and pass in the user's input as the argument)
    gatsbyApp.form.addEventListener('submit', (event) => {
        //Prevent page refresh on submit
        event.preventDefault();
        
        //Stores user input in a variable
        gatsbyApp.userInput = gatsbyApp.input.value.trim();

        // Clear form input
        gatsbyApp.input.value = '';

        //Calls API request function (pass userInput as argument)
        gatsbyApp.getData(gatsbyApp.userInput);
        
        //Clear previous search results
        const clearPairOption = gatsbyApp.wineResults;
        clearPairOption.innerHTML = '';
        gatsbyApp.pairingDescription.innerHTML = '';

        //Remove error message on submit
        gatsbyApp.errorMessage.textContent = '';
        
        //Removes "Suggested wine pairings" heading
        gatsbyApp.resultsHeading.textContent = '';
            
    });
}


// 3 - Call init function
gatsbyApp.init();