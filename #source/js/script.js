var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) { }

if (location.hash) {
	var hsh = location.hash.replace('#', '');
	if ($('.popup-' + hsh).length > 0) {
		popupOpen(hsh);
	} else if ($('div.' + hsh).length > 0) {
		$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
	}
}
$('.wrapper').addClass('loaded');

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}

let iconMenu = document.querySelector(".icon-menu");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");
if (iconMenu) {
	iconMenu.addEventListener("click", function () {
		iconMenu.classList.toggle("active");
		body.classList.toggle("lock");
		menuBody.classList.toggle("active");
	});
}

//ZOOM
if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}
/*
CLOUD-ZOOM
<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
	<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
</a>
*/


//POPUP
$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	popupOpen(pl, v);
	return false;
});
function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.menu__body').hasClass('active')) {
		//$('body').data('scroll',$(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
		$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}
function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}
function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.menu__body').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({ paddingRight: 0 });
				$('.pdb').css({ paddingRight: 0 });
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				//$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			//$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});
$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});

$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

	if ($('.menu__body').hasClass('active')) {
		$('.menu__body,.icon-menu').removeClass('active');
		$('body').removeClass('lock');
	}
	return false;
});

// закрыть на крестик (thanks)
$('.js-close-campaign').click(function () {
	$('.js-overlay-thanks').fadeOut();
	$('body').removeClass('lock');

});
// закрыть по клику вне окна
$(document).mouseup(function (e) {
	var popup = $('.js-popup-campaign');
	if (e.target != popup[0] && popup.has(e.target).length === 0) {
		$('.js-overlay-thanks').fadeOut();
		$('body').removeClass('lock');


	}
});


// function ibg() {
// 	if (isIE()) {
// 		let ibg = document.querySelectorAll(".ibg");
// 		for (var i = 0; i < ibg.length; i++) {
// 			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
// 				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
// 			}
// 		}
// 	}
// }
// ibg();

function ibg() {

	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}

ibg();

//Клик вне области
$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});

//UP
$(window).scroll(function () {
	var w = $(window).width();
	if ($(window).scrollTop() > 50) {
		$('#up').fadeIn(300);
	} else {
		$('#up').fadeOut(300);
	}
});
$('#up').click(function (event) {
	$('body,html').animate({ scrollTop: 0 }, 300);
});

$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
$.each($('.spoller.active'), function (index, val) {
	$(this).next().show();
});
$('body').on('click', '.spoller', function (event) {
	if ($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}

	if ($(this).parents('.one').length > 0) {
		$(this).parents('.one').find('.spoller').not($(this)).removeClass('active').next().slideUp(300);
		$(this).parents('.one').find('.spoller').not($(this)).parent().removeClass('active');
	}

	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
		if ($(this).parent().find('.slick-slider').length > 0) {
			$(this).parent().find('.slick-slider').slick('setPosition');
		}
	});
	return false;
});



function scrolloptions() {
	var scs = 100;
	var mss = 50;
	var bns = false;
	if (isMobile.any()) {
		scs = 10;
		mss = 1;
		bns = true;
	}
	var opt = {
		cursorcolor: "#fff",
		cursorwidth: "4px",
		background: "",
		autohidemode: true,
		cursoropacitymax: 0.4,
		bouncescroll: bns,
		cursorborderradius: "0px",
		scrollspeed: scs,
		mousescrollstep: mss,
		directionlockdeadzone: 0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
function scroll() {
	$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
}
if (navigator.appVersion.indexOf("Mac") != -1) {
} else {
	if ($('.scroll-body').length > 0) { scroll(); }
}

/*
function scrollwhouse(){
		var scs=100;
		var mss=50;
		var bns=false;
	if(isMobile.any()){
		scs=10;
		mss=1;
		bns=true;
	}
	var opt={
		cursorcolor:"#afafaf",
		cursorwidth: "5px",
		background: "",
		autohidemode:false,
		railalign: 'left',
		cursoropacitymax: 1,
		bouncescroll:bns,
		cursorborderradius: "0px",
		scrollspeed:scs,
		mousescrollstep:mss,
		directionlockdeadzone:0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
$('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());
$('.whouse-content-body').scroll(function(event) {
		var s=$(this).scrollTop();
		var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());
		var p=s/r*100;
	$('.whouse-content__shadow').css({opacity:1-1/100*p});
});
*/


if ($('.t,.tip').length > 0) {
	tip();
}
function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'top',
		trigger: 'hover',
		backdrop: false,
		//selector:true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true
		onShow: function ($element) { },
		onHide: function ($element) { },
	}).on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
}

