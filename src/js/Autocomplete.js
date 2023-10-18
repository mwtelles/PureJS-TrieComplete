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
    const searchContainer = document.getElementById("search-container"); 
    suggestionsPanel.innerHTML = "";
    if (suggestions.length > 0) {
        suggestionsPanel.classList.add("visible");
        searchContainer.classList.add("no-radius");
    } else {
        suggestionsPanel.classList.remove("visible");
        searchContainer.classList.remove("no-radius");
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

  function loadWords(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const content = e.target.result;
        try {
          const words = JSON.parse(content);
          words.forEach((word) => {
            trie.insert(word);
          });
          alert("Palavras carregadas com sucesso!");
        } catch (error) {
          alert("Falha ao analisar o arquivo JSON.");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Nenhum arquivo selecionado.");
    }
  }

  document
    .getElementById("load-words-button")
    .addEventListener("click", function () {
      document.getElementById("wordlist-input").click();
    });

  document
    .getElementById("wordlist-input")
    .addEventListener("change", loadWords);
});
