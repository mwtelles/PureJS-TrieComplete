class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.word = null;
        this.score = 0;
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word, timesSearched = 1) { 
        let lowerCaseWord = word.toLowerCase();
        let node = this.root;
        for (let char of lowerCaseWord) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.word = lowerCaseWord; 
        node.score += timesSearched;
    }
    

    _searchForAutocomplete(node, word, suggestions) {
        if (node.isEndOfWord) {
            suggestions.push({ word: word, score: node.score });
        }
        for (let char in node.children) {
            this._searchForAutocomplete(node.children[char], word + char, suggestions);
        }
    }

    findSuggestions(prefix) {
        let lowerCasePrefix = prefix.toLowerCase();
        let node = this.root;
        let suggestions = [];
    
        for (let char of lowerCasePrefix) {
            if (!node.children[char]) {
                return suggestions;
            }
            node = node.children[char];
        }
    
        this._searchForAutocomplete(node, lowerCasePrefix, suggestions);
        return suggestions.sort((a, b) => b.score - a.score).map(suggestion => suggestion.word);
    }
    
}


let trie = new Trie();
trie.insert("exemplo");
trie.insert("exceção");
trie.insert("execução");
