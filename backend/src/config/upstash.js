import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import dotenv from "dotenv";

dotenv.config();

// ratelimiter that allows 10 recs per 10 secs
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(20, "10 s"),
})

export default ratelimit;
