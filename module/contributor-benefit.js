export const contributorBenefit = async () => {
    // follow contributor
    if (userData.fid !== 489305) {
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
  };
  