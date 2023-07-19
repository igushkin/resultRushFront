function myFunc() {
  $('.barfiller').each(function (index) {
    var color = $(this).attr('data-color');
    $(this).barfiller({barColor: color, duration: 1500});
  });
};
