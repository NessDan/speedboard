const keySpeeds = {};
const maxTime = 300; // for late key presses
const minTime = 8; // for accidental fat-fingering

monkeyType.forEach((session) => {
  const replayData = session.replayData;
  replayData.forEach((keyData, idx) => {
    const nextKeyData = replayData[idx + 1];

    if (!nextKeyData) {
      return;
    }

    if (
      keyData.action == "correctLetter" &&
      nextKeyData.action == "correctLetter"
    ) {
      const deltaTime = nextKeyData.time - keyData.time;

      // Don't take into account too-long or too-short times.
      if (deltaTime >= maxTime || deltaTime <= minTime) {
        return;
      }

      if (!keySpeeds[keyData.value]) {
        keySpeeds[keyData.value] = {
          [nextKeyData.value]: {
            totalTime: deltaTime,
            count: 1,
          },
        };
      } else if (!keySpeeds[keyData.value][nextKeyData.value]) {
        keySpeeds[keyData.value][nextKeyData.value] = {
          totalTime: deltaTime,
          count: 1,
        };
      } else {
        keySpeeds[keyData.value][nextKeyData.value].totalTime += deltaTime;
        keySpeeds[keyData.value][nextKeyData.value].count += 1;
      }
    }
  });
});

// Go through the multi-array and make averages for each keys' totals
for (const [firstKey, secondKeys] of Object.entries(keySpeeds)) {
  for (const [secondKey, stats] of Object.entries(secondKeys)) {
    stats.avg = stats.totalTime / stats.count;
  }
}

console.log(keySpeeds);
