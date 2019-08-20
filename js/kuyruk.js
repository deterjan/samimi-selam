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

function addGreetingToQueue(greeting) {
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