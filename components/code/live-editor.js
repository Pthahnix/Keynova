// Editable + runnable code blocks (JavaScript only)
// Usage: add data-live="true" to <pre><code class="language-javascript">...</code></pre>
// Adds a "Run" button that executes the code and shows output below

function initLiveEditor() {
  document.querySelectorAll('pre[data-live="true"]').forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;

    code.contentEditable = 'true';
    code.style.outline = 'none';
    code.spellcheck = false;

    const controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:8px;margin-top:4px;';

    const runBtn = document.createElement('button');
    runBtn.textContent = 'Run';
    runBtn.style.cssText = 'padding:4px 12px;background:#4a9eff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;';

    const output = document.createElement('pre');
    output.style.cssText = 'margin-top:8px;padding:8px 12px;background:rgba(0,0,0,0.3);border-radius:4px;font-size:0.85em;max-height:150px;overflow:auto;display:none;';

    runBtn.addEventListener('click', () => {
      output.style.display = 'block';
      const logs = [];
      const origLog = console.log;
      console.log = function() {
        logs.push(Array.from(arguments).join(' '));
        origLog.apply(console, arguments);
      };
      try {
        var result = eval(code.textContent);
        output.textContent = logs.join('\n') + (result !== undefined ? '\n=> ' + result : '');
      } catch (err) {
        output.textContent = logs.join('\n') + '\nError: ' + err.message;
        output.style.color = '#ff6b6b';
      }
      console.log = origLog;
      if (!output.textContent.trim()) output.textContent = '(no output)';
      output.style.color = output.style.color || '#aaa';
    });

    controls.appendChild(runBtn);
    pre.parentNode.insertBefore(controls, pre.nextSibling);
    pre.parentNode.insertBefore(output, controls.nextSibling);
  });
}
