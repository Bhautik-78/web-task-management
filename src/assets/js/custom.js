
// drop down js
$('.custom_dropdown_menu').click(function (event) {
  $('.dropdown_menu').hide();
  event.stopPropagation();
  $(this).find('.dropdown_menu').toggle();
});

$(document).click(function () {
  $('.dropdown_menu').hide();
});

// select dropdown picker
$('.selectpicker').selectpicker();

// custom tab

$('.nav_tab > a').click(function () {
  var target = $(this.rel);
  $('.tab_pane').not(target).hide();
  target.toggle();
  $('#tabs_container > .custom_tab > li.active')
    .removeClass('active');

  $(this).parent().addClass('active');

  $('#tabs_container > .tab_contents_container > div.show')
    .removeClass('show');

  $(this.rel).addClass('show');
});

// chart js
var options = {
  series: [50],
  chart: {
    height: 228,
    type: 'radialBar',
  },
  colors: ["#C1C8CB"],
  plotOptions: {
    radialBar: {
      hollow: {
        size: '64%',
      },
      dataLabels: {
        show: false
      },
      track: {
        background: '#455054'
      }
    },
  },
  stroke: {
    lineCap: 'round',
  },
};
var chart = new ApexCharts(document.querySelector("#task_process_chart_1"), options);

chart.render();
var options = {
  series: [75],
  chart: {
    height: 228,
    type: 'radialBar',
  },
  colors: ["#C1C8CB"],
  plotOptions: {
    radialBar: {
      hollow: {
        size: '64%',
      },
      dataLabels: {
        show: false
      },
      track: {
        background: '#455054'
      }
    },
  },
  stroke: {
    lineCap: 'round',
  },
};
var chart = new ApexCharts(document.querySelector("#task_process_chart_2"), options);
chart.render();

var options = {
  series: [85],
  chart: {
    height: 228,
    type: 'radialBar',
  },
  colors: ["#C1C8CB"],
  plotOptions: {
    radialBar: {
      hollow: {
        size: '64%',
      },
      dataLabels: {
        show: false
      },
      track: {
        background: '#455054'
      }
    },
  },
  stroke: {
    lineCap: 'round',
  },
};
var chart = new ApexCharts(document.querySelector("#task_process_chart_3"), options);
chart.render();