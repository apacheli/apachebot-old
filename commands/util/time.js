const formats = ["t", "T", "d", "D", "f", "F", "R"];

const handler = async (_bot, _message, args) => {
  const date = Math.floor((args[0] ? new Date(args[0]).getTime() : Date.now()) / 1e+3);
  return {
    body: {
      embeds: [
        {
          fields: formats.map((format) => ({ name: format, value: `<t:${date}:${format}>` })),
        },
      ],
    },
  };
};

export default {
  id: "time",
  description: "Display the current time.",
  group: "util",
  source: "/commands/util/time.js",
  handler,
};
