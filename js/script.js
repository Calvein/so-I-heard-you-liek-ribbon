$(function() {

// Copy
var isFlashInstalled = (((navigator.plugins && typeof navigator.plugins['Shockwave Flash'] == 'object') || (window.ActiveXObject && (new ActiveXObject('ShockwaveFlash.ShockwaveFlash')))) && location.protocol != 'file:');

if (isFlashInstalled) {
	var $copy = $('#copy'),
		zc = new ZeroClipboard.Client();
		
	zc.glue($copy[0]);
	zc.addEventListener('mouseDown', (function() {
		return function(client) {
			zc.setText($('#code').text());
			$copy.fadeOut(50).fadeIn(300)
		}
	})());
}

// Surchage de $.fn.css pour modifier les valeurs affichées
jQuery.fn.changeCss = function(map) {
	for (v in map) {
		$('#css-'+this.attr('id')).find('.'+v).text(map[v]);
	}
	this.css(map);
};

var $wrapper = $('#✿'),
	$d = $('#d'),
	$before = $('#before'),
	$after = $('#after'),
	
	$heightRange = $('#height-range'),
	$widthRange = $('#width-range'),
	$perspectiveRange = $('#perspective-range'),
	
	$perspectiveDown = $('#perspective-down'),
	
	$perspectiveRight = $('#perspective-right'),
	$perspectiveLeft = $('#perspective-left'),
	
	/*
	$gradient = $('#gradient'),
	
	$firstColor = $('#first-color'),
	$lastColor = $('#last-color'),
	*/
	
	$perspectiveColor = $('#perspective-color'),
	
	multiplier = 0;;
	
	
$('input').change(function(e) {
	var thisValue = this.value;
	switch (this.id) {
	// Ranges
	case 'perspective-range':
		thisValue = parseInt(thisValue);
		
		multiplier = 0;
		if (!$perspectiveRight.is(':checked')) {
			multiplier = 2;
		}
		if (!$perspectiveLeft.is(':checked')) {
			multiplier = multiplier === 2 ? 4 : 2;
		}
		
		$d.changeCss({
			width: parseInt($widthRange.val()) + (thisValue * multiplier),
			left: -thisValue * ($perspectiveLeft.is(':checked')? 0 : 2)
		});
		

		$before.changeCss({
			borderWidth: thisValue,
			top: -thisValue * 2
		});

		$after.changeCss({
			borderWidth: thisValue,
			top: -thisValue * 2
		});
		
		if ($perspectiveDown.is(':checked')) {
			$before.changeCss({
				top: $d.height()
			});
	
			$after.changeCss({
				top: $d.height()
			});
		} else {
			$before.changeCss({
				top: -thisValue * 2
			});
	
			$after.changeCss({
				top: -thisValue * 2
			});
		}
		
		break;
	case 'height-range':
		thisValue = parseInt(thisValue);
		$d.changeCss({
			height: thisValue
		});

		if ($perspectiveDown.is(':checked')) {
			$before.changeCss({
				top: thisValue
			});
	
			$after.changeCss({
				top: thisValue
			});
		}

		break;
	case 'width-range':
		thisValue = parseInt(thisValue);
		
		$wrapper.changeCss({
			width: thisValue
		})

		multiplier = 0;
		if (!$perspectiveRight.is(':checked')) {
			multiplier = 2;
		}
		if (!$perspectiveLeft.is(':checked')) {
			multiplier = multiplier === 2 ? 4 : 2;
		}

		$d.changeCss({
			width: thisValue + $perspectiveRange.val() * multiplier
		})
		
		break;
	// Checkbox
	case 'perspective-down':
		if (this.checked) {
			$before.changeCss({
				borderColor: $perspectiveColor.val() + ' ' + $perspectiveColor.val() + ' transparent transparent',
				top: $d.height()
			});
			
			$after.changeCss({
				borderColor: $perspectiveColor.val() + ' transparent transparent ' + $perspectiveColor.val(),
				top: $d.height()
			});
		} else {
			$before.changeCss({
				borderColor: 'transparent ' + $perspectiveColor.val() + ' ' + $perspectiveColor.val() + ' transparent',
				top: -$perspectiveRange.val() * 2
			});
			
			$after.changeCss({
				borderColor: 'transparent transparent ' + $perspectiveColor.val() + ' ' + $perspectiveColor.val(),
				top: -$perspectiveRange.val() * 2
			});
		}		
		
		break;
	case 'perspective-left':
		if ($perspectiveRight.is(':checked')) {
			if (this.checked) {
				multiplier = 0;
			} else {
				multiplier = parseInt($perspectiveRange.val());
			}
		} else {
			multiplier = $perspectiveRange.val() * 2;
		}
		if (this.checked) {
			$d.changeCss({
				width: parseInt($widthRange.val()) + multiplier,
				left: 0
			});
		} else {
			$d.changeCss({
				width: parseInt($widthRange.val()) + (multiplier * 2),
				left: -$perspectiveRange.val() * 2
			});			
		}
		
		$before.changeCss({ display: $before.css('display') === 'block' ? 'none' : 'block' });
		
		break;
	case 'perspective-right':
		if ($perspectiveLeft.is(':checked')) {
			if (this.checked) {
				multiplier = 0;
			} else {
				multiplier = parseInt($perspectiveRange.val());
			}
		} else {
			multiplier = $perspectiveRange.val() * 2;
		}
		if (this.checked) {
			$d.changeCss({
				width: parseInt($widthRange.val()) + multiplier
			});
		} else {
			$d.changeCss({
				width: parseInt($widthRange.val()) + (multiplier * 2)
			});			
		}
		
		$after.changeCss({ display: $after.css('display') === 'block' ? 'none' : 'block' });
		
		break;
	/*
	case 'gradient':
		$(this).siblings('ul').each(function() {
			$(this).toggleClass('hide');
		});
		
		break;
	*/
	// Color
	case 'color':
		$d.changeCss({
			background: thisValue
		});

		//$firstColor.val(thisValue);
		//$lastColor.val(thisValue);
		
		break;
   	/*
	case 'first-color':
		$d.changeCss({
			backgroundColor: thisValue,
			backgroundImage: '-moz-linear-gradient(top, ' + thisValue + ', ' + $lastColor.val() + ')',
			backgroundImage: '-webkit-gradient(linear,left top,left bottom,color-stop(0, ' + thisValue + '),color-stop(1, ' + $lastColor.val() + '))',
			backgroundImage: '-webkit-linear-gradient(' + thisValue + ', ' + $lastColor.val() + ')',
			backgroundImage: 'linear-gradient(top, ' + thisValue + ', ' + $lastColor.val() + ')',
			filter: 'progid:DXImageTransform.Microsoft.gradient(startColorStr="' + thisValue + '", EndColorStr="' + $lastColor.val() + '")'
		});
		
		if ($gradient.is(':checked')) {
			$d.changeCss({ background: thisValue });
			$d.changeCss({ background: '-moz-linear-gradient(top, ' + thisValue + ', ' + $lastColor.val() + ')' });
			$d.changeCss({ background: '-webkit-gradient(linear,left top,left bottom,color-stop(0, ' + thisValue + '),color-stop(1, ' + $lastColor.val() + '))' });
			$d.changeCss({ background: '-webkit-linear-gradient(' + thisValue + ', ' + $lastColor.val() + ')' });
			$d.changeCss({ background: 'linear-gradient(top, ' + thisValue + ', ' + $lastColor.val() + ')' });
			$d.changeCss({ background: 'progid:DXImageTransform.Microsoft.gradient(startColorStr="' + thisValue + '", EndColorStr="' + $lastColor.val() + '")' });
		}
		
		break;
	case 'last-color':
		$d.changeCss({
			backgroundImage: '-moz-linear-gradient(top, ' + $firstColor.val() + ', ' + thisValue + ')',
			backgroundImage: '-webkit-gradient(linear,left top,left bottom,color-stop(0, ' + $firstColor.val() + '),color-stop(1, ' + thisValue + '))',
			backgroundImage: '-webkit-linear-gradient(' + $firstColor.val() + ', ' + thisValue + ')',
			backgroundImage: 'linear-gradient(top, ' + $firstColor.val() + ', ' + thisValue + ')',
			filter: 'progid:DXImageTransform.Microsoft.gradient(startColorStr="' + $firstColor.val() + '", EndColorStr="' + thisValue + '")'
		});
		
		if ($gradient.is(':checked')) {
			$d.changeCss({ backgroundImage: '-moz-linear-gradient(top, ' + $firstColor.val() + ', ' + thisValue + ')' });
			$d.changeCss({ backgroundImage: '-webkit-gradient(linear,left top,left bottom,color-stop(0, ' + $firstColor.val() + '),color-stop(1, ' + thisValue + '))' });
			$d.changeCss({ backgroundImage: '-webkit-linear-gradient(' + $firstColor.val() + ', ' + thisValue + ')' });
			$d.changeCss({ backgroundImage: 'linear-gradient(top, ' + $firstColor.val() + ', ' + thisValue + ')' });
			$d.changeCss({ backgroundImage: 'progid:DXImageTransform.Microsoft.gradient(startColorStr="' + $firstColor.val() + '", EndColorStr="' + thisValue + '")' });
		}
		
		break;
	*/
	case 'perspective-color':
	
		if ($perspectiveDown.is(':checked')) {
			$before.changeCss({
				borderColor: thisValue + ' ' + thisValue + ' transparent transparent'
			});
			
			$after.changeCss({
				borderColor: thisValue + ' transparent transparent ' + thisValue
			});
		} else {
			$before.changeCss({
				borderColor: 'transparent ' + thisValue + ' ' + thisValue + ' transparent'
			});
			
			$after.changeCss({
				borderColor: 'transparent transparent ' + thisValue + ' ' + thisValue
			});
		}
		
		
		break;
	}
	if (this.type === 'range')
		$(this).prev().find('.value').text(thisValue);
}).change();

$('.toggle-code').click(function(e) {
	e.preventDefault();
	$(this).next().slideToggle();
});

});