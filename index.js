import { intro } from "@clack/prompts";
import color from "picocolors";
import fs from "fs";
import "dotenv/config";

import { authWarpcast } from "./module/auth.js";
import { menuWarpcast } from "./module/menu.js";

async function main() {
  const userData = JSON.parse(fs.readFileSync("data/user.json"));
  intro(color.inverse(" warpcast-tools "));
  intro(color.inverse(" by akimabs "));

  if (userData.token == undefined) {
    await authWarpcast();
  }

  await menuWarpcast();
}

main().catch(console.error);
