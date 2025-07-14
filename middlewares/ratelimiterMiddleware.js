import { createRequire } from "module";
const require = createRequire(import.meta.url);
const rateLimit = require('express-rate-limit')

export const limiter =  rateLimit({
	windowMs: 10 * 1000, // 10 seconds
    max: 5,              // Limit each IP to 5 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message:{
        error:"slow down dawg "
    }
});