import { dialogueData } from "../constant";

export function interactWithObejct(k, player, parentObject) {
  let intervalRef;

  k.onKeyPress("space", () => {
    if (parentObject.isCollided === true) {
      if (player.isInDialogue === false) {
        player.isInDialogue = true;
        const dialogueUI = document.getElementById("textbox-container");
        const dialogue = document.getElementById("dialogue");

        dialogueUI.style.display = "block";
        let text = dialogueData[parentObject.objectName];
        let index = 0;
        let currentText = "";
        intervalRef = setInterval(() => {
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
      } else {
        const dialogueUI = document.getElementById("textbox-container");
        const dialogue = document.getElementById("dialogue");

        clearInterval(intervalRef);
        player.isInDialogue = false;
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
      }
    }
  });
}
