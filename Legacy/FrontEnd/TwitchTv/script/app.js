var activity = [];
var channels = [
		"freecodecamp",
		"storbeck",
		"terakilobyte",
		"habathcx",
		"RobotCaleb",
		"comster404",
		"brunofin",
		"thomasballinger",
		"noobs2ninjas",
		"beohoff",
		"MedryBW",
		"gamesdonequick"];
$(document).ready(function(){
    getInfo(channels);
	var timeout = setTimeout(function(){
		clearTimeout(timeout);
		$(".spin").hide();
		showAll();
	}, 3000);
	
	$("#online").on("click", showOnline);
	$("#offline").on("click", showOffline);
	$("#all").on("click", showAll);
	
	$("input").keyup(function(){
		var search = $(this).val();
		var susers = activity.filter(function(u){
			if(u.name.toLowerCase().indexOf(search) > -1){
				return u;
			}
		});
		showSearch(susers);
		console.log(search);
	});
   
});
function getInfo(channels){
	var url = 'https://api.twitch.tv/kraken/';
	var streams = 'streams/';
	var users = 'users/';
	var cb = '?callback=?';
	channels.forEach(function(chan){
		var link = url+users+chan+cb;
		var info = {};
		$.getJSON(link).success(function(data){
			info.name = data.name;
			info.img = data.logo ? data.logo : "https://cdn1.iconfinder.com/data/icons/simply-8-bits-12/96/twitch.png";
			info.link = 'http://www.twitch.tv/'+chan;
		});
		link = url+streams+chan+cb;
		$.getJSON(link).success(function(data){
			if(data.stream !== null){
				info.online = true;
				var status = data.stream.channel.status ? data.stream.channel.status : "";
				if(status.length>45){
					info.status = status.substring(0,45) + "...";
				}
				else{
					info.status = status;
				}
			}
			else{
				info.online = false;
				info.status = "";
			}
		});

		activity.push(info);
		
	});
};

function showOnline(){
	$("#online").addClass("hovon");
	$("#offline, #all").removeClass("hovon");
	$("#twitch").empty();
	activity.forEach(function(user){
		if(user.online){
			display(user);
		}
	});
}

function showOffline(){
	$("#offline").addClass("hovon");
	$("#online, #all").removeClass("hovon");
	$("#twitch").empty();
	activity.forEach(function(user){
		if(!user.online){
			display(user)
		}
	});
}

function showAll(){
	$("#all").addClass("hovon");
	$("#online, #offline").removeClass("hovon");
	$("#twitch").empty();
	activity.forEach(function(user){
		display(user);
	});
}
function showSearch(users){
	$("#online, #offline, #all").removeClass("hovon");
	$("#twitch").empty();
	users.forEach(function(user){
		display(user);
	});
}
function display(user){
	var img = '<img src="'+user.img+'" >';
	var name = '<a href="'+user.link+'">'+user.name+'</a>';
	var status = user.status ? '<p>'+user.status+'</p>' : "";
	var on = user.online ? '<i class="fa fa-user fa-lg on"></i>' : '<i class="fa fa-user-times fa-lg off"></i>'
	var content = '<tr><td>'+img+'</td><td>'+name+status+'</td><td>'+on+'</td></tr>';
	$("#twitch").append(content);
}