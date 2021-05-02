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
