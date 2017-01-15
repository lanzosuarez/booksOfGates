$(document).ready(function () {
    var $toggle = $('.nav-toggle');
    var $menu = $('.nav-menu');

    $toggle.click(function() {
      $(this).toggleClass('is-active');
      $menu.toggleClass('is-active');
    });

    $("#bookImg").change(function(){
         $('#bookImg').prop(
            'disabled', true)
    });

    $('#bookImg').bind("change",function() { 
        $('#bookImg').prop(
            'disabled', true)
        console.log($('#bookImg'));
        return false;

});
});

