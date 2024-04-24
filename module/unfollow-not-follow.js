import fs from "fs";
import "dotenv/config";
import axios from "axios";
import { spinner } from "@clack/prompts";

import { menuWarpcast } from "./menu.js";
import { customException } from "./custom-exception.js";

export async function unfollowNotFollowWarpcast() {
  const userData = JSON.parse(fs.readFileSync("data/user.json"));
  let responseFollowing = [];
  let responseFollower = [];

  const spinnerFetchFollowing = spinner();
  spinnerFetchFollowing.start(" | Fetch Following Target");

  try {
    const data = await axios.get(`${process.env.WARPCAST_BASE_URL}/following`, {
      params: {
        fid: userData.fid,
        limit: userData.followingCount,
      },
      headers: {
        Authorization: userData.token,
      },
    });

    responseFollowing = data.data.result.users;

    if (!data || data.status !== 200) {
      customException({
        fromTask: "Fetch Following Target",
        error: error,
        action: spinnerFetchFollowing.stop(),
      });
    }

    console.log(" | Fetch Following Target success");
    spinnerFetchFollowing.stop();
  } catch (error) {
    customException({
      fromTask: "Fetch Following Target",
      error: error,
      action: spinnerFetchFollowing.stop(),
    });
  }

  const spinnerFetchFollower = spinner();
  spinnerFetchFollower.start(" | Fetch Follower Target");

  try {
    const data = await axios.get(`${process.env.WARPCAST_BASE_URL}/followers`, {
      params: {
        fid: userData.fid,
        limit: userData.followerCount,
      },
      headers: {
        Authorization: userData.token,
      },
    });

    responseFollower = data.data.result.users;

    if (!data || data.status !== 200) {
      customException({
        fromTask: "Fetch Followers Target",
        error: error,
        action: spinnerFetchFollower.stop(),
      });
    }

    console.log(" | Fetch Follower Target success");
    spinnerFetchFollower.stop();
  } catch (error) {
    customException({
      fromTask: "Fetch Followers Target",
      error: error,
      action: spinnerFetchFollower.stop(),
    });
  }

  const notFollowerAtFollowing = responseFollowing.filter((userFollowing) => {
    return !responseFollower.some((userFollower) => userFollower.fid === userFollowing.fid);
  });

  const spinnerUnfollowNotFollower = spinner();
  spinnerUnfollowNotFollower.start(" | Unfollow not follower");
  try {
    const tableData = [];

    for (const [i, res] of notFollowerAtFollowing.entries()) {
      try {
        const randomDelay = Math.floor(Math.random() * 10000) + 2000;
        await new Promise((resolve) => setTimeout(resolve, randomDelay));
        tableData.push({
          ACTION: "UNFOLLOW",
          FID: res.fid,
          USERNAME: res.username,
          NAME: res.displayName,
          "FOLLOWER/FOLLOWING": `${res.followerCount}/${res.followingCount}`,
        });

        const dataMember = await axios.delete(`${process.env.WARPCAST_BASE_URL}/follows`, {
          headers: {
            Authorization: userData.token,
          },
          data: {
            targetFid: res.fid,
          },
        });
        if (!dataMember || dataMember.status !== 200) {
          customException({
            fromTask: "Unfollow not follower",
            error: error,
            action: spinnerFetchFollower.stop(),
          });
        }

        console.log(` | Success Unfollow ${res.username}`);
      } catch (error) {
        customException({
          fromTask: "Unfollow not follower",
          error: error,
          action: spinnerFetchFollower.stop(),
        });
      }
    }
    fs.writeFileSync("data/task-unfollow.json", JSON.stringify({ task: tableData }, null, 2));
    console.table(tableData);

    spinnerUnfollowNotFollower.stop();
  } catch (error) {
    customException({
      fromTask: "Unfollow not follower",
      error: error,
      action: spinnerFetchFollower.stop(),
    });
  }

  await menuWarpcast();
}
