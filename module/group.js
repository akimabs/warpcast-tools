import fs from "fs";
import "dotenv/config";
import axios from "axios";
import { spinner } from "@clack/prompts";

import { menuWarpcast } from "./menu.js";
import { customException } from "./custom-exception.js";

export async function groupWarpcast() {
  const userData = JSON.parse(fs.readFileSync("data/user.json"));
  let payloadJoinGroup = {};

  const spinnerFetchGroup = spinner();
  spinnerFetchGroup.start(" | Fetch Group Target");

  try {
    const data = await axios.get(`${process.env.WARPCAST_BASE_URL}/direct-cast-group-invite`, {
      params: {
        inviteCode: process.env.WARPCAST_INVITATION_URL,
      },
      headers: {
        Authorization: userData.token,
      },
    });
    const responseFetchGroup = data.data.result;
    payloadJoinGroup = {
      conversationId: responseFetchGroup.conversationId,
      targetFid: userData.fid,
      inviteCode: process.env.WARPCAST_INVITATION_URL,
      action: "add",
    };

    if (!data || data.status !== 200) {
      spinnerFetchGroup.stop();
      customException({
        fromTask: "Fetch Group Target",
        error: error,
      });
    }

    console.log(" | Fetch group target success");
    spinnerFetchGroup.stop();
  } catch (error) {
    spinnerFetchGroup.stop();
    customException({
      fromTask: "Fetch Group Target",
      error: error,
    });
  }

  const spinnerJoinGroup = spinner();
  spinnerJoinGroup.start(" | Join Group Target");
  try {
    const data = await axios.post(
      `${process.env.WARPCAST_BASE_URL}/direct-cast-group-membership`,
      { ...payloadJoinGroup },
      {
        headers: {
          Authorization: userData.token,
        },
      }
    );

    if (!data || data.status !== 200) {
      spinnerJoinGroup.stop(),
        customException({
          fromTask: "Join Group Target",
          error: error,
        });
    }
    console.log(" | Join group target success");
    spinnerJoinGroup.stop();
  } catch (error) {
    spinnerJoinGroup.stop();
    customException({
      fromTask: "Join Group Target",
      error: error,
    });
  }

  const spinnerFetchMemberGroup = spinner();
  spinnerFetchMemberGroup.start(" | Fetch Member Group Target");
  try {
    const data = await axios.get(`${process.env.WARPCAST_BASE_URL}/direct-cast-conversation-details`, {
      params: {
        conversationId: payloadJoinGroup.conversationId,
        limit: 100,
      },
      headers: {
        Authorization: userData.token,
      },
    });

    if (!data || data.status !== 200) {
      spinnerFetchMemberGroup.stop();
      customException({
        fromTask: "Fetch Member Group Target",
        error: error,
      });
    }

    const memberGroup = data.data.result.participants;

    const memberGroupWhoCantFollow = data.data.result.removedFids.concat(Number(userData?.fid));

    const filteredArraymemberGroup = memberGroup.filter((obj) => !memberGroupWhoCantFollow.includes(obj.fid));

    const tableData = [];

    for (const [i, res] of filteredArraymemberGroup.entries()) {
      try {
        const randomDelay = Math.floor(Math.random() * 10000) + 2000;
        await new Promise((resolve) => setTimeout(resolve, randomDelay));
        tableData.push({
          ACTION: "FOLLOW",
          FID: res.fid,
          USERNAME: res.username,
          NAME: res.displayName,
          "FOLLOWER/FOLLOWING": `${res.followerCount}/${res.followingCount}`,
        });

        const dataMember = await axios.put(
          `${process.env.WARPCAST_BASE_URL}/follows`,
          { targetFid: res.fid },
          {
            headers: {
              Authorization: userData.token,
            },
          }
        );
        if (!dataMember || dataMember.status !== 200) {
          spinnerFetchMemberGroup.stop();
          customException({
            fromTask: "Follow All Member Group",
            error: error,
          });
        }

        console.log(` | Success Follow ${res.username}`);
      } catch (error) {
        spinnerFetchMemberGroup.stop();
        customException({
          fromTask: "Follow All Member Group",
          error: error,
        });
      }
    }

    fs.writeFileSync("data/task-group.json", JSON.stringify({ task: tableData }, null, 2));
    console.table(tableData);

    spinnerFetchMemberGroup.stop();
  } catch (error) {
    spinnerFetchMemberGroup.stop();
    customException({
      fromTask: "Follow All Member Group",
      error: error,
    });
  }

  await menuWarpcast();
}
