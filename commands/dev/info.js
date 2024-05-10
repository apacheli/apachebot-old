const field = (name, value, inline) => ({ name, value, inline });

const handler = async (bot) => {
  const shards = [...bot.gateway.shards.values()];
  const latency = Math.floor(shards.reduce((a, b) => a + b.latency, 0) / shards.length);
  const embed = {
    title: "Info about apachebot",
    url: "https://github.com/apacheli/apachebot",
    description: "My creator is @apacheli. My purpose is to test [the whirlybird library](https://github.com/apacheli/whirlybird).",
    fields: [
      field("apachebot", "1.0.0", true),
      field("whirlybird", "0.0.1", true),
      field("Bun", process.versions.bun, true),
      field("Memory Usage", `${(process.memoryUsage().heapUsed / 1048576).toFixed(2)} MB`, true),
      field("Uptime", `${Math.floor(process.uptime())} s`),
      field("Gateway Latency", `${latency} ms`, true),
    ],
  };
  return {
    body: {
      embeds: [embed],
    },
  };
};

export default {
  id: "info",
  description: "Displays information about apachebot.",
  group: "dev",
  source: "/commands/dev/info.js",
  handler,
};
