import fs from "fs";
import "dotenv/config";
import axios from "axios";
import { spinner, isCancel, cancel, outro } from "@clack/prompts";

import { customException } from "./custom-exception.js";
import { menuWarpcast } from "./menu.js";

export async function refreshUserWarpcast() {
  const userData = JSON.parse(fs.readFileSync("data/user.json"));

  const authProccess = spinner();
  authProccess.start("Auth");

  try {
    const response = await axios.get(`${process.env.WARPCAST_BASE_URL}/onboarding-state`, {
      headers: {
        Authorization: userData.token,
      },
    });

    if (isCancel(authProccess)) {
      cancel("Operation cancelled");
      return process.exit(0);
    }
    const user = response.data.result.state.user;
    fs.writeFileSync("data/user.json", JSON.stringify({ ...user, token: userData.token }, null, 2));
    console.log(" | Success refresh your account");
    authProccess.stop();
    await menuWarpcast();
  } catch (error) {
    authProccess.stop();
    await customException({
      fromTask: "Auth",
      error: error,
    });
  }
}