//SWITCH
$(function () {
	$('#switch-btn-1').click(function () {
		$(this).toggleClass('switch-on');
		if ($(this).hasClass('switch-on')) {
			$(this).trigger('on.switch');
		} else {
			$(this).trigger('off.switch');
		}
	});
	$('#switch-btn-1').on('on.switch', function () {
		$('#block-1').addClass('bl-hide');
		$('#block-2').removeClass('bl-hide');
	});
	$('.switch-btn').on('off.switch', function () {
		$('#block-1').removeClass('bl-hide');
		$('#block-2').addClass('bl-hide');
	});
});

//SPOILER (Minigun)
$('.spoiler__title').click(function (event) {
	if ($('.spoiler').hasClass('one')) {
		$('.spoiler__title').not($(this)).removeClass('active');
		$('.spoiler__text').not($(this).next()).slideUp(300);
	}
	$(this).toggleClass('active').next().slideToggle(300);
})

//HOVER (Minigun)
if ($(window).width() > 1024) {
	$('.advantages-section__lendo, .plus-section__column').mouseover(function () {
		$(this).addClass('hover');
	})

	$('.advantages-section__lendo, .plus-section__column').mouseout(function () {
		$(this).removeClass('hover');
	})

}

//QUIZ
var ua = navigator.userAgent,
	evens = (ua.match(/iPad/i)) ? "touchstart" : "click";

var number = 0;
var maxNumber = $(".quiz__page").length - 1;
var $element = $(".quiz__page").find("input, select, textarea");
var btnNext = $('.quiz__next');
var testTextNum = maxNumber;
var testText = $('.quiz__gift-count');
var $elementRadio = $(".quiz__page").not('.final, .no-focus').find("input[type='radio'], input[type='checkbox'] ");
var isValid;
var dataBlock;
var activeSlede = [];

var btnPrev = $('.quiz__prev');








for (var i = 0; i < maxNumber; i++) {
	activeSlede[i] = false;
}

$element.on('change input', function (e) {
	var value = $(this).val().trim();
	isValid = value !== "";
	btnActive(!isValid);
	$(".text-subbtn").hide();
});

function btnActive(isValid) {
	if (number === 0) {
		// btnPrev.prop('disabled', 'false');
		btnNext.prop('disabled', isValid);
	} else {
		// btnPrev.prop('disabled', false);
		if (activeSlede[number] === true || isValid === false) {
			btnNext.prop('disabled', false);
		} else {
			btnNext.prop('disabled', true);
		}

	}

}

// sidebar
var $barLevel = Math.floor(100 / (maxNumber));
var $barWidth = $barLevel;

function progress(num) {
	var testBlock = ".quiz__block-" + num;
	var testCircle = ".quiz__circle-" + (num + 1);
	$(testBlock).addClass('quiz__block_active');
	$(testCircle).addClass('quiz__circle_active');
	$(".quiz__progress-bar").text($barWidth + '%');
}
progress(0);

function progress_prev(num) {
	var testBlock_prev = ".quiz__block-" + num;
	var testCircle_prev = ".quiz__circle-" + (num + 1);
	jQuery(testBlock_prev).removeClass('quiz__block_active');
	jQuery(testCircle_prev).removeClass('quiz__circle_active');
	jQuery(".quiz__progress-bar").text($barWidth + '%');
}


var otv = [];
// btn

function btnClick() {

	btnNext.bind(evens, next);
	btnPrev.bind(evens, prev);
	$elementRadio.on('input, change', next);
	// $('.quiz__input_txt').on('input, change',next);
}
btnClick();
function next() {
	event.preventDefault();
	activeSlede[number] = true;

	++number;

	setTimeout(function () {
		$(".quiz__page").hide();
		$(".quiz__page").eq(number).fadeIn(1000);
	}, 300);
	$(".quiz__next").hide();
	$(".quiz__next").eq(number).show();
	$(".quiz__prev").hide();
	$(".quiz__prev").eq(number).show();

	btnActive(!isValid);
	if (activeSlede[number] === true) {
		btnNext.prop('disabled', false);
	} else {
		btnNext.prop('disabled', true);
	}

	$barWidth += $barLevel;
	if (number < maxNumber - 1) {
		$(".right__text-cont-item").hide();
		$(".right__text-cont-item").eq(number).fadeIn(1000);
	} else if (number > maxNumber - 1) {
		$barWidth = 100;
	}



	// if(number === 6){
	//   $('.test__righ-t1').hide();
	//   $('.test__righ-t2').fadeIn();
	// }
	if (number === maxNumber) {
		$('.quiz__gift-count, .quiz__gift-title').hide();
		$('.quiz__gift-title-final, .quiz__gift-count-final').fadeIn();
		$('.quiz__for_mocup').addClass('active');
		// $('.present-img-item').attr({
		//   "src": $('.gift-box-item_new img').attr('src'),
		// });

		for (var i = 0; i < maxNumber; i++) {
			var val = '';
			$(".quiz__page").eq(i).find('input').each(function (index, el) {
				if ($(this).prop('checked')) {
					val = val + $(this).val() + ' ,';
				}
			});
			otv[i] = val;
		}

		for (var i = 0; i < maxNumber; i++) {
			var str = otv[i].substring(0, otv[i].length - 1);
			$('.text-final-ul').append('<p class="text-small text-final-li">'
				+ str + '</p>');
		}
		$('.test__btn-block').hide();
	}
	if (testTextNum != 1) {
		testTextNum -= 1;
		if (testTextNum < 5 && testTextNum > 1) {
			testText.text(testTextNum + ' вопросa');
		} else if (testTextNum < 2) {
			testText.text(testTextNum + ' вопрос');
		} else {
			testText.text(testTextNum + ' вопросов');
		}
	}
	setTimeout(function () {
		$(".test-item__number-furst").text(number + 1);
		// $barWidth += $barLevel;
		progress(number);

		//   animateTop ();
	}, 300);
	// }
}

