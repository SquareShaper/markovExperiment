// https://stackoverflow.com/a/24137301
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}

// word based rewrite
class MarkovGenerator {
    wordTransitions = {};
    prompt = [];
    generator = [];
    nextWord = "";
    delimiters = [".", ",", "!", "?"];
    
    constructor(order) {
        this.order = order;
    }

    textToList(text) {
        text = text.toLowerCase();
        
        // split by spaces and delete empty strings
        text = text.split(" ").filter(str => str.trim() !== "");

        // every word that contains a delimiter (ex "fly.") gets split (ex "fly", ".") to tokenize properly. 
        for (let i = 0; i < text.length; i++) {
            let word = text[i];

            for (let delimiter of this.delimiters) {
                if (word.includes(delimiter)) {
                    let words = word.split(delimiter);
                    words = words.map(elem => {if(elem == "") {return delimiter} else {return elem}});
                    text.splice(i+1, 0, words[1]);
                    text[i] = words[0];
                    i++;
                }
            }
        }

        return text;
    }
    
    setData(data) {
        this.rawInputWords = this.textToList(data);

        for (let i = 0; i <= this.rawInputWords.length - this.order; i++) {
            let gram = this.rawInputWords.slice(i, i+this.order);

            if (!this.wordTransitions[gram]) {
                this.wordTransitions[gram] = [];
            }
            let nextWordAfterGram = this.rawInputWords[i+this.order];
            if (nextWordAfterGram != undefined) {
                this.wordTransitions[gram].push(nextWordAfterGram);
            }
        }
    }

    setPrompt(prompt) {
        this.prompt = this.textToList(prompt);
        this.generator = this.prompt.slice(-this.order);
    }

    canGetNext() {
        return this.wordTransitions[this.generator] != undefined && this.wordTransitions[this.generator].length > 0;
    }

    getNext() {
        let out = get_random(this.wordTransitions[this.generator]);
        this.generator.push(out);
        this.generator = this.generator.slice(-this.order);
        return out;
    }

    generate(number) {
        let output = "";
        for (let i = 0; i < number; i++) {
            if (this.canGetNext()) {
                let next = this.getNext();
                let isDelimiter = false;
                for (let delimiter of this.delimiters) {
                    if (next === delimiter) {
                        isDelimiter = true;
                    }
                }
                if (!isDelimiter) {
                    next = " " + next;
                }
                output += next;
            } else {
                break;
            }
        }

        return output;
    }

    getFullConvo(number) {
        let response = this.generate(number);
        return this.prompt.join(" ") + response;
    }

    // don't work yet
    // Should generate at least 'start' words, then stop when it hits a 
    // 'delimiter' or has generated 'end' words
    generateUntilSentenceStopBetween(start, end, delimiter) {
        
    }
}

export { MarkovGenerator };
