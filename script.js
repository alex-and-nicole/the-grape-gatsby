//Pseudo Code for The Grape Gatsby

//App name space object variable: 
const gatsbyApp = {}
gatsbyApp.apiKey = '440d6164874e4c1cadd56c5f2f61dcbd';
gatsbyApp.url = new URL('https://api.spoonacular.com/food/wine/pairing');
// Stored HTML elements variables
gatsbyApp.form = document.querySelector('form');
gatsbyApp.input = document.querySelector('input');
gatsbyApp.wineResults = document.querySelector('.wine');
gatsbyApp.resultsContainer = document.querySelector('.results-container');
gatsbyApp.resultsHeading = document.querySelector('.results-heading');
gatsbyApp.pairingDescription = document.querySelector('.results-text');
gatsbyApp.errorMessage = document.querySelector('.error');


// A function that displays the data returned from API call
gatsbyApp.displayData = (pairedWines, pairingText) => {
    if (pairedWines === undefined || (pairingText === "" && pairedWines.length === 0)) {
        gatsbyApp.errorMessage.textContent = "I'm sorry, Old Sport. Not quite sure what that is.";
    } else if (pairedWines.length === 0 && pairingText !== "") {
        gatsbyApp.pairingDescription.innerHTML = `
            <h3>"I don't have a specific wine for that but here is the flavour profile--"</h3>
            <p>${pairingText}</p>`;
    } else {
        // Iterates through wine pairing array
        pairedWines.forEach((wine) => {
            //Create element that will hold result heading
            gatsbyApp.resultsHeading.textContent = 'Suggested wine pairings:';
    
            //<li> that will hold each wine suggestion
            gatsbyApp.pairingOption = document.createElement('li');
            
            //HTML that will be contained within <li> (pairingOption)
            gatsbyApp.pairingOption.innerHTML = `
                    <i class="fas fa-wine-glass-alt"></i>
                    <p>${wine}</p>
                `;
            //Appends newly created <li>s to the <ul> AKA wineResults
            gatsbyApp.wineResults.append(gatsbyApp.pairingOption);

            //HTML that is generated within div.results-text
            gatsbyApp.pairingDescription.innerHTML = `
                <h3>Wine Pairing Flavour Profile:</h3>
                <p>${pairingText}</p>`;
        });
    }
}

// * IF the API returns data, display the data on the page (i.e call the display function)
// * ELSE (no data return) run error handling function!!!!!



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


//5 - Error handling function
    // * if user clicks without actually inputting any data in the form, alert them to do so
    // * if user inputs an invalid string (i.e a main dish that doesn't retrun anything), print to the page that there are no results






