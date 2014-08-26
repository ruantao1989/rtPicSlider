(function($, window) {
	jQuery.fn.rtPicSlider = function(options) {

		var settings = $.extend({
			'data': [],
			'speed': 5000,
			'width': 800,
			'height': 400,
			'paginations': true
		}, options);

		var version = '0.0.1';

		var sliderObj = $(this),
			numpic = settings.data.length - 1 || 0,
			nownow = 0,
			inout = 0,
			timer = 0,
			paginations = {}; //页号按钮


		function imgClick(jqObj) {
			alert("GOTO==>" + jqObj.data("url"));
		}

		//添加

		function addTipButtons() {
			var ulstart = '<ul id="pagination">',
				ulcontent = '',
				ulend = '</ul>';
			for (var i = 0; i <= numpic; i++) {
				ulcontent += '<li>' + '</li>';
			}

			$('#slides').after(ulstart + ulcontent + ulend);
		}

		function disableChange() {
			clearInterval(timer);
			var changenow = $(this).index();

			$('#slides li').eq(nownow).css('z-index', '900');
			$('#slides li').eq(changenow).css({
				'z-index': '800'
			}).show();
			paginations.eq(changenow).addClass('current').siblings('li')
				.removeClass('current');
			$('#slides li').eq(nownow).fadeOut(400, function() {
				$('#slides li').eq(changenow).fadeIn(500);
			});
			nownow = changenow;
			timer = setInterval(run, settings.speed);
		}

		function leftClick() {
			clearInterval(timer);
			var changenow = nownow === 0 ? numpic : nownow - 1;
			$('#slides li').eq(nownow).css('z-index', '900');
			$('#slides li').eq(changenow).css({
				'z-index': '800'
			}).show();
			paginations.eq(changenow).addClass('current').siblings('li')
				.removeClass('current');
			$('#slides li').eq(nownow).fadeOut(400, function() {
				$('#slides li').eq(changenow).fadeIn(500);
			});
			nownow = changenow;
			timer = setInterval(run, settings.speed);
		}

		function rightClick() {
			clearInterval(timer);
			var changenow = nownow === numpic ? 0 : nownow + 1;
			$('#slides li').eq(nownow).css('z-index', '900');
			$('#slides li').eq(changenow).css({
				'z-index': '800'
			}).show();
			paginations.eq(changenow).addClass('current').siblings('li')
				.removeClass('current');
			$('#slides li').eq(nownow).fadeOut(400, function() {
				$('#slides li').eq(changenow).fadeIn(500);
			});
			nownow = changenow;
			timer = setInterval(run, settings.speed);
		}


		function run() {
			var NN = nownow + 1;
			if (inout == 1) {} else {
				if (nownow < numpic) {
					$('#slides li').eq(nownow).css('z-index', '900');
					$('#slides li').eq(NN).css({
						'z-index': '800'
					}).show();
					paginations.eq(NN).addClass('current').siblings('li')
						.removeClass('current');
					$('#slides li').eq(nownow).fadeOut(400, function() {
						$('#slides li').eq(NN).fadeIn(500);
					});
					nownow += 1;

				} else {
					NN = 0;
					$('#slides li').eq(nownow).css('z-index', '900');
					$('#slides li').eq(NN).stop(true, true).css({
						'z-index': '800'
					}).show();
					$('#slides li').eq(nownow).fadeOut(400, function() {
						$('#slides li').eq(0).fadeIn(500);
					});
					paginations.eq(NN).addClass('current').siblings('li')
						.removeClass('current');
					nownow = 0;
				}
			}
		}

		//初始化dom元素
		function initDom() {
			var fullScreenSlider = document.createElement("div");
			fullScreenSlider.id = "full-screen-slider";
			fullScreenSlider.innerHTML =
				'<ul id="slides"></ul>' 
				+ '<div id="left_click" class="leftclick">' 
				+ '<img src="css/images/point_left.png" />' 
				+ '</div>' 
				+ '<div id="right_click" class="rightclick">' 
				+ '<img src="css/images/point_right.png" />' 
				+ '</div>';
			fullScreenSlider.className = "clearfloat";
			fullScreenSlider.style.width = settings.width + "px";
			fullScreenSlider.style.height = settings.height + "px";
			sliderObj.append(fullScreenSlider);
			for (var i = 0, len = settings.data.length; i < len; i++) {
				var tar = $(this).find("#slides");
				sliderObj.find("#slides").append(
					'<li data-url="' + settings.data[i].url 
					+ '" style="background: url(' + settings.data[i].pic + ') no-repeat center top"></li>');
			}
			$('#slides li').eq(0).siblings('li').css({
				'display': 'none'
			});
			//左右切换
			var left = $('#left_click');
			var right = $('#right_click');
			left.on('click', leftClick);
			right.on('click', rightClick);
			for (var i = 0; i <= numpic; i++) {
				(function(i) {
					$('#slides li').eq(i).on("click", function() {
						imgClick($(this));
					});
				})(i);
			}

			//页标
			if (settings.paginations) {
				addTipButtons();
			}
			paginations = $('#pagination li'); //更新pagination缓存
			var paginationwidth = $('#pagination').width();
			$('#pagination').css('margin-left', (100 - paginationwidth));
			paginations.eq(0).addClass('current');
			paginations.on('click', disableChange);
			paginations.mouseenter(function() {
				inout = 1;
			});
			paginations.mouseleave(function() {
				inout = 0;
			});


			timer = setInterval(run, settings.speed);
		}

		//执行
		initDom();
		return this;
	};
})(jQuery, window);