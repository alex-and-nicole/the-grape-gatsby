//Pseudo Code for The Grape Gatsby

// 1 - Create namespace object
    const gatsbyApp = {}
    // - Create variable for form
    gatsbyApp.apiKey = "440d6164874e4c1cadd56c5f2f61dcbd";
    gatsbyApp.url = new URL('https://api.spoonacular.com/food/wine/pairing');
    gatsbyApp.form = document.querySelector('form');
    gatsbyApp.input = document.querySelector('input');
    
// 5 - Define a method which will display data returned from API call
    gatsbyApp.displayData = (pairedWines) => {
        pairedWines.forEach((wine) => {
            console.log(wine);
        });
    }

// 4 - Make call to the API with a parameter that will act as a place holder for the user's form input
    // console.log(url);
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
                //Call the displayData method
                gatsbyApp.displayData(jsonResponse.pairedWines);
            })
    }
    // * IF the API returns data, display the data on the page (i.e call the display function)
    // * ELSE (no data return) run error handling function!!!!!


// 2 - Create init function
    gatsbyApp.init = () => {
        // - Add event listener:
        // * On submit: create variable to store user's form input (i.e. their main dish)
        // * take user's input to make a request to the API (i.e call the API call function and pass in the user's input as the argument)
        gatsbyApp.form.addEventListener('submit', (event) => {
            //Prevent page refresh on submit
            event.preventDefault();
            // console.log('something has been submitted');

            gatsbyApp.userInput = gatsbyApp.input.value;
            // console.log(userInput);

            // Clear form input
            gatsbyApp.input.value = "";

            //Call API request function (pass userInput as argument)
            gatsbyApp.getData(gatsbyApp.userInput);
        });
    }

// 3 - Call init function
gatsbyApp.init();


//5 - Error handling function
    // * if user clicks without actually inputting any data in the form, alert them to do so
    // * if user inputs an invalid string (i.e a main dish that doesn't retrun anything), print to the page that there are no results