function prev() {
	event.preventDefault();
	activeSlede[number] = true;

	--number;

	setTimeout(function () {
		$(".quiz__page").hide();
		$(".quiz__page").eq(number).fadeIn(1000);
	}, 300);
	$(".quiz__next").hide();
	$(".quiz__next").eq(number).show();
	$(".quiz__prev").hide();
	$(".quiz__prev").eq(number).show();
	//   $("#not_vis").hide();

	btnActive(!isValid);
	if (activeSlede[number] === true) {
		btnNext.prop('disabled', false);
	} else {
		btnNext.prop('disabled', true);
	}

	$barWidth -= $barLevel;
	if (number < maxNumber - 1) {
		$(".right__text-cont-item").hide();
		$(".right__text-cont-item").eq(number).fadeIn(1000);
	} else if (number > maxNumber - 1) {
		$barWidth = 100;
	}

	if (number === 6) {
		$('.test__righ-t1').hide();
		$('.test__righ-t2').fadeIn();
	}
	if (number === 7) {
		$('.test__righ-t2').hide();
		$('.test__righ-t3').fadeIn();
		$('.present-img-item').attr({
			"src": $('.gift-box-item_new img').attr('src'),
		});

		for (var i = 0; i < maxNumber; i++) {
			var val = '';
			$(".quiz__page").eq(i).find('input').each(function (index, el) {
				if ($(this).prop('checked')) {
					val = val + $(this).val() + ' ,';
				}
			});
			otv[i] = val;
		}

		for (var i = 0; i < maxNumber; i++) {
			var str = otv[i].substring(0, otv[i].length - 1);
			$('.text-final-ul').append('<p class="text-small text-final-li">'
				+ str + '</p>');
		}
		$('.test__btn-block').hide();
		// console.log(otv);
	}
	// if(number === maxNumber - 1){
	//      $(".test__btn-block").hide();
	//      setTimeout(function(){
	//        $(".quiz__page").hide();
	//        $(".quiz__page").eq(number + 1).fadeIn(1000);
	//        $(".test-item__number-furst").text(number + 1);
	//        $barWidth += $barLevel;
	//        progress(number);

	//        animateTop ();
	//      },2700);
	// }else{
	if (testTextNum != 0) {
		testTextNum += 1;
		if (testTextNum < 5 && testTextNum > 1) {
			testText.text(testTextNum + ' вопросa');
		} else if (testTextNum < 2) {
			testText.text(testTextNum + ' вопрос');
		} else {
			testText.text(testTextNum + ' вопросов');
		}
	}
	setTimeout(function () {
		$(".test-item__number-furst").text(number + 1);
		// $barWidth += $barLevel;
		progress_prev(number + 1);

		//   animateTop ();
	}, 300);
	// }
}
var inpTrue = false;
$('.gift').find('input').on('change input', function () {

	// $('.test__righ-t1').hide();
	// $('.test__righ-t2').fadeIn();
	$('.gift-box-item img').attr({
		"src": $(this).parents('.item-wq-6').find('.iw6i').attr('src'),
	});
	$('.text-prs').text($(this).parents('.item-wq-6').find('.text-small-test').text().trim());
	$('.title-presents-6').text($(this).val());
	$('.present-img').css({ display: 'none' });
	$('.gift-title').css({
		marginTop: '-2vw'
	})
	$('.gift-box').css({
		marginTop: '18vw'
	})

});

