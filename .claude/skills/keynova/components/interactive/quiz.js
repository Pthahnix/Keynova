// Multiple choice quiz interaction
// Call initQuiz() after DOM ready

function initQuiz() {
  document.querySelectorAll('.quiz').forEach(function(quiz) {
    var answer = parseInt(quiz.dataset.answer);
    var options = quiz.querySelectorAll('.quiz-option');
    var answered = false;

    options.forEach(function(btn) {
      btn.style.cssText = 'display:block;width:100%;padding:12px 16px;margin:6px 0;background:rgba(255,255,255,0.08);border:2px solid rgba(255,255,255,0.15);border-radius:8px;color:#eee;font-size:1rem;cursor:pointer;text-align:left;transition:all 0.3s;';

      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        var idx = parseInt(btn.dataset.index);
        options.forEach(function(opt) {
          opt.style.cursor = 'default';
          var optIdx = parseInt(opt.dataset.index);
          if (optIdx === answer) {
            opt.style.borderColor = '#51cf66';
            opt.style.background = 'rgba(81,207,102,0.15)';
          } else if (optIdx === idx && idx !== answer) {
            opt.style.borderColor = '#ff6b6b';
            opt.style.background = 'rgba(255,107,107,0.15)';
          }
        });
      });

      btn.addEventListener('mouseenter', function() {
        if (!answered) btn.style.background = 'rgba(255,255,255,0.15)';
      });
      btn.addEventListener('mouseleave', function() {
        if (!answered) btn.style.background = 'rgba(255,255,255,0.08)';
      });
    });
  });
}
