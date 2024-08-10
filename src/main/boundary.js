import { scaleFactor } from "../constant";

export async function makeBoundary(k, map, layers, player, parentObject) {
  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
          boundary.type,
        ]);

        // if (boundary.name === "block") {
        //   player.onCollide(boundary.name, () => {
        //     parentObject.isColliedBlock = true;
        //   });

        //   player.onCollideEnd(boundary.name, () => {
        //     parentObject.isColliedBlock = false;
        //   });
        // }

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            parentObject.isCollided = true;
            parentObject.objectName = boundary.name;
          });

          player.onCollideEnd(boundary.name, () => {
            parentObject.isCollided = false;
          });
        }
      }
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
        }
      }
    }
  }

  return player;
}
