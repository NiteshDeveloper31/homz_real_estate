;(function($) {

  $(document).ready(function() {

   //mobile-wrap
    const mobile_nav_open = $('.mobile-nav-icon');
    const mobile_sidebar = $('.mobile-sidebar');
    const mobile_nav_close = $('.menu-close');

    mobile_nav_open.on('click', function(){
      mobile_sidebar.addClass('mobile-menu-active');
    });

    mobile_nav_close.on('click', function(){
      mobile_sidebar.removeClass('mobile-menu-active');
    });



  //mobile-menus
  $('.mobile-nav a').each(function(){
    var href = $(this).attr('href');
    if(href === '#' || href === '' || typeof href === 'undefined'){
      $(this).addClass('hash-nav');
    } else {
      $(this).removeClass('hash-nav');
    }
  });


  //mobile-menus-markup
  $.fn.menumarker = function(options){
    mobile_menu = $(this),
    settings = $.extend({
      format: "dropdown",
      sticky: false
    }, options);


    return this.each(function(){
      mobile_menu.find('li ul').parent().addClass('has-sub');
      var multiTg = function(){
        mobile_menu.find('.hash-nav').parent().addClass('hash-has-sub');
        mobile_menu.find(".has-sub").prepend('<span class="submenu-button"><em></em></span>');
        
        var toggleSubmenu = function(btn) {
          btn.toggleClass('submenu-opened');
          var targetUl = btn.siblings('ul');
          if (targetUl.hasClass('open-sub')) {
            targetUl.removeClass('open-sub').slideUp(250);
          } else {
            targetUl.addClass('open-sub').slideDown(250);
          }
        };

        mobile_menu.find('.submenu-button').on('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          toggleSubmenu($(this));
        });

        mobile_menu.find('.has-sub > a.hash-nav').on('click', function(e){
          e.preventDefault();
          var btn = $(this).siblings('.submenu-button');
          if(btn.length > 0) {
            toggleSubmenu(btn);
          }
        });
      };

      if (settings.format === 'multitoggle') multiTg();
      else mobile_menu.addClass('dropdown');
      if (settings.sticky === true) mobile_menu.css('position', 'fixed');
      var resizeFix = function () {
          if ($(window).width() > 991) {
              mobile_menu.find('ul').show('fadeIn');
              mobile_menu.find('ul.sub-menu').hide('fadeIn');
          }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);

    })

  }


    $('.mobile-nav').menumarker({
      format: "multitoggle"
    });
   

  });





})(jQuery);

