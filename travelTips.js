// JavaScript source code
const regexMap = [
    { keyword: "beaches", regexStr: /^beach/ },
    { keyword: "countries", regexStr: /^countr/ },
    { keyword: "temples", regexStr: /^temple/ }
];

function getRecommendation() {
    //local variables
    const inputBox = document.getElementById("searchBar");

    //sanitise the input and match to keyword
    const inputStr = inputBox.value.trim().toLowerCase();
    const match = regexMap.find(element => element.regexStr.test(inputStr));

    //clear any existing results
    clearResults();

    //if we have a match, access the api and show the results
    if (match) {
        fetch("./travel_tips_api.json")
            .then(response => response.json())
            .then(data => {
                showRecommendations(match.keyword, data[match.keyword]);
            })
            .catch(error => {
                console.error("Error: ", error);
                let output = document.getElementById("resultsContainer");
                let errorOutput = document.createElement("p");
                errorOutput.className = "errorOutput";
                errorOutput.textContent = "Oops - something went wrong accessing the API";
                output.appendChild(errorOutput);
            });
    } else {
        let output = document.getElementById("resultsContainer");
        let errorOutput = document.createElement("p");
        errorOutput.className = "errorOutput";
        errorOutput.textContent = "Please enter a valid search";
        output.appendChild(errorOutput);
    }
}

function showRecommendations(keyword, results) {
    const resultsContainer = document.getElementById("resultsContainer");
    if (keyword == "countries") {
        for (let i = 0; i < results.length; i++) {
            addDoubleCard(resultsContainer, results[i]);
        }
    } else {
        for (let i = 0; i < results.length; i++) {
            addRecCard(resultsContainer, results[i]);
        }
    }
}

function addRecCard(element, details) {
    let recCard = document.createElement("div");
    recCard.className = "recCard";
    recCard.innerHTML = `<img src="${details.imageUrl}" /><h1>${details.name}</h1><p>${details.description}</p>`;
    element.appendChild(recCard);
}

function addDoubleCard(element, details) {
    let doubleCard = document.createElement("div");
    doubleCard.className = "doubleCard";

    let countryName = document.createElement("h1");
    countryName.className = "country";
    countryName.textContent = details.name;

    doubleCard.appendChild(countryName);

    for (let i = 0; i < 2; i++) {
        let card = document.createElement("div");
        card.innerHTML = `<img src="${details.cities[i].imageUrl}" /><h1>${details.cities[i].name}</h1><p>${details.cities[i].description}</p>`;
        doubleCard.appendChild(card);
    }

    element.appendChild(doubleCard);
}

function clearResults() {
    document.getElementById("searchBar").value = "";
    document.getElementById("resultsContainer").innerHTML = "";
}