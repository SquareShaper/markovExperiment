// https://stackoverflow.com/a/24137301
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}

// Class rewrite
class MarkovGenerator {
    ngrams = {};
    prompt = "";
    generator = "";
    nextLetter = "";

    constructor(order) {
        this.order = order;
    }

    setData(data) {
        data = data.toLowerCase();
        for (let i = 0; i <= data.length-this.order; i++) {
            let gram = data.substring(i,i+3);
            
            if (!this.ngrams[gram]) {
                this.ngrams[gram] = [];
            }
            if (data[i+3] != undefined) {
                this.ngrams[gram].push(data[i+3]);
            }
        }
    }

    setPrompt(prompt) {
        this.prompt = prompt;
        this.generator = prompt.substring(prompt.length-3, prompt.length);
    }

    canGetNext() {
        return this.ngrams[this.generator] != undefined && this.ngrams[this.generator].length > 0;
    }

    getNext() {
        let out = get_random(this.ngrams[this.generator]); 
        this.generator = this.generator.substring(1,3) + out; 
        return out;
    }

    generate(number) {
        let output = ""
        for (let i = 0; i < number; i++) {
            if (this.canGetNext()) {
                output += this.getNext();
            } else {
                break;
            }
        }

        return output;
    }

    getFullConvo(number) {
        let response = this.generate(number);
        return this.prompt + response;
    }
}

export { MarkovGenerator };