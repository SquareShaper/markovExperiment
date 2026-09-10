# Simple Markov Chain Text Generator

The university wanted to make me communicate with an LLM, so I made a SLM - Stupid Language Model TM. 

## Usage

Simply get the markovWords.js or markov.js file, and add:
```js
import { MarkovGenerator } from "./markov.js";
```

at the top of your js file. 

Then you can use:

```js

let gen = new MarkovGenerator(3);

```

To create a new generator instance named `gen` with order 3. The order specifies how much context is used for each word generated. 

To add the initial data to sample generation from, use:

```js

let data = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. "

gen.setData(data);

```

Finally, set a prompt and you're ready to generate new text:

```js

gen.setPrompt("According to");


```

Calling: 
```js
gen.getFullConvo(amount);
```
Returns your prompt + text generated until it hits the specified `amount` of words/letters. 
You can also call:
```js
gen.generate(amount);
```
For generating an `amount` of words/text upto the specified words/letters without your prompt at the start. 

For example usage, check app.js. 
