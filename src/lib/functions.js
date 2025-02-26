const heartEmoji = "<:hpheart:1294208451739910195>";

export function snowflake(workerId = 1, processId = 1, increment = 0) {
  const timestamp = Date.now();
  const binaryTimestamp = (BigInt(timestamp) - BigInt(1420070400000))
    .toString(2)
    .padStart(42, "0");
  const binaryWorkerId = (BigInt(workerId) & BigInt(31))
    .toString(2)
    .padStart(5, "0");
  const binaryProcessId = (BigInt(processId) & BigInt(31))
    .toString(2)
    .padStart(5, "0");
  const binaryIncrement = (BigInt(increment) & BigInt(4095))
    .toString(2)
    .padStart(12, "0");
  const binarySnowflake =
    binaryTimestamp + binaryWorkerId + binaryProcessId + binaryIncrement;
  const snowflakeDecimal = BigInt("0b" + binarySnowflake);
  return snowflakeDecimal.toString();
}

export async function events(
  eventType,
  token,
  applicationId,
  channelId,
  guildId,
  messageId,
  customId
) {
  const sessions = {
    ramo: "e875f1377a89347673f7f87d72989f41",
    rose: "a0f532b2ac604f7eac2fffb964e12773",
    reward: "e875f1377a89347673f7f87d72989f41",
    coins: "cd10274ddfe320b23e4677cb8351d3a3",
    hearts: "cd10274ddfe320b23e4677cb8351d3a3",
  };

  await fetch("https://discord.com/api/v9/interactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      type: 3,
      nonce: snowflake(),
      application_id: applicationId,
      channel_id: channelId,
      guild_id: guildId,
      message_id: messageId,
      message_flags: 0,
      session_id: sessions[eventType],
      data: {
        component_type: 2,
        custom_id: customId,
      },
    }),
  });
}

export async function autoFarm(channel) {
  try {
    const buffs = ["asd", "p"];
    channel.send({ content: "xuse 600" }).then(() =>
      setInterval(() => {
        message.channel.send({ content: "xuse 600" });
      }, 1815000)
    );

    setTimeout(() => channel.send("xuse 603"), 3000);
    setTimeout(() => channel.send("xuse 604"), 6000);
    setInterval(() => channel.send("xuse 603"), 3636000);
    setInterval(() => channel.send("xuse 604"), 3690000);

    setTimeout(() => channel.send("xmine 2"), 9000);
    setTimeout(() => channel.send("xfish 2"), 12000);
    setInterval(() => channel.send("xmine 2"), 130200);
    setInterval(() => channel.send("xfish 2"), 135000);
  } catch (error) {
    console.error(error.message);
  }
}

export async function autoPet(channel) {
  try {
    try {
      channel.send("xuse explorador de amor");
      setTimeout(() => {
        channel.send("xuse resistencia de amor");
      }, 4000);
      setTimeout(() => {
        channel
          .send("xpet explore 10")
          .then(() => {
            setInterval(() => {
              channel.send("xpet");
              setTimeout(() => {
                channel.send("xuse explorador de amor");
              }, 2000);
              setTimeout(() => {
                channel.send("xuse resistencia de amor");
              }, 4000);
            }, 1395000); // 2595000 | 1395000
          })
          .then(() => {
            setInterval(() => {
              channel.send("xpet explore 10");
            }, 1515000); // 2715000 | 1515000
          });
      }, 5000);
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.error(error.message);
  }
}

export function getHeartPosition(content) {
  const elements = content.split(/\s+/);
  const squares = elements.filter((el) => el === "▫️" || el === heartEmoji);

  return squares.findIndex((el) => el === heartEmoji) + 1 || null;
}

export function sendHeartUpdate(channel, position) {
  let h;

  position === 1 ? (h = 0) : position === 2 ? (h = 1) : (h = 2);
  return h;
}
