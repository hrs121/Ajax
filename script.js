document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.getElementById("searchInput");
    var suggestionsContainer = document.getElementById("suggestions");

    searchInput.addEventListener("input", function () {
        var inputValue = searchInput.value.trim();

        if (inputValue.length >= 3) {
            // Call a function to fetch suggestions from the server
            fetchSuggestions(inputValue);
        } else {
            // Clear suggestions if input length is not sufficient
            suggestionsContainer.innerHTML = "";
        }
    });

    // Close suggestions when clicking outside the input and suggestions container
    document.addEventListener("click", function (event) {
        if (!event.target.closest("#searchInput") && !event.target.closest("#suggestions")) {
            suggestionsContainer.innerHTML = "";
        }
    });
});

function fetchSuggestions(query) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var suggestions = JSON.parse(xhr.responseText);
            displaySuggestions(suggestions);
        }
    };

    // Replace 'getSuggestions.php' with the actual server-side script
    xhr.open("GET", "getsuggestion.php?query=" + encodeURIComponent(query), true);
    xhr.send();
}

function displaySuggestions(suggestions) {
    var suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";

    suggestions.forEach(function (suggestion) {
        var suggestionElement = document.createElement("div");
        suggestionElement.textContent = suggestion;
        suggestionsContainer.appendChild(suggestionElement);

        suggestionElement.addEventListener("click", function () {
            // Set the selected suggestion as the input value
            document.getElementById("searchInput").value = suggestion;
            suggestionsContainer.innerHTML = ""; // Clear suggestions
        });
    });

    // Position suggestions below the input field
    var inputRect = document.getElementById("searchInput").getBoundingClientRect();
    suggestionsContainer.style.top = inputRect.bottom + "px";
}
