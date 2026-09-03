// https://www.geeksforgeeks.org/javascript/javascript-program-to-capitalize-the-first-letter-of-every-sentence-in-a-string/
function capitalize(text) {
    const sentences = text.split(/\.|\?|!/);

    const capitalizedSentences = sentences.filter(sentence => sentence.trim() !== "");

    return capitalizedSentences;
}

import { MarkovGenerator } from "./markov.js";

let gen = new MarkovGenerator(3);

let data = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. "

gen.setData(data);

gen.setPrompt("According to");

console.log(gen.getFullConvo(1000));

console.log()