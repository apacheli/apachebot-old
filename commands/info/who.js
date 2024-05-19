import { USER_AVATAR } from "whirlybird";

const field = (name, value, inline) => ({ name, value, inline });

const statusColors = {
  "online": 0x3a8e5e,
  "idle": 0xcfa653,
  "dnd": 0xd35e61,
};

const activitiesTypes = [
  "Playing",
  "Streaming",
  "Listening to",
  "Watching",
  "",
  "Competing in",
];

const handler = (bot, message, args) => {
  const idk = {
    body: {
      content: "idk",
    },
  };
  const input = args[0] ?? message.author.id;
  if (message.author.id !== process.env.DEVELOPER_ID) {
    if (message.guild_id !== undefined) {
      const guild = bot.cache.guilds.get(message.guild_id);
      const member = guild.members.get(input);
      if (member === undefined) {
        return idk;
      }
    } else if (input !== message.author.id) {
      return idk;
    }
  }
  const user = bot.cache.users.get(input);
  if (user === undefined) {
    return idk;
  }
  const embed = {
    title: user.globalName ?? user.username,
    color: user.presence && statusColors[user.presence.status],
    description: user.presence?.activities.map((a) => a.type === 4 ? a.state : `${activitiesTypes[a.type]} **${a.name}**`).join("\n"),
    fields: [
      field("User ID", `${user.id}`, true),
      field("Username", user.username, true),
    ],
    timestamp: new Date(Number(user.getTimestamp())),
    thumbnail: {
      url: user.avatar && `https://cdn.discordapp.com${USER_AVATAR(user.id, user.avatar)}.png?&quality=lossless&size=1024`,
    },
  };
  return {
    body: {
      embeds: [embed],
    },
  }
};

export default {
  id: "who",
  description: "Who?",
  group: "info",
  usage: "[user]",
  source: "/commands/info/who.js",
  handler,
};
