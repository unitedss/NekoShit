const { Client, MessageEmbed, MessageActionRow } = require("discord.js-selfbot-v13");
const client = new Client();
const prefix = "$";
const { config } = require("dotenv");
const {
  events,
  autoFarm,
  autoPet,
} = require("./lib/functions");
const { handlerBouquet, handlerSequence, handlerEventsLove } = require("./lib/handlers");
config();

const token = process.env.TOKEN;

const types = {
  "https://cdn.nekotina.com/dreams/6f1d6008-b793-4191-b157-ca39e4a59e4b.png": "random-event:seabox:1",
  "https://cdn.nekotina.com/dreams/3459c42b-ee11-46d6-85e5-2c6f1b521ad0.png": "random-event:guildbox:1"
}

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
  const channel = client.channels.cache.get('1342731383512104985')
  await autoFarm(channel)
  setTimeout(() => autoPet(channel), 15000)
  // await joinVC(client);
});

client.on("messageCreate", async (message) => {
  try {
    if(message.embeds.length > 0 && message.channel.id === '1342731383512104985') {
      const embed = message.embeds[0]
      if(embed.description?.includes('Regálale a Neko una')) {
        console.log('Evento rosa encontrada!')
        await events("rose", token, message.author.id, message.channel.id, message.guild.id, message.id, "random-event:rose:1")
      } else if(embed.description?.includes("ramo") && embed.footer?.text?.includes(client.user.displayName)) {
        await handlerBouquet(token, message.author.id, message.channel.id, message.guild.id, message.id)
      } else if(embed.description?.includes("secuencia") && embed.footer?.text?.includes(client.user.displayName)) {
        await handlerSequence(embed.description, token, message.author.id, message.channel.id, message.guild.id, message.id)
      } else if(embed.thumbnail && types[embed.thumbnail.url]) {
        await events("reward", token, message.author.id, message.channel.id, message.guild.id, message.id, types[embed.thumbnail.url])
      } else if (embed.description?.includes("Conquista") && embed.footer?.text?.includes(client.user.displayName)) { 
        await sendPositions(token, message.author.id, message.channel.id, message.guild.id, message.id, embed.description)
      } else {
        await handlerEventsLove(embed, client, token, message)
      }
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
    });

    client.on("messageUpdate", async (_, newMessage) => {
      try {
        if (newMessage.embeds.length > 0 && newMessage.channel.id === "1342731383512104985") {
          const embed = newMessage.embeds[0];

          await handlerEventsLove(embed, client, token, newMessage)
        }
      } catch (err) {
        console.log(err.message);
      }
    });

function getHeartPositions(content) {
  const lines = content.trim().split("\n").slice(-3);
  const positions = [];

  lines.forEach((line, rowIndex) => {
    const cells = line.trim().split(/\s+/);
    cells.forEach((cell, colIndex) => {
      if (cell.includes("💘")) {
        const position = rowIndex * 3 + colIndex;
        positions.push(position);
      }
    });
  });

  return positions;
}

function sendPositions(token, applicationId, channelId, guildId, messageId, content) {
  const positions = getHeartPositions(content);

  positions.forEach((position, index) => {
    setTimeout(async () => {
      await events("hearts", token, applicationId, channelId, guildId, messageId, `random-event:nekoheart:${position}`)
    }, index * 2000);
  });
}


client.login(token);
