const Redis = require('ioredis');

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const redisClient = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
});

redisClient.on('error', (error) => {
    console.error('Redis error:', error.message);
});

async function getOrSet(key, ttl, fetchFn) {
    try {
        const cached = await redisClient.get(key);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (error) {
        console.error('Redis get failed:', error.message);
    }

    const freshData = await fetchFn();

    try {
        await redisClient.setex(key, ttl, JSON.stringify(freshData));
    } catch (error) {
        console.error('Redis set failed:', error.message);
    }

    return freshData;
}

module.exports = {
    redisClient,
    getOrSet,
};
