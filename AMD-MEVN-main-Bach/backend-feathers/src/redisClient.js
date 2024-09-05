import redis from 'redis';

const client = redis.createClient({
  url: 'redis://redis:6379'
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

// Function to handle Redis client connection
async function connectRedis() {
  try {
    await client.connect();
    console.log('Redis client connected successfully');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
}

// Function to handle graceful shutdown
function setupRedis(app) {
  connectRedis();

  app.on('shutdown', async () => {
    try {
      await client.quit();
      console.log('Redis client disconnected successfully');
    } catch (err) {
      console.error('Error disconnecting Redis client:', err);
    }
  });
}

export { client as default, setupRedis };
