$(function() {
	var scores = $("input[type='number']"),
		players = $("#players a");
	var id;

	$("#main").load("p/_index.html", function() {
		init();
	});

	//initial the index page
	function init() {
		$("#total").css('display', 'none');
		for (var i = 0; i < scores.length; i++) {
			scores[i].value = '';
			scores.eq(i).parent().attr('class', 'col-sm-3');
			scores.eq(i).attr('disabled', false);
		};
	}

	function title() {
		init();
		$("h2").html('<span class="label label-primary"></span>');
		if(id.length<2) $("h2 span").html("0" + id + "号");
		else $("h2 span").html(id+"号");
		var name = players.eq(id-1).html();
		$("h2").append(" " + name);
	}
	
	//calculate the score in index page
	$("#score").click(function(event) {
		var s = Array(),
			max = sum = 0,
			min = 100;
		var maxitem, minitem;
		for (var i = 0; i < scores.length; i++) {
			s[i+1] = parseInt(scores[i].value);
			if (s[i+1] < min) {
				min = s[i+1];
				minitem = i;
			} 
			if (s[i+1] > max) {
				max = s[i+1];
				maxitem = i;
			}
			sum  = sum + s[i+1];
		};
		s[0] = (sum - max - min)/(scores.length-2);
		scores.eq(minitem).parent().addClass('has-warning');
		scores.eq(minitem).attr('disabled', true);
		scores.eq(maxitem).parent().addClass('has-success');
		scores.eq(maxitem).attr('disabled', true);
		$("#total span:eq(0)").html(min);
		$("#total span:eq(1)").html(max);
		$("#total span:eq(2)").html(s[0]);
		$("#total").css('display', "block");
		sessionStorage.setItem("S"+id, JSON.stringify(s));
	});

	//click the player's name in menu (MUST link to index page)
	players.click(function(event) {
		id = $(this).attr("data-id");
		title();
		$("#score").attr('disabled', false);
		if(sessionStorage.getItem("S"+id)) {
			var sc = eval(sessionStorage.getItem("S"+id));
			for (var i = 0; i < sc.length - 1; i++) {
				scores[i].value = sc[i+1];
			};
			$("h2").append('<span class="label label-danger" style="float:right;">总分：' + sc[0] + "</span>");
		} else init();
	});

	//list the player's score in menu (MUST link to the link page)
	$("#list").click(function(event) {
		// $(this).parent().addClass('active');
		// $(".main:eq(0)").css('display', 'none');
		// $(".main:eq(1)").css('display', 'block');
		$("#main").load("p/_list.html");
		$("tbody").html("");
		for (var i = 0, td; i < sessionStorage.length; i++) {
			td = "<tr><td>" + (i+1) + "</td><td>";
			td = td + players.eq(i).html() + "</td><td>";
			var sc = eval(sessionStorage.getItem("S"+(i+1)));
			td = td + sc[0] + "</td></tr>";
			$("tbody").append(td);
		};
	});

	$("#setup").click(function(event) {
		sessionStorage.clear();
		$("h2").html("");
		init();
	});

});