import { text } from "@clack/prompts";
import { menuWarpcast } from "./menu.js";

export async function customException({ fromTask, action, error }) {
  action();
  console.log(error);
  console.log(text(`${fromTask} | Something error, please retry again`));
  console.log();
  await menuWarpcast();
}
