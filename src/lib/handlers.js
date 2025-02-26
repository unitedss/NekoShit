const {
  events,
  getHeartPosition,
  sendHeartUpdate,
} = require("./functions");
const messageHeartPositions = new Map();

const handlerBouquet = (token, authorId, channelId, guildId, messageId) => {
  const letters = ["L", "O", "V", "E"];

  letters.forEach((letter, i) => {
    setTimeout(
      async () =>
        await events(
          "ramo",
          token,
          authorId,
          channelId,
          guildId,
          messageId,
          `random-event:flower-bouquet:${letter}`
        ),
      i * 2000
    );
  });
};

const handlerSequence = async (
  content,
  token,
  authorId,
  channelId,
  guildId,
  messageId
) => {
  const sequence = content.match(/\b[1-5]{5}\b/)[0].split("");

  sequence.forEach((num, i) => {
    setTimeout(
      async () =>
        await events(
          "reward",
          token,
          authorId,
          channelId,
          guildId,
          messageId,
          `random-event:lootbox:${num}`
        ),
      i * 2000
    );
  });
};

const handlerEventsLove = async (embed, client, token, message) => {
  const eventMap = {
    Bongun: "random-event:resentful-bongun-attack",
    Munak: "random-event:resentful-munak-attack",
    Megalodón: "random-event:megalodon-attack",
    Pitman: "random-event:pitman-attack",
  };

  const eventKey = Object.keys(eventMap).find((key) =>
    embed.description?.includes(key)
  );

  if (eventKey && embed.footer?.text?.includes(client.user.displayName)) {
    console.log(`Evento de ${eventKey} encontrado en actualización.`);
    const position = getHeartPosition(embed.description);
    if (position !== null) {
      messageHeartPositions.set(message.id, position);
      const h = position === 1 ? 0 : position === 2 ? 1 : 2;
      setTimeout(async () => {
        const event = `${eventMap[eventKey]}:${h}`;
        sendHeartUpdate(
          message.channel,
          await events(
            "hearts",
            token,
            message.author.id,
            message.channel.id,
            message.guild.id,
            message.id,
            event
          )
        );
        console.log(h);
      }, 3000);
    }
  }
};

module.exports = { handlerBouquet, handlerSequence, handlerEventsLove };
