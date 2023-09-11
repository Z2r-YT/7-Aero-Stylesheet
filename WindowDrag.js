dragElement(document.getElementById("window"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var isDragging = false;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    var hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    if (hoveredElement.tagName.toLowerCase() === 'button') {
      hoveredElement.focus();
      return;
    }
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    if (!isDragging) {
      isDragging = true; // Start dragging only when the mouse moves away from a button
    }
    if (isDragging) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    isDragging = false;
  }
}