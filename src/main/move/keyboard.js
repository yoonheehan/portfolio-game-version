export function movePlayerByKeyBoard(k, player, parentObject) {
  let rightBlocked = false;
  let leftBlocked = false;
  let upBlocked = false;
  let downBlocked = false;
  k.onKeyDown(() => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 2) return;

    if (player.isInDialogue) return;

    if (keyMap[0] && keyMap[2]) {
      player.flipX = false;
      if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed / 2, -player.speed / 2);
    } else if (keyMap[0] && keyMap[3]) {
      player.flipX = false;
      if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed / 2, player.speed / 2);
    } else if (keyMap[1] && keyMap[2]) {
      player.flipX = true;
      if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed / 2, -player.speed / 2);
    } else if (keyMap[1] && keyMap[3]) {
      player.flipX = true;
      if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed / 2, player.speed / 2);
    } else if (keyMap[0] && keyMap[1]) {
      return;
    } else if (keyMap[2] && keyMap[3]) {
      return;
    } else if (keyMap[0]) {
      player.flipX = false;
      if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
      player.direction = "right";
      console.log("rightleft", leftBlocked);
      console.log("rightright", rightBlocked);
      player.onCollide("block", () => {
        console.log("111111");
        if (!leftBlocked) {
          rightBlocked = true;
        }
      });
      player.onCollideEnd("block", () => {
        if (!leftBlocked) {
          rightBlocked = false;
        }
      });

      if (!rightBlocked) {
        player.move(player.speed, 0);
      }
    } else if (keyMap[1]) {
      player.flipX = true;
      if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
      player.direction = "left";
      console.log("leftleft", leftBlocked);
      console.log("leftright", rightBlocked);
      player.onCollide("block", () => {
        console.log("2222222");
        if (!rightBlocked) {
          leftBlocked = true;
        }
      });
      player.onCollideEnd("block", () => {
        if (!rightBlocked) {
          leftBlocked = false;
        }
      });
      if (!leftBlocked) {
        player.move(-player.speed, 0);
      }
      return;
    } else if (keyMap[2]) {
      if (player.getCurAnim().name !== "walk-up") player.play("walk-up");
      player.direction = "up";
      player.move(0, -player.speed);
      return;
    } else if (keyMap[3]) {
      if (player.getCurAnim().name !== "walk-down") player.play("walk-down");
      player.direction = "down";
      player.move(0, player.speed);
    }
  });

  function stopAnims() {
    if (player.direction === "down") {
      player.play("idle-down");
      return;
    }
    if (player.direction === "up") {
      player.play("idle-up");
      return;
    }

    player.play("idle-side");
  }

  k.onKeyRelease(stopAnims);
}
