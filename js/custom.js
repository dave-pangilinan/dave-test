$(document).ready(function(e) {

	/************************************
	 *  My Cart menu dropdown.
	 ************************************/
	var dropdown_hovered = false;
	$('#my-cart').hover(
		function() {
			$(this).addClass('hover');
			$('.cart-content').show();
		},

		// Make the dropdown stay if hovered.
		function() {
			var current = $(this);
		    setTimeout(function(){
		        if(!dropdown_hovered){
		        	$('#my-cart').removeClass('hover');
		            current.siblings('.cart-content').hide();
		        }
		    }, 100);
		}
	);

	$('body').on('mouseleave', '.cart-content', function() {
	    dropdown_hovered = false;
	    $('#my-cart').removeClass('hover');
	    $('.cart-content').hide();
	});

	$('body').on('mouseenter', '.cart-content', function() {
	    dropdown_hovered = true;
	});

	/************************************
	 * Add to cart button functionality.
	 ************************************/
	$('.add-to-cart').click(function(e) {
		e.preventDefault();

		// Check if there's selected size. Show error message if none.
		if ($('.sizes a.selected').length) {

			var image_src = $('.product-details .prod-images > a > img').prop('src');
			var title = $('.product-details h2').text();
			var price = $('.product-details .price').text();
			var size = $('.selected-size').text();

			// Add quantity if item exists in cart. Otherwise, append the item.
			if ($('.cart-content li.size-' + size).length) {

				// Update the item price and quantity.
				var qty = $('.cart-content li.size-' + size + ' .qty').text();
				qty =  parseFloat(qty) + 1;
				price = price.replace('$', '');
				price = parseFloat(price) * qty;
				$('.cart-content li.size-' + size + ' .qty').text(qty);
				$('.cart-content li.size-' + size + ' .price').text('$' + price.toFixed(2).toLocaleString());

			} else {

				// Add item tocart.
				var item = '<li class="size-' + size + '">' +
						'<div class="row">' +
							'<div class="col-4">' +
								'<img src="' + image_src + '" alt="' + title + '" class="img-fluid">' +
							'</div>' +
							'<div class="col-8">' +
								'<div class="title mb-1">' + title + '</div>' +
								'<div class="mb-2"><span class="qty">1</span>x <span class="price">' + price + '</span></div>' +
								'<div>Size: <span class="size">' + size + '</span></div>' +
							'</div>' +
						'</div>' +
					'</li>';
				$('.empty').remove();
				$('.cart-content ul').append(item);
			}
			$('.error-message').html('');

			// Update cart items count.
			$('.cart-total').text($('.cart-content li').length);
		} else {

			// No size selected.
			$('.error-message').html('Please select size.');
		}
	});

	/************************************
	 * Select size.
	 ************************************/
	$('.sizes a').click(function(e) {
		if (!$(this).hasClass('selected')) {
			e.preventDefault();
			$('.sizes a').removeClass('selected');
			$(this).attr('class', 'selected');
			var size = $(this).data('size');
			$('.selected-size').text(size);
		}
	});

});