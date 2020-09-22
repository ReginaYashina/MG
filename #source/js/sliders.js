//SLIDERS
$(document).ready(function () {
	$('.slider').slick({
		arrows: true,
		dots: true,
		slidesToShow: 1,
		autoplay: false,
		speed: 1000,
		autoplaySpeed: 800,
		appendDots: $('.slider-section__dots'),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					adaptiveHeight: true
				}
			}
			// 	{
			// 		breakpoint: 550,
			// 		settings: {
			// 			slidesToShow:1
			// 		}
			// 	}
		]
	});
	$('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (nextSlide === 4) {
			$('.slider-section__bg').fadeIn(3000);
			$('.slick-arrow').fadeOut();
		} else {
			$('.slider-section__bg').fadeOut();
			$('.slick-arrow').fadeIn(3000);
		}

		if (nextSlide === 1) {
			$('#img_4, #img_3, #img_2').addClass('animation');
		} else {
			$('#img_4, #img_3, #img_2').removeClass('animation');
		}

		if (nextSlide === 2) {
			$('#img_5, #img_5-1, #img_6, #img_6-1, #img_7, #img_8').addClass('animation');
		} else {
			$('#img_5, #img_5-1, #img_6, #img_6-1, #img_7, #img_8').removeClass('animation');
		}

		if (nextSlide === 3) {
			$('#img_9, #img_9-1, #img_10, #img_10-1').addClass('animation');
		} else {
			$('#img_9, #img_9-1, #img_10, #img_10-1').removeClass('animation');
		}




	});
	$('.portfolio__slider').slick({
		arrows: true,
		dots: true,
		slidesToShow: 1,
		autoplay: false,
		speed: 1000,
		autoplaySpeed: 800,
		appendDots: $('.portfolio__dots'),
		appendArrows: $('.portfolio__arrows'),
		fade: true
		// responsive: [
		// 	{
		// 		breakpoint: 1024,
		// 		settings: {
		// 			adaptiveHeight: true
		// 		}
		// 	}
		// 	{
		// 		breakpoint: 550,
		// 		settings: {
		// 			slidesToShow:1
		// 		}
		// 	}
		// ]
	});
	var slider = $('.portfolio__slider');

	$('.portfolio__arrows .slick-prev').on('click', function () {
		$(slider).slick('slickPrev');
	});
	$('.portfolio__arrows .slick-next').on('click', function () {
		$(slider).slick('slickNext');
	});
	$('.works__slider').slick({
		arrows: true,
		dots: false,
		slidesToShow: 2,
		autoplay: false,
		speed: 1000,
		autoplaySpeed: 800,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1
				}
			}
			// 	{
			// 		breakpoint: 550,
			// 		settings: {
			// 			slidesToShow:1
			// 		}
			// 	}
		]
	});
});