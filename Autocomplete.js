document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("search-input");
  const suggestionsPanel = document.getElementById("suggestions");

  function debounce(func, timeout) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function updateSuggestions(suggestions) {
    suggestionsPanel.innerHTML = "";
    if (suggestions.length > 0) {
      suggestionsPanel.classList.add("visible");
    } else {
      suggestionsPanel.classList.remove("visible");
    }
    suggestions.forEach((suggestion) => {
      const suggestionElement = document.createElement("li");
      suggestionElement.textContent = suggestion;

      suggestionElement.addEventListener("click", function () {
        inputField.value = suggestion;
        trie.insert(suggestion, 1);
        updateSuggestions([]);
      });

      suggestionsPanel.appendChild(suggestionElement);
    });
  }

  const onInput = debounce(function () {
    const value = inputField.value;
    if (value) {
      const foundSuggestions = trie.findSuggestions(value);
      updateSuggestions(foundSuggestions);
    } else {
      updateSuggestions([]);
    }
  }, 300);

  inputField.addEventListener("input", onInput);
});
