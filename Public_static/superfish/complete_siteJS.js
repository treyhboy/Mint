$(document).ready(function() {
	$('.nav').superfish({
    delay: 400
	});
  $('.nav li:has(ul)').find('a:first').addClass('sub');
  $('.nav ul li:has(ul)').find('a:first').removeClass('sub').addClass('subsub');
});