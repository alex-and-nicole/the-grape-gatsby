//Pseudo Code for The Grape Gatsby

//App name space object variable: 
const gatsbyApp = {}
gatsbyApp.apiKey = "440d6164874e4c1cadd56c5f2f61dcbd";
gatsbyApp.url = new URL('https://api.spoonacular.com/food/wine/pairing');
// Stored HTML elements variables
gatsbyApp.form = document.querySelector('form');
gatsbyApp.input = document.querySelector('input');
gatsbyApp.wineResults = document.querySelector('.wine');


// A function that displays the data returned from API call
gatsbyApp.displayData = (pairedWines, pairingText) => {
    // Iterates through wine pairing array
    pairedWines.forEach((wine) => {
        //<li> that will hold each wine suggestion
        const pairingOption = document.createElement('li');
        //HTML that will be contained within <li> (pairingOption)
        pairingOption.innerHTML = `
                <i class="fas fa-wine-glass-alt"></i>
                <p>${wine}</p>
            `;
        //Appends newly created <li>s to the <ul> AKA wineResults
        gatsbyApp.wineResults.append(pairingOption);

        //Stores div.results-text in a variable:
        const pairingDescription = document.querySelector('.results-text');
        //HTML that is generated within div.results-text
        pairingDescription.innerHTML = `
            <h3>Wine Pairing Flavour Profile:</h3>
            <p>${pairingText}</p>`;
    });
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
            //Calls the displayData method
            gatsbyApp.displayData(jsonResponse.pairedWines, jsonResponse.pairingText);
        })
}
// * IF the API returns data, display the data on the page (i.e call the display function)
// * ELSE (no data return) run error handling function!!!!!


//Defines the initialization function
gatsbyApp.init = () => {
    // Event listener
    // * On submit: create variable to store user's form input (i.e. their main dish)
    // * take user's input to make a request to the API (i.e call the API call function and pass in the user's input as the argument)
    gatsbyApp.form.addEventListener('submit', (event) => {
        //Prevent page refresh on submit
        event.preventDefault();

        //Clear previous search results

        //Stores user input in a variable
        gatsbyApp.userInput = gatsbyApp.input.value;

        // Clear form input
        gatsbyApp.input.value = "";

        //Calls API request function (pass userInput as argument)
        gatsbyApp.getData(gatsbyApp.userInput);
    });
}

// 3 - Call init function
gatsbyApp.init();


//5 - Error handling function
    // * if user clicks without actually inputting any data in the form, alert them to do so
    // * if user inputs an invalid string (i.e a main dish that doesn't retrun anything), print to the page that there are no results






