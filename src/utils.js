export function displayDialogue(text) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");

  dialogueUI.style.display = "block";

  let index = 0;
  let currentText = "";
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      if (text[index] === "<") {
        const endIndex = text.indexOf(">", index);
        currentText += text.slice(index, endIndex + 1);
        index = endIndex + 1;
      } else {
        currentText += text[index];
        index++;
      }

      dialogue.innerHTML = currentText;
      return;
    }
    clearInterval(intervalRef);
  }, 10);
}

export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
    return;
  }

  k.camScale(k.vec2(1.5));
}
