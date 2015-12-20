$(document).ready(function(){
	var testNumLength = function(number) {
        if (number.length > 9) {
            totaldiv.text(number.substr(number.length-9,9));
            if (number.length > 15) {
                number = "";
                totaldiv.text("Err");
            }
        } 
    };
	var number = "";
    var newnumber = "";
    var operator = "";
    var totaldiv = $("#total");
    totaldiv.text("0");
    $("#numbers a").not("#clear,#clearall").click(function(){
		number += $(this).text();
		totaldiv.text(number);
		testNumLength(number);
    });
    $("#operators a, #side a").not("#equals, #decimal").click(function(){
        if($(this).attr("id") === "sqrt"){
            operator = "sqrt";
            $("#equals").click();
            return;
        }
        else{
		    operator = $(this).text();
        }
		newnumber = number;
		number = "";
		totaldiv.text("0");
    });
    $("#clear,#clearall").click(function(){
		number = "";
		totaldiv.text("0");
		if ($(this).attr("id") === "clearall") {
			newnumber = "";
		}
    });
    //Add your last .click() here!
    $("#equals").click(function(){
    	if (operator === "+"){
    		number = (parseFloat(number, 10) + parseFloat(newnumber,10)).toString(10);
    	} else if (operator === "-"){
    		number = (parseFloat(newnumber, 10) - parseFloat(number,10)).toString(10);
    	} else if (operator === "÷"){
    		number = (parseFloat(newnumber, 10) / parseFloat(number,10)).toString(10);
    	} else if (operator === "×"){
    		number = (parseFloat(newnumber, 10) * parseFloat(number,10)).toString(10);
    	}
    	else if (operator === "sqrt"){
    	    number = Math.sqrt(parseFloat(number, 10)).toString(10);
    	}
    	else if (operator === "^"){
    	    number = Math.pow(parseFloat(newnumber,10), parseFloat(number, 10)).toString(10);
    	}
    	totaldiv.text(number);
    	testNumLength(number);
    	number = "";
    	newnumber = "";
    });
    $("#decimal").click(function(){
        var numOfDecs = 0;
        for(var i = 0; i < number.length; i++){
            if(number[i] === "."){
                numOfDecs++;
            }
        }
        if(numOfDecs === 0){
            number += '.';
            totaldiv.text(number);
            testNumLength(number);
        }
    });
  $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 49) {
            $("#one").click();
       } else if (keycode === 50) {
            $("#two").click();
        } else if (keycode === 51) {
            $("#three").click();
        } else if (keycode === 52) {
            $("#four").click();
        } else if (keycode === 53) {
            $("#five").click();
        } else if (keycode === 54) {
            $("#six").click();
        } else if (keycode === 55) {
            $("#seven").click();
        } else if (keycode === 56) {
            $("#eight").click();
        } else if (keycode === 57) {
            $("#nine").click();
        } else if (keycode === 48) {
            $("#zero").click();
        } else if (keycode === 97) {
            $("#clearall").click();
        } else if (keycode === 99) {
            $("#clear").click();
        } else if (keycode === 61) {
            $("#equals").click();
        } else if (keycode === 43) {
            $("#plus").click();
        } else if (keycode === 45) {
            $("#minus").click();
        } else if (keycode === 42 || keycode === 120) {
            $("#multiply").click();
        } else if (keycode === 47) {
            $("#divide").click();
        } 
    });
});