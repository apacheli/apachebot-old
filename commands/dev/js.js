const handler = async (_bot, _message, args) => {
  let result;
  try {
    result = await eval(args[0]);
  } catch (error) {
    result = error;
  }
  return {
    files: [
      new File([Bun.inspect(result, { depth: 0 })], `${Date.now()}.js`),
    ],
  };
};

export default {
  id: "js",
  description: "Run JavaScript code.",
  dev: true,
  group: "dev",
  usage: "[code]",
  source: "/commands/dev/js.js",
  handler,
};
