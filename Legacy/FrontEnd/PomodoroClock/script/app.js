$(document).ready(function(){
	var start = true;
	var clock = $(".clock");
	var hov = $(".play");
	var timeInt;
	var value = 0;
	var min = calcTime($("#fader").val())[0]; 
	var sec = calcTime($("#fader").val())[1]; 
	
	$("#fader").on("input change", function(){
		var slide = parseInt($(this).val());
		min = calcTime(slide)[0];
		sec = calcTime(slide)[1];
		
	    $('.Session').text(formate(min)+":"+formate(sec));
	});

	clock.hover(function(){
		if(value < min*60+sec){
			hov.toggle();
		}
	});
	
	function count(){
		if(value < min*60+sec){
		  value += 1;
	    }
		
		$(".timer").text(formate(calcTime(value)[0])+":"+formate(calcTime(value)[1]));
		
		$(".fill").css("height", (((value)*100)/(min*60+sec))+"%");
		
		if(value === min*60+sec){
			$(".reset").show();
			startFalse();
			$(".pause").hide();
		}
	}
	
	function startTrue(){
		clearInterval(timeInt);
		start = false;
		hov.toggle();
		timeInt = setInterval(function (){
			count();
		}, 1000);
	}
	
	function startFalse(){
		clearInterval(timeInt);
		start = true;
		hov.toggle();
	}
	
	function calcTime(value){
		var min = Math.floor(value/60);
		var sec = value%60;
		return [min, sec];
		
	}
	function formate(ss){
		if(ss < 10){
			return "0"+ss;
		}
		else{
			return ss;
		}
	}
	
	clock.click(function(){
		if(start){
			hov.toggle();
			hov = $(".pause");
			startTrue();
		}
		else{
			hov.toggle();
			hov = $(".play");
			startFalse();
		}
		
		if(value === min*60+sec){
			$(".reset").hide();
			value = 0;
			startTrue();			
		}
	});
	
	$(".minus").on("click", function(){
		var slide = parseInt(document.getElementById('fader').value, 10);
		slide = isNaN(slide) ? 0 : slide;
		slide--;
		document.getElementById('fader').value = slide;
		min = calcTime(slide)[0];
		sec = calcTime(slide)[1];
		
	    $('.Session').text(formate(min)+":"+formate(sec));
	});
	
	$(".plus").on("click", function(){
		var slide = parseInt(document.getElementById('fader').value, 10);
		slide = isNaN(slide) ? 0 : slide;
		slide++;
		document.getElementById('fader').value = slide;
		min = calcTime(slide)[0];
		sec = calcTime(slide)[1];
		
	    $('.Session').text(formate(min)+":"+formate(sec));
	});
    
});

