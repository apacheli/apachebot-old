const handler = async (bot, message, args) => {
  return {
    body: {
      content: `\`\`\`json\n${JSON.stringify(args, null, 2)}\n\`\`\``,
    },
  };
};

export default {
  id: "args",
  description: "Display command arguments.",
  group: "dev",
  usage: "[...args]",
  source: "/commands/dev/args.js",
  handler,
};
