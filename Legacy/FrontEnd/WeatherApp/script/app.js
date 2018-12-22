
$(document).ready(function(){
  $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    $(".location").html(data.city+', '+data.country);
    showWeather(data.lat, data.lon);
  });

});
showWeather = function(lat, lon){
=
	var tc = 'F';
	var temp, tempc;
	var API = "ca67ce55c79f10f3323455777752623c";
	var url = "https://api.forecast.io/forecast/"+API+"/"+lat+","+lon+"?callback=?";

	$.getJSON(url, function(weather){

		temp = weather.currently.temperature.toFixed(2);
		tempc = (5/9 * (temp - 32)).toFixed(2);
		var hum = weather.currently.humidity;
		var wind = weather.currently.windSpeed;
		var icon = showIcon(weather.currently.icon);
		$(".hum").text("Humidity " + hum);
		$(".temp").text("Temperature " + temp + '\u00b0 F');
		$(".summary").text(weather.currently.summary +' day.');
	});
	$("#qm").on('click', function(){
		if(tc == 'F'){
			$(".temp").text("Temperature " + tempc + '\u00b0 C');
			tc = 'C';
		}
		else if (tc == 'C'){
			$(".temp").text("Temperature " + temp + '\u00b0 F');
			tc = 'F';
		}
	});
}

showIcon = function(state){
	switch(state){
		case 'clear-day':
			$('.wicon').prepend("<img src='http://openweathermap.org/img/w/01d.png' >");
			$('body').css("backgroundImage","url('http://www.zastavki.com/pictures/originals/2014/Nature___Seasons___Spring_Clear_day_in_spring_field_067763_.jpg')");
			break;
		case 'clear-night':
			$('.wicon').prepend("<img src='http://openweathermap.org/img/w/01n.png' >");
			$('body').css("backgroundImage","url('http://cache.desktopnexus.com/thumbseg/1615/1615594-bigthumbnail.jpg')");
			break;
		case 'rain':
			$('.wicon').prepend("<img src='http://openweathermap.org/img/w/10d.png' >");
			$('body').css("backgroundImage","url('http://bestcoverphoto.com/wp-content/uploads/coverphotos/Rain-grass-trees-nature-flowers-daylilies-facebook-cover-photos-1080x608.jpg')");
			break;
		case 'snow':
			$('.wicon').prepend("<img src='http://openweathermap.org/img/w/13d.png' >");
			$('body').css("backgroundImage","url('http://img.xcitefun.net/users/2014/07/361067,xcitefun-snowing-nature-2.jpg')");
			break;
		case 'cloudy':
			$('.wicon').prepend("<img src='http://openweathermap.org/img/w/03d.png' >");
			$('body').css("backgroundImage","url('http://www.coverslike.com/thumbs/cloudy_sky-t1.jpg')");
			break;
		case 'partly-cloudy-day':
			$('.wicon').prepend("<img src='http://openweathermap.org/img/w/02d.png' >");
			$('body').css("backgroundImage","url('https://lh6.googleusercontent.com/-iXu4ic00uxM/UGzU6HixcEI/AAAAAAAAGJo/8tg011nvWEk/s1600/nature-clean_sky.jpg')");
			break;
		
		case 'partly-cloudy-night':
			$('.wicon').prepend("<img src='http://openweathermap.org/img/w/02n.png' >");
			$('body').css("backgroundImage","url('http://2.bp.blogspot.com/-0TCYQfPiPns/Tvcz-2PyIII/AAAAAAAAH54/tIFzkj1C3rc/s1600/Shiny-moon-in-a-cloudy-night-over-the-sea-wallpaper_2935.jpg')");
			break;
		default:
			break;
		
	}
}
