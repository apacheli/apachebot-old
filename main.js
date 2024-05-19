import { readdir } from "node:fs/promises";
import { CacheClient, flagsAll, GatewayClient, IntentFlags, RestClient } from "whirlybird";

const token = `Bot ${process.env.BOT_TOKEN}`;

const cache = new CacheClient({
  types: {
    GUILDS: true,
    MEMBERS: true,
    PRESENCES: true,
    USERS: true,
  },
});
const rest = new RestClient(token);

const importModules = async (dir) => {
  const mods = new Map();
  const files = await readdir(dir, { recursive: true });
  for (const file of files) {
    if (file.slice(-3) === ".js") {
      const mod = await import(`./${dir}/${file}`);
      mods.set(mod.default.id, mod.default);
    }
  }
  return mods;
};

const commands = await importModules("commands");
const events = await importModules("events");

const gateway = new GatewayClient(token, {
  handleEvent: (event, data) => {
    cache.receiveEvent(event);
    cache.handleEvent(event, data);
    events.get(event)?.handler?.(bot, data);
  },
  identifyOptions: {
    intents: flagsAll(IntentFlags),
  },
  shards: 1,
  url: "wss://gateway.discord.gg",
});

gateway.connect();

const bot = {
  cache,
  commands,
  events,
  gateway,
  rest,
};
