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

            let delimiters = [".", ",", "!", "?"];
            for (let delimiter of delimiters) {
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
        this.generator = this.prompt.slice(-3);
    }

    canGetNext() {
        return this.wordTransitions[this.generator] != undefined && this.wordTransitions[this.generator].length > 0;
    }

    getNext() {
        let out = get_random(this.wordTransitions[this.generator]);
        this.generator = this.generator.slice( -(this.order - 1));
        this.generator.push(out);
        return out;
    }
}

let gen = new MarkovGenerator(1);

let text = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. "

gen.setData(text);

console.log(gen.rawInputWords);

console.log(gen.wordTransitions);

gen.setPrompt("According to all known laws");

console.log(gen.prompt);

console.log(gen.generator);

console.log(gen.canGetNext());

console.log(gen.wordTransitions[gen.generator]);