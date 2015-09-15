$(document).ready(function() {

	/* ---------- Acivate Functions ---------- */
	charts();
	widthFunctions();
	circle_progess();

});

/* ---------- Circle Progess Bars ---------- */

function circle_progess() {

	var divElement = $('div'); //log all div elements


	$(".whiteCircle").knob({
		'min': 0,
		'max': 100,
		'readOnly': true,
		'width': 120,
		'height': 120,
		'bgColor': 'rgba(255,255,255,0.5)',
		'fgColor': 'rgba(255,255,255,0.9)',
		'dynamicDraw': true,
		'thickness': 0.2,
		'tickColorizeValues': true
	});



	$(".circleStatsItemBox").each(function() {

		var value = $(this).find(".value > .number").html();
		var unit = $(this).find(".value > .unit").html();
		var percent = $(this).find("input").val() / 100;

		countSpeed = 2300 * percent;

		endValue = value * percent;

		$(this).find(".count > .unit").html(unit);
		$(this).find(".count > .number").countTo({

			from: 0,
			to: endValue,
			speed: countSpeed,
			refreshInterval: 50

		});

	});

}

/* ---------- Charts ---------- */

function charts() {

	// we use an inline data source in the example, usually data would
	// be fetched from a server
	var data = [],
		totalPoints = 300;

	function getRandomData() {
		if (data.length > 0)
			data = data.slice(1);

		// do a random walk
		while (data.length < totalPoints) {
			var prev = data.length > 0 ? data[data.length - 1] : 50;
			var y = prev + Math.random() * 10 - 5;
			if (y < 0)
				y = 0;
			if (y > 100)
				y = 100;
			data.push(y);
		}

		// zip the generated y values with the x values
		var res = [];
		for (var i = 0; i < data.length; ++i)
			res.push([i, data[i]]);
		return res;
	}

	// setup control widget
	var updateInterval = 30;
	$("#updateInterval").val(updateInterval).change(function() {
		var v = $(this).val();
		if (v && !isNaN(+v)) {
			updateInterval = +v;
			if (updateInterval < 1)
				updateInterval = 1;
			if (updateInterval > 2000)
				updateInterval = 2000;
			$(this).val("" + updateInterval);
		}
	});

	/* ---------- Realtime chart ----------*/

	function update() {
		plot.setData([getRandomData()]);
		// since the axes don't change, we don't need to call plot.setupGrid()
		plot.draw();

		setTimeout(update, updateInterval);
	}

	var options, plot;

	if ($("#serverLoad2").length) {
		options = {
			series: {
				shadowSize: 1
			},
			lines: {
				show: true,
				lineWidth: 2,
				fill: true,
				fillColor: {
					colors: [{
						opacity: 0.9
					}, {
						opacity: 0.9
					}]
				}
			},
			yaxis: {
				min: 0,
				max: 100,
				tickFormatter: function(v) {
					return v + "%";
				},
				color: "rgba(255,255,255,0.8)"
			},
			xaxis: {
				show: false,
				color: "rgba(255,255,255,0.8)"
			},
			colors: ["rgba(255,255,255,0.95)"],
			grid: {
				tickColor: "rgba(255,255,255,0.15)",
				borderWidth: 0,
			},
		};
		plot = $.plot($("#serverLoad2"), [getRandomData()], options);

		update();
	}

}


/* ---------- Page width functions ---------- */

$(window).bind("resize", widthFunctions);

function widthFunctions(e) {

	var winHeight = $(window).height();
	var winWidth = $(window).width();

	var contentHeight = $("#content").height();

	if (winHeight) {

		$("#content").css("min-height", winHeight);

	}

	if (contentHeight) {

		$("#sidebar-left2").css("height", contentHeight);

	}

	if (winWidth < 980 && winWidth > 767) {

		if ($("#sidebar-left").hasClass("span2")) {

			$("#sidebar-left").removeClass("span2");
			$("#sidebar-left").addClass("span1");

		}

		if ($("#content").hasClass("span10")) {

			$("#content").removeClass("span10");
			$("#content").addClass("span11");

		}


		$("a").each(function() {

			if ($(this).hasClass("quick-button-small span1")) {

				$(this).removeClass("quick-button-small span1");
				$(this).addClass("quick-button span2 changed");

			}

		});

		$(".circleStatsItem, .circleStatsItemBox").each(function() {

			var getOnTablet = $(this).parent().attr('onTablet');
			var getOnDesktop = $(this).parent().attr('onDesktop');

			if (getOnTablet) {

				$(this).parent().removeClass(getOnDesktop);
				$(this).parent().addClass(getOnTablet);

			}

		});

		$(".box").each(function() {

			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');

			if (getOnTablet) {

				$(this).removeClass(getOnDesktop);
				$(this).addClass(getOnTablet);

			}

		});

		$(".widget").each(function() {

			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');

			if (getOnTablet) {

				$(this).removeClass(getOnDesktop);
				$(this).addClass(getOnTablet);

			}

		});

		$(".statbox").each(function() {

			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');

			if (getOnTablet) {

				$(this).removeClass(getOnDesktop);
				$(this).addClass(getOnTablet);

			}

		});

	} else {

		if ($("#sidebar-left").hasClass("span1")) {

			$("#sidebar-left").removeClass("span1");
			$("#sidebar-left").addClass("span2");

		}

		if ($("#content").hasClass("span11")) {

			$("#content").removeClass("span11");
			$("#content").addClass("span11");

		}

		$("a").each(function() {

			if ($(this).hasClass("quick-button span2 changed")) {

				$(this).removeClass("quick-button span2 changed");
				$(this).addClass("quick-button-small span1");

			}

		});

		$(".circleStatsItem, .circleStatsItemBox").each(function() {

			var getOnTablet = $(this).parent().attr('onTablet');
			var getOnDesktop = $(this).parent().attr('onDesktop');

			if (getOnTablet) {

				$(this).parent().removeClass(getOnTablet);
				$(this).parent().addClass(getOnDesktop);

			}

		});

		$(".box").each(function() {

			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');

			if (getOnTablet) {

				$(this).removeClass(getOnTablet);
				$(this).addClass(getOnDesktop);

			}

		});

		$(".widget").each(function() {

			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');

			if (getOnTablet) {

				$(this).removeClass(getOnTablet);
				$(this).addClass(getOnDesktop);

			}

		});

		$(".statbox").each(function() {

			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');

			if (getOnTablet) {

				$(this).removeClass(getOnTablet);
				$(this).addClass(getOnDesktop);

			}

		});

	}

	if ($('.timeline')) {

		$('.timeslot').each(function() {

			var timeslotHeight = $(this).find('.task').outerHeight();

			$(this).css('height', timeslotHeight);

		});

	}

}
