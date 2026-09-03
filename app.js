// https://www.geeksforgeeks.org/javascript/javascript-program-to-capitalize-the-first-letter-of-every-sentence-in-a-string/
function capitalize(text) {
    const sentences = text.split(/\.|\?|!/);

    const capitalizedSentences = sentences.filter(sentence => sentence.trim() !== "");

    return capitalizedSentences;
}

import { MarkovGenerator } from "./markov";

let gen = new MarkovGenerator(3);

gen.setData("The funny dog is a funny fish and a funny cat. ")

