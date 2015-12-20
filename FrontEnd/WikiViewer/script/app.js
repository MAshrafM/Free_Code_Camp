$(document).ready(function(){
	var searchq = "";
	$("#Search").submit(function(action){
		$(".content").html("");
		searchq = $("#q").val();
		action.preventDefault();
		var url= "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+searchq+"&callback=JSON_CALLBACK";
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+searchq+"&callback=?",
			dataType: "jsonp",
			success: function (data, textStatus, jqXHR) {
				//console.log(data);
				var html = "";
				$.each(data.query.pages, function(key, value){
					html += "<li class='well'>";
					var title = value.title;
					var cont = value.extract;
					var link = value.pageid;
					html += "<h3 class='title'>"+title+"</h3>";
					html += "<p class='content'>"+cont+"</p>"
					html += "<a class='btn btn-info' href='http://en.wikipedia.org/?curid="+link+"'>More</a></li>";
				});
				$(".content").append(html);
			},
			error: function (errorMessage) {
				console.log("Error");
			}
		});
		$("#q").val("");
		
	});
	
});