const handler = async () => {
  return {
    body: {
      content: "pong",
    },
  };
};

export default {
  id: "ping",
  description: "Hello, World!",
  group: "dev",
  source: "/commands/dev/ping.js",
  handler,
};
