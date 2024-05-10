const handler = async (_bot, _message, args) => {
  const max = args[0] ? parseInt(args[0]) : 6;
  const min = args[1] ? parseInt(args[1]) : 0;
  return {
    body: {
      content: `:game_die: ${Math.floor(Math.random() * (max - min) + min)}`,
    },
  };
};

export default {
  id: "rng",
  description: "Roll a random number.",
  group: "util",
  usage: "[max] [min]",
  source: "/commands/util/rng.js",
  handler,
};
