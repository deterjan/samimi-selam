function GreetingQueue(greetings) {
	this.MAX_SIZE = 15;
	this.greetings = greetings;
}

function loadGreetingQueue() {
	if ("lastGreetings" in sessionStorage) {
		let greetings = JSON.parse(sessionStorage.getItem("lastGreetings"));
		return new GreetingQueue(greetings);
	}
	return new GreetingQueue([]);
}

function saveGreetingQueue(queue) {
	sessionStorage.setItem("lastGreetings", JSON.stringify(queue.greetings));
}

function addGreetingToQueue(greeting) {
	let queue = loadGreetingQueue();
	queue.greetings = [greeting].concat(queue.greetings.slice(0, queue.MAX_SIZE));
	saveGreetingQueue(queue);
}

function getLastGreetings() {
	return loadGreetingQueue().greetings.slice(1);
}