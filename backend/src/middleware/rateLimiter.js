import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("limit-key");
        if (!success) {
            return res.send(429).json({
                message: "Too many requests, try again later"
            })
        }
        next();
    } catch (error) {
        console.log("Rate limit error");
        next(error);
    }
}

export default rateLimiter;