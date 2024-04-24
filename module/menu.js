import fs from "fs";
import { isCancel, cancel, select } from "@clack/prompts";

import { groupWarpcast } from "./group.js";
import { refreshUserWarpcast } from "./refresh-user.js";
import { unfollowNotFollowWarpcast } from "./unfollow-not-follow.js";

export async function menuWarpcast() {
  const userData = JSON.parse(fs.readFileSync("data/user.json"));
  console.table([
    {
      FID: userData.fid,
      USERNAME: userData.username,
      NAME: userData.displayName,
      "FOLLOWER/FOLLOWING": `${userData.followerCount}/${userData.followingCount}`,
    },
  ]);

  const projectType = await select({
    message: "Pick a project type.",
    options: [
      { value: "refresh-user-profile", label: "Refresh User Profile" },
      { value: "gb-follow-member", label: "Auto Join + Follow All Member Group" },
      { value: "unfollow-not-following", label: "Unfollow Not Following" },
      { value: "auto-follow-targeted-follower-user", label: "Auto Follow Targeted Follower User | Coming Soon" },
      { value: "auto-like-recast-comment-homepage", label: "Auto Like, Recast, and Comment Homepage Post | Coming Soon" },
    ],
  });

  if (isCancel(projectType)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  switch (projectType) {
    case "gb-follow-member":
      await groupWarpcast();
      break;
    case "refresh-user-profile":
      await refreshUserWarpcast();
      break;
    case "unfollow-not-following":
      await unfollowNotFollowWarpcast();
      break;
    default:
      console.log("Coming Soon");
      menuWarpcast();
      break;
  }
}
