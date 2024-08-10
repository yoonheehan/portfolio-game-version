import { scaleFactor } from "../constant";
import { makePlayer } from "./player";
import { makeBoundary } from "./boundary";
import { cameraSetting } from "./camera";
import { movePlayerByMouse } from "./move/mouse";
import { movePlayerByKeyBoard } from "./move/keyboard";
import { interactWithObejct } from "./interact";

export function mainScene(k) {
  k.scene("main", async () => {
    const mapData = await fetch("./map.json").then((data) => data.json());
    const layers = mapData.layers;
    const parentObject = {
      objectName: "",
      isCollided: false,
      isColliedBlock: false,
    };

    const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
    const player = makePlayer(k);

    makeBoundary(k, map, layers, player, parentObject);

    cameraSetting(k, player, parentObject);

    movePlayerByMouse(k, player, parentObject);

    movePlayerByKeyBoard(k, player, parentObject);

    interactWithObejct(k, player, parentObject);
  });
}
