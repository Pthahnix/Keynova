// Drag-and-drop sorting interaction
// Call initDragSort() after DOM ready

function initDragSort() {
  document.querySelectorAll('.drag-sort').forEach(function(container) {
    var dragItem = null;

    container.querySelectorAll('.drag-item').forEach(function(item) {
      item.style.cssText = 'padding:12px 16px;margin:6px 0;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:6px;cursor:grab;transition:transform 0.2s,opacity 0.2s;user-select:none;';

      item.addEventListener('dragstart', function(e) {
        dragItem = item;
        item.style.opacity = '0.4';
        e.dataTransfer.effectAllowed = 'move';
      });

      item.addEventListener('dragend', function() {
        item.style.opacity = '1';
        dragItem = null;
        container.querySelectorAll('.drag-item').forEach(function(el) {
          el.style.borderTop = '1px solid rgba(255,255,255,0.15)';
        });
      });

      item.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        item.style.borderTop = '2px solid #4a9eff';
      });

      item.addEventListener('dragleave', function() {
        item.style.borderTop = '1px solid rgba(255,255,255,0.15)';
      });

      item.addEventListener('drop', function(e) {
        e.preventDefault();
        if (dragItem && dragItem !== item) {
          container.insertBefore(dragItem, item);
        }
        item.style.borderTop = '1px solid rgba(255,255,255,0.15)';
      });
    });
  });
}