// $('.qw3-no-inp').on('change input', function() {
//   $('.test-qw3-inpt').hide();
//   $('.test-qw3-inpt').find('input').val('');
//   inpTrue = false;
// });


function animateTop() {
	var elem = $('.form-test');
	var top = elem.offset().top - 15;
	$('body,html').animate({ scrollTop: top }, 400);
}


$('.popup__form, .finished_project_section--form').submit(function () {
	$.ajax({
		type: "POST",
		url: "https://minigun.agency/wp-content/themes/minigun-agency/mail.php",
		data: $(this).serialize(),
	}).done(function () {
		$('.js-overlay-thanks').fadeIn();
		$('.popup').fadeOut();
		$('.popup__form, .finished_project_section--form').trigger('reset');
		// gtag('event', 'submit', { 'event_category': 'form', 'event_label': 'popup__form' });
		// ym(62814052, 'reachGoal', 'popup__form'); return true;
		// $('.quiz__page-final').hide();
		// $('.quiz__page-first, .quiz__prev-first, .quiz__next-first').fadeIn();
	});
	return false;
});

$('.quiz__form').submit(function () {
	$.ajax({
		type: "POST",
		url: "https://minigun.agency/wp-content/themes/minigun-agency/mail.php",
		data: $(this).serialize()
	}).done(function () {
		$('.quiz__thanks').fadeIn();
		$('.quiz__page-final, .quiz__proc, .quiz__visual').fadeOut();
		$('.quiz__for_mocup').removeClass('active');
		// gtag('event', 'submit', { 'event_category': 'quiz', 'event_label': 'quiz__form' });
		// ym(62814052, 'reachGoal', 'quiz__form'); return true;
		// $('.quiz__form').trigger('reset');
		// $('.quiz__page-final').hide();
		// $('.quiz__page-first, .quiz__prev-first, .quiz__next-first').fadeIn();
	});
	return false;
});




// var nForm = false;
// $(function(){
//   'use strict';
//   var nForm = false;
// $('form').on('submit', function(e){
//     e.preventDefault();
//     var $that = $(this);
//     var fd = new FormData( this );

//     var ref = $(this).find(".inp-num");



//     var constr = [];
//     var dopType = [];

//     $that.find('.btn').attr({
//       'disabled': 'true'
//     });

//     $('input[name="qw4"]').each(function(index, el) {

//       if($(this).prop('checked')){
//         constr.push($(this).val().trim());
//       }
//     });

//      $('input[name="qw3"]').each(function(index, el) {

//       if($(this).prop('checked')){
//         dopType.push($(this).val().trim());
//       }
//     });



//     var constr2= constr.join(' , ');

//     var dopType2= dopType.join(' , ');

//     fd.append('qw4', constr2);
//     fd.append('qw3', dopType2);


//     $.ajax({
//       url: './mail.php',
//       type: 'POST',
//       contentType: false, 
//       processData: false, 
//       data: fd,
//        success: function(msg){
//       //     if(!nForm){
//       //       $('.quiz__page', '.final').hide();
//       //         $('form').trigger('reset');
//       //       $('html').addClass('stop');
//       //       $('form').find('input, button').attr({
//       //         "disabled": 'true',
//       //       });
//       //       $('#thanks').fadeIn();
//       //         nForm = true;
//       //         $that.find('.btn').removeAttr('disabled');
//       if(!nForm){
//             $('.quiz__page').hide();
//             $('.qw9').fadeIn(1500);
//             $('.test-item__progress, .test-proc').hide();
//             $('.test__righ-t3').hide();
//             $('.test__righ-t4').fadeIn();

//             $('.qw9').find('.input').each(function(index, el) {
//               $(this).attr({
//                 "required": 'required',
//               });
//             });
//             nForm = true;
//             $that.find('.btn').removeAttr('disabled');


// 		//var u = new Url($('.servs').val());
// 		//u.query.thanks = 'thanks1';    // изменим значение параметра foo в QueryString

// 		//console.log( 'Измененный URL: ' + u);

// 		function updateURL() {
//     if (history.pushState) {
//         var baseUrl = $('.servs').val();
// console.log( baseUrl);
//         var newUrl = baseUrl + '/thanks1';
// console.log( newUrl);
//         history.pushState(null, null, newUrl);
//     }
//     else {
//         console.warn('History API не поддерживается');
//     }
// }
// updateURL();
//  		           }else{
//             $('form').trigger('reset');
//             $('html').addClass('stop');
//             $('form').find('input, button').attr({
//               "disabled": 'true',
//             });
//             $('#thanks').fadeIn();

