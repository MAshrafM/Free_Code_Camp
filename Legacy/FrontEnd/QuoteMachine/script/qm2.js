var author;
var quote;
var link;
function quoteMachine(){
	$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(generate);
};
function generate(response){
	quote = response["quoteText"];
	if(response["quoteAuthor"] === ""){
		author = "Unknown"
	}
	else{
		author = response["quoteAuthor"];
	}
	link = response["quoteLink"];
	$('.quote').text(quote);
	$('.author').text('-- '+author);
	tweetQuote()
}
function tweetQuote(){
	var tweet = quote + " - " + author;
	var url;
	if(tweet.length < 140){
		url = 'http://twitter.com/intent/tweet?text='+encodeURIComponent(tweet);
		$("#tweetq").attr("href", url);
	}
	else{
		var linklen = link.length;
		var parttweet = tweet.substr(0, 135-linklen);
		tweet = parttweet + '... ' + link;
		url = 'http://twitter.com/intent/tweet?text='+encodeURIComponent(tweet);
		$("#tweetq").attr("href", url);
	}
};
$(document).ready(function(){
	quoteMachine();
	$("#qm").on("click", function(){
		quoteMachine();
	});
});