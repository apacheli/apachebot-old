import { GUILD_ICON } from "whirlybird";

export const handler = (bot, message, args) => {
  const id = message.author.id === process.env.DEVELOPER_ID && args[0] || message.guild_id;
  const guild = bot.cache.guilds.get(id);
  return {
    body: {
      content: guild ? `https://cdn.discordapp.com${GUILD_ICON(guild.id, guild.icon)}.png?&quality=lossless&size=1024` : "No.",
    },
  };
};

export default {
  id: "icon",
  description: "Get the server's icon.",
  group: "info",
  source: "/commands/info/icon.js",
  handler,
};
