$(document).ready(function(){
    let count = 0;
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
        count++;
        if(count % 2 !== 0) {
            $(".mobile_menu_wrapper").css({
                "display": "flex"
            });
            $(".mobile_menu").css({
                "display": "block"
            })
        } else {
            $(".mobile_menu_wrapper").css({
                "display": "none"
            });
            $(".mobile_menu").css({
                "display": "none"
            });
        }
	});
});
