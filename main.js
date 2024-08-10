import { k } from "./src/kaplay-option";

import { loadSettings } from "./src/setting";
import { mainScene } from "./src/main/scene";

loadSettings(k);

mainScene(k);

k.go("main");
