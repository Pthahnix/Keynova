// Live polling simulation using localStorage
// Call initPolls() after DOM ready

function initPolls() {
  document.querySelectorAll('.poll').forEach(function(poll) {
    var pollId = poll.dataset.pollId || 'default';
    var storageKey = 'projects-poll-' + pollId;
    var options = poll.querySelectorAll('.poll-option');
    var resultsDiv = poll.querySelector('.poll-results');
    var voted = localStorage.getItem(storageKey + '-voted');

    function getVotes() {
      try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
      catch (e) { return {}; }
    }

    function renderResults() {
      var votes = getVotes();
      var total = Object.values(votes).reduce(function(a, b) { return a + b; }, 0) || 1;
      var html = '';
      Object.keys(votes).forEach(function(key) {
        var pct = Math.round(votes[key] / total * 100);
        html += '<div style="margin:4px 0;"><span>' + key + '</span>';
        html += '<div style="background:rgba(255,255,255,0.08);border-radius:4px;height:24px;margin-top:2px;overflow:hidden;">';
        html += '<div style="width:' + pct + '%;height:100%;background:#4a9eff;border-radius:4px;transition:width 0.5s;display:flex;align-items:center;padding-left:8px;font-size:12px;">' + pct + '%</div>';
        html += '</div></div>';
      });
      if (resultsDiv) resultsDiv.innerHTML = html;
    }

    options.forEach(function(btn) {
      btn.style.cssText = 'display:block;width:100%;padding:10px 16px;margin:4px 0;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#eee;cursor:pointer;font-size:0.95rem;';

      btn.addEventListener('click', function() {
        if (voted) return;
        var option = btn.dataset.option;
        var votes = getVotes();
        votes[option] = (votes[option] || 0) + 1;
        localStorage.setItem(storageKey, JSON.stringify(votes));
        localStorage.setItem(storageKey + '-voted', 'true');
        voted = true;
        options.forEach(function(b) { b.style.cursor = 'default'; b.style.opacity = '0.6'; });
        btn.style.borderColor = '#4a9eff';
        btn.style.opacity = '1';
        renderResults();
      });
    });

    if (voted) renderResults();
  });
}
