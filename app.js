// https://www.geeksforgeeks.org/javascript/javascript-program-to-capitalize-the-first-letter-of-every-sentence-in-a-string/
function capitalize(text) {
    const sentences = text.split(/\.|\?|!/);

    const capitalizedSentences = sentences.filter(sentence => sentence.trim() !== "");

    return capitalizedSentences;
}

let gen = new markovGen("The dog is a waifu. The cat is a fish. The fish is a husbando. This is a fish. Who are you?");

let prompt = "The dog is the"

gen.addPrompt(prompt);

let response = "";
let responseLength = 10;
for (let i = 0; i < responseLength; i++) {
    response += gen.getNext();
}

// response = capitalize(response);

console.log("Result for prompt: " + prompt);
console.log(prompt + response);

// console.log(capitalize("the fish is a cat. the dog is alive. "));