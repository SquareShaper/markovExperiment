// https://stackoverflow.com/a/24137301
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}


// let markovGen = function(txt) {
//     this.txt = txt.toLowerCase();
//     this.order = 3;
//     this.ngrams = {};

//     this.updateNgrams = function(data) {
//         for (let i = 0; i <= data.length-this.order; i++) {
//             let gram = data.substring(i,i+3);
            
//             if (!this.ngrams[gram]) {
//                 this.ngrams[gram] = [];
//             }
//             if (data[i+3] != undefined) {
//                 this.ngrams[gram].push(data[i+3]);
//             }
//         }
//     }

//     this.addPrompt = function(input) {
//         if (input.length > this.order) {
//             this.updateNgrams(input);
//             this.prompt = input.substring(input.length-this.order, input.length);
//         }
//     }

//     this.getNext = function() {
//         let nextLetter = get_random(this.ngrams[this.prompt]);
//         this.prompt = this.prompt.substring(1,3) + nextLetter;
//         return nextLetter;
//     }

//     this.updateNgrams(this.txt);
// }

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
        return this.ngrams[this.generator].length > 0;
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
        return this.prompt + response.trim();
    }
}

const gen = new MarkovGenerator(3);

gen.setData("The funny dog is a funny cat that is a funny fish. ");

gen.setPrompt("The ");

console.log(gen.getFullConvo(500));