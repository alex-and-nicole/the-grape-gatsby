//Pseudo Code for The Grape Gatsby

// 1 - Create namespace object

// 2 - Create init function
    // - Create variable for form
    // - Add event listener:
        // * On submit: create variable to store user's form input (i.e. their main dish)
        // * take user's input to make a request to the API (i.e call the API call function and pass in the user's input as the argument)

// 3 - Call init function
// 4 - Make call to the API with a parameter that will act as a place holder for the user's form input
    // * IF the API returns data, display the data on the page (i.e call the display function)
    // * ELSE (no data return) run error handling function!!!!!

//5 - Error handling function
    // * if user clicks without actually inputting any data in the form, alert them to do so
    // * if user inputs an invalid string (i.e a main dish that doesn't retrun anything), print to the page that there are no results

const apiKey = "440d6164874e4c1cadd56c5f2f61dcbd";

const url = new URL('https://api.spoonacular.com/food/wine/pairing');
//https://api.spoonacular.com/food/wine/recommendation
console.log(url);

url.search = new URLSearchParams({
    food: "fish",
    apiKey: apiKey
})

fetch(url)
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((jsonResponse) => {
        console.log(jsonResponse);
    })
