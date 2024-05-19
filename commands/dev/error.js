const handler = async () => {
  throw new Error("Certainly an error of all time.");
};

export default {
  id: "error",
  description: "Make an error.",
  group: "dev",
  dev: true,
  source: "/commands/dev/error.js",
  handler,
};
