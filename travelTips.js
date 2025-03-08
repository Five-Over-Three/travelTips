// JavaScript source code

var results;
function getRecommendation() {
    fetch("./travel_tips_api.json")
        .then(response => response.json())
        .then(data => results = data)
        .catch(error => {
            console.error("Error: ", error);
        });
}