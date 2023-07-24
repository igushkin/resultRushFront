/*import ProgressBar from "progressbar.js";*/

function myFunc() {
  $('.barfiller').each(function (index) {
    var color = $(this).attr('data-color');
    $(this).barfiller({barColor: color, duration: 1500});
  });
};

var bar;

function goalBar() {
// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

  var percent = $('#container').attr('data-percent');
  if (!bar) {
    bar = new ProgressBar.Circle(container, {
      color: '#4c6ef8',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 5,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: {color: '#4c6ef8', width: 2},
      to: {color: '#4c6ef8', width: 5},
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('0%');
        } else {
          circle.setText(value + '%');
        }

      }
    });
    /*  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';*/
    bar.text.style.fontSize = '1rem';
  }
  bar.animate(percent);  // Number from 0.0 to 1.0
};
