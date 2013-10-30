$(function() {
	var scores = $("input[type='number']");
	var id;
	
	function init() {
		$("#total").css('display', 'none');
		for (var i = 0; i < scores.length; i++) {
			scores[i].value = '';
			scores.eq(i).attr('disabled', false);
		};
	}
	
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
		scores.eq(minitem).attr('disabled', true);
		scores.eq(maxitem).attr('disabled', true);
		$("#total span:eq(0)").html(min);
		$("#total span:eq(1)").html(max);
		$("#total span:eq(2)").html(sum);
		$("#total").css('display', "inline");
		var a = JSON.stringify(s);
		console.log(a)
		sessionStorage.setItem(id, a);
	});

	$("#players a").click(function(event) {
		id = $(this).attr("data-id");
		title();
		if(sessionStorage.getItem(id)) {
			var sc = eval(sessionStorage.getItem(id));
			for (var i = 0; i < sc.length - 1; i++) {
				scores[i].value = sc[i+1];
			};
			$("h1").append(' <span class="label label-danger">' + sc[0] + "</span>");
		} else init();
	});

	function title() {
		$("h1").html('<span class="label label-primary"></span>');
		if(id.length<2) $("h1 span").html("0" + id + "号");
		else $("h1 span").html(id+"号");
		var name = $("#players a").eq(id-1).html();
		$("h1").append(" " + name);
	}

	$("#list").click(function(event) {
		$(this).parent().addClass('active');
	});

	$("#setup").click(function(event) {
		sessionStorage.clear();
	});

	init();
});