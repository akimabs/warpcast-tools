import color from "picocolors";
import { menuWarpcast } from "./menu.js";

color.inverse(" warpcast-tools ");
export async function customException({ fromTask, error }) {
  console.log();
  console.log(error);
  console.log(color.bgRed(`${fromTask} | Something error, please retry again`));
  await menuWarpcast();
}
