const handler = async (bot, message) => {
  if (message.author.bot || message.content.substring(0, 3) !== "===") {
    return;
  }
  const content = message.content.substring(3);
  const r = /```.*([\s\S]*?)```|".*?"|'.*?'|`.*?`|\S+/g;
  const e = r.exec(content);
  const command = e && bot.commands.get(e[0]);
  if (
    command === undefined ||
    (command.dev && message.author.id !== process.env.DEVELOPER_ID)
  ) {
    return;
  }
  const args = [];
  let m;
  while ((m = r.exec(content)) !== null) {
    args.push(m[1] ?? ("\"'`".includes(m[0][0]) ? m[0].slice(1, -1) : m[0]));
  }
  let response;
  try {
    response = await command.handler(bot, message, args);
  } catch (error) {
    response = {
      body: {
        content: `Something went wrong! Please report this incident to @apacheli.\n\n\`\`\`\n${Bun.inspect(error, { depth: 0 })}\n\`\`\``,
      },
    };
  }
  await bot.rest.createMessage(message.channel_id, response);
};

export default {
  id: "MESSAGE_CREATE",
  handler,
};
