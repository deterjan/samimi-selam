
function pickRandom(array) {
	return array[Math.floor(Math.random()*array.length)];
}

function lastVowel(word) {
	return word[word.search(/([aeıioöuü])[^aeıioöuü]*$/g)];
}

function makePlural(noun) {
	let last = lastVowel(noun);
	if (last === 'e' || last === 'i' || last === 'ö' || last === 'ü' || last == undefined)
		return noun + "lerim";
	else
		return noun + "larım";
}

function timedGreetingWords(hour) {
	if (hour > 4 && hour <= 12)
		return "günaydın";
	else if (hour > 12 && hour <= 16)
		return "tünaydın";
	else if (hour > 16 && hour <= 22)
		return "iyi akşamlar";
	else
		return "iyi geceler";
}

function clearSuffix(noun) {
  const words = noun.split(" ");
  if (words.length === 1) {
    return noun;
  }
  const lastIndex = words.length - 1;
  words[lastIndex] = tamlamaEkiniTemizle(words[lastIndex]);
  const clearedNoun = words.join(" ");
  if (noun !== clearedNoun) {
    console.log("Cleared: '" + noun + "' > '" + clearedNoun + "'");
  }
  return clearedNoun;
}

function makeGreeting() {
	let greetingWords = timedGreetingWords(new Date().getHours());
	let adjective = pickRandom(turkishAdjectives);
	let noun = makePlural(clearSuffix(pickRandom(turkishNouns)));
	let greeting = (greetingWords + " " + adjective + " " + noun); 
	addGreeting(greeting);
	return greeting;
}

function GreetingQueue(size, index, greetings) {
	this.size = size;
	this.index = index;
	this.greetings = greetings;
}

function loadGreetingQueue() {
	if ("size" in sessionStorage) {
		let size = parseInt(sessionStorage.getItem("size"), 10);
		let index = parseInt(sessionStorage.getItem("index"), 10);
		let greetings = JSON.parse(sessionStorage.getItem("greetings"));
		return new GreetingQueue(size, index, greetings);
	}
	return new GreetingQueue(0, -1, []);
}

function saveGreetingQueue(queue) {
	sessionStorage.setItem("size", queue.size.toString());
	sessionStorage.setItem("index", queue.index.toString());
	sessionStorage.setItem("greetings", JSON.stringify(queue.greetings));
}

function hasNextGreeting(queue) {
	return (queue.index < (queue.size - 1));
}

function hasPreviousGreeting(queue) {
	return (queue.index > 0);
}

function addGreeting(greeting) {
	let queue = loadGreetingQueue();
	queue.greetings = queue.greetings.slice(0, queue.index + 1)
	queue.greetings.push(greeting);
	queue.size = queue.greetings.length;
	queue.index = queue.size - 1;
	saveGreetingQueue(queue);
}

function getPreviousGreeting() {
	let queue = loadGreetingQueue();

	if (hasPreviousGreeting(queue)) {
		let prevGreeting = queue.greetings[queue.index - 1];
		queue.index--;
		saveGreetingQueue(queue);
		return prevGreeting;
	}
	else return null;
}

function getNextGreeting() { 
	let queue = loadGreetingQueue();

	if (hasNextGreeting(queue)) {
		let nextGreeting = queue.greetings[queue.index + 1];
		queue.index++;
		saveGreetingQueue(queue);
		return nextGreeting;
	}
	else return null;
}