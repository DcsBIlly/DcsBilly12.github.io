// Get the close button element
const closeDeCostButton = document.getElementById("closeDeCost");

// Get the DeCost element
const DeCostElement = document.querySelector(".DeCost");

// Add a click event listener to the close button
closeDeCostButton.addEventListener("click", function () {
    // Hide the DeCost element
    DeCostElement.style.display = "none";
});