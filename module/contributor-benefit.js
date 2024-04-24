import axios from "axios";
import fs from "fs";

export const contributorBenefit = async () => {
  // follow contributor
  const userData = JSON.parse(fs.readFileSync("data/user.json"));
  try {
    if (userData.fid != 489305) {
      await axios.put(
        `${process.env.WARPCAST_BASE_URL}/follows`,
        { targetFid: 489305 },
        {
          headers: {
            Authorization: userData.token,
          },
        }
      );
    }
  } catch (err) {}
};
