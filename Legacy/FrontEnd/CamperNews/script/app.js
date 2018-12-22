$(document).ready(function(){
	var url = "http://www.freecodecamp.com/news/hot";
	$.getJSON(url, function(data){
		var html = "";
		data.map(function(val){
			html += "<div class='col-md-4'><li class='thumbnail'>";
			var auth = val.author.picture;
			var pic = val.image;
	 
			if(val.image){
				var img = pic;
			}
			else{
				var img = auth;
			}
		  
			html += "<img src='"+img+"' class='img-responsive'>";
			html += "<div class='caption'><h3 class='text-center'>";
			var title = val.headline;
			var author = val.author.username;
			var d = new Date(val.timePosted);
			html += title + "</h3><div class='author'><p><i class='fa fa-user'></i> "+author+" </p>";
			html += "<p><i class='fa fa-calendar'></i> "+d.toDateString()+"</p></div>";
			html += "<p class='rank'>" + val.rank + " <i class='fa fa-thumbs-up'></i></p>";
			var link = val.link;
			html += "<a class='btn btn-primary' href='"+link+"'>View Article</a></div></li></div>";
		});
		$(".content").append(html);
	});
});