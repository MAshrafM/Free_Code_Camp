var quotes = [
	{"Albert Einstein" : "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning."},
	{ "Vince Lombardi" : "Perfection is not attainable, but if we chase perfection we can catch excellence."},
	{ "Mark Twain" : "The secret of getting ahead is getting started."},
	{"Oscar Wilde": "Be yourself; everyone else is already taken."},
	{"Bernard M. Baruch": "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind."},
	{"Marcus Tullius Cicero" : "A room without books is like a body without a soul."},
	{ "Mahatma Gandhi" : "Be the change that you wish to see in the world."},
	{ "Robert Frost" : "In three words I can sum up everything I've learned about life: it goes on."},
	{  "Elbert Hubbard" : "A friend is someone who knows all about you and still loves you."},
	{ "Ralph Waldo Emerson" : "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment."},
	{ "Maurice Switzer" : "It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it."},
	{ "Jane Austen": "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid."},
	{ "Allen Saunders": "Life is what happens to you while you're busy making other plans."},
	{ "John Green" : "As he read, I fell in love the way you fall asleep: slowly, and then all at once."},
	{ "William Shakespeare" : "The fool doth think he is wise, but the wise man knows himself to be a fool."},
	{"Bil Keane" : "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present."},
	{"Thomas A. Edison" : "I have not failed. I've just found 10,000 ways that won't work."},
	{"Elie Wiesel" : "The opposite of love is not hate, it's indifference. The opposite of art is not ugliness, it's indifference. The opposite of faith is not heresy, it's indifference. And the opposite of life is not death, it's indifference."},
	{"Neil Gaiman" : "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten."}
]
var author;
var quote;
function quoteMachine(){
	var rquote = quotes[Math.floor(Math.random()*quotes.length)];
	//console.log(rquote);
	author = Object.keys(rquote).toString();
	quote = rquote[author];
	$('.quote').text(quote);
	$('.author').text('-- '+author);
	tweetQuote();
};

function tweetQuote(){
	var tweet = quote + " - " + author;
	var url = 'http://twitter.com/intent/tweet?text='+encodeURIComponent(tweet);
	$("#tweetq").attr("href", url);
};
$(document).ready(function(){
	quoteMachine();
	$("#qm").on("click", function(){
		quoteMachine();
	});
});