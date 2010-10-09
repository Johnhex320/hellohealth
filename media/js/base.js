// JavaScript Document
(function($) {
	var HEALTH = {
		init: function() {
			/*global Cufon*/
			if ($.isFunction(Cufon)) {
				Cufon.replace("h1");
				Cufon.replace(".menu > li > a, #login ul a, #login form h2, .member-name, #search-form label");
				Cufon.replace("#cover h1");
				//Cufon.replace("#navigation-secondary a");
			}
			
			// Homepage
			$("#buzz a").click(function() {
				var $link = $(this),
					$label = $link.find("span"),
					$content = $("#"+$link.attr("href").split("#")[1]);
				if (!$content.hasClass("openedJs")) {
					$content.slideDown().addClass("openedJs");
					$label.text($label.text().replace("Open","Close"));
					$link.addClass("action-expand-opened");
				} else {
					$content.slideUp().removeClass("openedJs");
					$label.text($label.text().replace("Close","Open"));
					$link.removeClass("action-expand-opened");
				}
				return false;							
			});
			
			
			// lightbox
			$(".lightBoxJs").lightBox();
			
			// ToggleShowHide
			$(".tglJs").toggleShowHide({
				callBack: function($link) {
					var href = $link.attr("href");
					if (href) {
						$("#"+href.split("#")[1]).find("input:first").focus();	
					}
				}
			});
			
			// Page Layout
			$("#content .container_6").children(":first").addClass("first");
			
			// login
			$("#button-login").click(function() {
				$("#login").addClass("expanded");
				$("#username").focus();
				return false;
			});
			
			$("a[rel*='external']").each(function() {
				$(this).click(function() {
					/*global window */
					window.open(this.href);
					return false;
				});
			});
		}
	};
	
	$(function() {
		HEALTH.init();		   
	});
/*global jQuery*/
})(jQuery);