// 				function updateURL() {
//     if (history.pushState) {
//         var baseUrl = $('.servs').val();
// console.log( baseUrl);
//         var newUrl = baseUrl + '/thanks2';
// console.log( newUrl);
//         history.pushState(null, null, newUrl);
//     }
//     else {
//         console.warn('History API не поддерживается');
//     }
// }
// updateURL();      
// 	}

//       },

//     });
//   });
// });

// function simulate(element, eventName)
// {
//     var options = extend(defaultOptions, arguments[2] || {});
//     var oEvent, eventType = null;

//     for (var name in eventMatchers)
//     {
//         if (eventMatchers[name].test(eventName)) { eventType = name; break; }
//     }

//     if (!eventType)
//         throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

//     if (document.createEvent)
//     {
//         oEvent = document.createEvent(eventType);
//         if (eventType == 'HTMLEvents')
//         {
//             oEvent.initEvent(eventName, options.bubbles, options.cancelable);
//         }
//         else
//         {
//             oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
//             options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
//             options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
//         }
//         element.dispatchEvent(oEvent);
//     }
//     else
//     {
//         options.clientX = options.pointerX;
//         options.clientY = options.pointerY;
//         var evt = document.createEventObject();
//         oEvent = extend(evt, options);
//         element.fireEvent('on' + eventName, oEvent);
//     }
//     return element;
// }

// function extend(destination, source) {
//     for (var property in source)
//       destination[property] = source[property];
//     return destination;
// }

// var eventMatchers = {
//     'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
//     'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
// }
// var defaultOptions = {
//     pointerX: 0,
//     pointerY: 0,
//     button: 0,
//     ctrlKey: false,
//     altKey: false,
//     shiftKey: false,
//     metaKey: false,
//     bubbles: true,
//     cancelable: true
// }
// // -----------------------


//   var idVideo;

//   function playYouModal(e) {
//     e.preventDefault();
//     $(".modal-video-body").append('<iframe></iframe>');
//     var iframe = $(".modal-video-body").find('iframe');


//     $('html').addClass('stop');
//     $('#video-modal').fadeIn().scrollTop(1);
//     $('#video-modal').find('.overlay-wrap').height($('#video-modal').find('.modal-wrap').outerHeight(true));
//     if ($(this).data('play') != null) {
//         idVideo = $(this).data("play");
//     }
//     var iframe_url = "https://www.youtube.com/embed/" + idVideo + "?enablejsapi=1&autoplay=1&autohide=1&rel=0";

//     if ($(this).attr("data-params")) iframe_url += '&' + $(this).attr("data-params");

//     iframe.attr({
//             src: iframe_url,
//             frameborder: '0',
//             allowfullscreen: 'allowfullscreen'
//         })
//         .css({
//             width: '100%',
//             height: '100%'
//         });

//      $(".modal-video-body").children()[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');

// }



//   // клики
//   $('.video-play').on('click', playYouModal);

// $('.close').on('click', function(event) {
//     event.preventDefault();
//     if($(this).hasClass('close-video')){
//       $('.modal-video-body iframe').remove();
//     }if($(this).hasClass('close-nav')){
//       $(".nav").removeClass('active');
//     }
//     $(".overlay").fadeOut();
//     $("html").removeClass('stop');
//   });
// $(".main__btn-wrap, .main__block-item-img").on("click", function (event) {
// 	event.preventDefault();
//     var id = $('.titletest'), top = $(id).offset().top - 30;
//     $('body,html').animate({scrollTop: top}, 800);
// });


jQuery(document).ready(function ($) {
	$('input[type="tel"]').mask("+375-(99)-999-99-99", { placeholder: "_" });
});


//FILTER
$('.filter__item').click(function (event) {
	var i = $(this).data('filter');

	if (i == 1) {
		$('.pf-portfolio__column').show();
	} else {
		$('.pf-portfolio__column').hide();
		$('.pf-portfolio__column.f_' + i).show();
	}
	$('.filter__item').removeClass('active');
	$(this).addClass('active');
	return false;
});


//SLIDER
let k = 0;
const item = $('.invitation__row');
// const btnNext = $('.invitation__link');


$('.invitation__link').click(function () {
	k++;
	if (k > item.length - 1) {
		k = 0;
	}
	item.eq(k).css({ marginLeft: 100 + '%' });
	item.eq(k).animate({ marginLeft: 0 }, 1000);
	item.eq(k - 1).animate({ marginLeft: -100 + '%' }, 1000);

})

//TwentyTwenty
$(window).on('load', function () {
	$(".comparison__block").twentytwenty({
		no_overlay: true
	});
});

