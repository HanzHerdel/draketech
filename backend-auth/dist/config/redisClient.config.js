import redis from "redis";
const PORT = process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379;
const oauth = {
    db: "oauth",
    cache: redis.createClient({
        port: PORT,
        host: process.env.REDIS_HOST || "127.0.0.1",
    }),
};
export default oauth;
