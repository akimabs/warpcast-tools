import axios from "axios";
import { spinner, isCancel, cancel, text, outro } from "@clack/prompts";
import fs from "fs";
import "dotenv/config";

import { customException } from "./custom-exception.js";

export async function authWarpcast() {
  const accessToken = await text({
    message: "input your access token",
    placeholder: "Example: Bearer eyWesGebElo....",
  });

  if (isCancel(accessToken)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  const authProccess = spinner();
  authProccess.start("Check your account");

  try {
    const response = await axios.get(`${process.env.WARPCAST_BASE_URL}/onboarding-state`, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (isCancel(authProccess)) {
      cancel("Operation cancelled");
      return process.exit(0);
    }
    const user = response.data.result.state.user;
    fs.writeFileSync("data/user.json", JSON.stringify({ ...user, token: accessToken }, null, 2));
    console.log(" | Success get your account");
    authProccess.stop();
    await menuWarpcast();
  } catch (error) {
    customException({
      fromTask: "Check your account",
      error: error,
      action: authProccess.stop(),
    });
  }
}
