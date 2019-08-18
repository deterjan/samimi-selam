
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

	return (greetingWords + " " + adjective + " " + noun);
}