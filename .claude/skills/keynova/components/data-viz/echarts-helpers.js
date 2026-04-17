// ECharts wrappers for complex/interactive charts
// CDN: <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
// Usage: call createEChart(containerId, option)

function createEChart(containerId, option) {
  if (typeof echarts === 'undefined') {
    console.warn('echarts-helpers.js: ECharts not loaded');
    return;
  }
  var container = document.getElementById(containerId);
  if (!container) return;
  var chart = echarts.init(container, 'dark');
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });

  window.addEventListener('slidechange', function() {
    var slide = container.closest('.slide');
    if (slide && slide.classList.contains('active')) {
      setTimeout(function() { chart.resize(); }, 100);
    }
  });
  return chart;
}
