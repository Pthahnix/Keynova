// Chart.js convenience wrappers
// CDN: <script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
// Usage: call createChart(canvasId, type, data, options)

function createChart(canvasId, type, data, options) {
  if (typeof Chart === 'undefined') {
    console.warn('chart-helpers.js: Chart.js not loaded');
    return;
  }
  var ctx = document.getElementById(canvasId);
  if (!ctx) return;

  var defaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#ccc', font: { size: 14 } } }
    },
    scales: {
      x: { ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.06)' } },
      y: { ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.06)' } }
    }
  };

  var mergedOpts = Object.assign({}, defaults, options || {});
  return new Chart(ctx, { type: type, data: data, options: mergedOpts });
}

function createBarChart(canvasId, labels, datasets) {
  return createChart(canvasId, 'bar', { labels: labels, datasets: datasets });
}

function createLineChart(canvasId, labels, datasets) {
  return createChart(canvasId, 'line', { labels: labels, datasets: datasets });
}

function createPieChart(canvasId, labels, data, colors) {
  return createChart(canvasId, 'doughnut', {
    labels: labels,
    datasets: [{ data: data, backgroundColor: colors || ['#4a9eff','#ff6b6b','#51cf66','#ffd43b','#cc5de8','#ff922b'] }]
  });
}
