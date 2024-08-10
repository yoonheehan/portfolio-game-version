import { setCamScale } from "../utils";

export function cameraSetting(k, player, parentObject) {
  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });
}
