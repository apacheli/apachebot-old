const handler = async (bot, _message, args) => {
  if (args.length === 0) {
    const groups = {};
    for (const command of bot.commands.values()) {
      groups[command.group] ??= "";
      groups[command.group] += `, \`${command.id}\``;
    }
    const fields = [];
    for (const name in groups) {
      fields.push({ name, value: groups[name].substring(2) });
    }
    const embed = {
      title: "Commands",
      fields,
      footer: {
        text: "Type `===help [command]` for more information.",
      },
    }
    return { body: { embeds: [embed] } };
  }
  const commandName = args[0];
  const command = bot.commands.get(commandName);
  if (command === undefined) {
    return {
      body: {
        content: `\`${commandName}\`: command not found`,
      },
    };
  }
  const embed = {
    title: command.id,
    url: `https://github.com/apacheli/apachebot/tree/master${command.source}`,
    description: `\`===${command.id} ${command.usage ?? ""}\`\n\n${command.description}`,
    footer: {
      text: command.group,
    },
  };
  return { body: { embeds: [embed] } };
};

export default {
  id: "help",
  description: "Display command information.",
  group: "dev",
  usage: "[command]",
  source: "/commands/dev/help.js",
  handler,
};
