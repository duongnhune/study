//function expand menu click button
$(function () {
  $(document).ready(function(){
    if($('.js-menu-expand').length > 0){
      $('.js-menu-expand').click(function(e) {
        e.preventDefault();
        var menu = $('.bz-menu');
        if (menu.hasClass('has-menu-tiny')) {
          $(this).removeClass('active');
          $('.material-symbols-outlined', this).html('menu');
          menu.removeClass('has-menu-tiny')
              .slideUp();
        } else {
          $(this).addClass('active');
          $('.material-symbols-outlined', this).html('close');
          menu.addClass('has-menu-tiny')
              .slideDown();
        }
      });
    }
  });
});

//function scroll element with scrollbar js
$(function () {
  $(document).ready(function(){
    var viewportGlobal = $(window).width();
    if(viewportGlobal > 991 && $('.scrollbar-outer').length > 0){
      $('.scrollbar-outer').scrollbar();
    }
    if(viewportGlobal > 991 && $('.scrollbar-macosx').length > 0){
      $('.scrollbar-macosx').scrollbar();
    }
  });
});

//function tabs
(function ($) {
  if (typeof window === 'undefined') return;

  function initTabs() {
    if ($('.bz-tabs').length === 0) return;
    $('.bz-tabs').each(function () {
      const $root = $(this);
      // Tránh khởi tạo lại nếu đã xử lý
      if ($root.data('tabs-initialized')) return;
      $root.data('tabs-initialized', true);

      const $tabLinks = $root.find('.bz-tabs__title ul li a');
      const $tabPanes = $root.find('.bz-tabs__pane');
      if (!$tabPanes.filter('.active').length && !$tabPanes.filter('.is-current').length) {
        $tabLinks.first().parent().addClass('active');
        $tabPanes.hide();
        $tabPanes.first().addClass('active').show();
      } else {
        $tabPanes.hide();
        const $activePane = $tabPanes.filter('.is-current, .active').first();
        $activePane.show();
        if (!$tabLinks.parent().hasClass('active')) {
          const activePaneId = $activePane.attr('id');
          if (activePaneId) {
            $tabLinks.filter(`[href="#${activePaneId}"]`).parent().addClass('active');
          }
        }
      }
      $tabLinks.off('click').on('click', function (e) {
        e.preventDefault();
        const $parent = $(this).parent();
        const id = $(this).attr('href');
        if (!$parent.hasClass('active')) {
          $root.find('.bz-tabs__title ul li.active').removeClass('active');
          $root.find('.bz-tabs__pane').removeClass('active').hide();
          $parent.addClass('active');
          $(id).addClass('active').show();
        }
      });
    });
  }

  initTabs();
  const observer = new MutationObserver(initTabs);
  observer.observe(document.body, { childList: true, subtree: true });
})(jQuery);