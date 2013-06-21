$(function() {


  $(document).on('click', '.button', function() {displayMenu($(this)); });
  $(document).on('click', '.menu', function() {deleteMenu($(this)); });


  function displayMenu($target) {
    $('.menu').hide();
    $target.closest('.parent').find('.menu').show();
  }

  function deleteMenu($target) {
    $target.closest('.parent').find('.menu').hide();
  }
});
