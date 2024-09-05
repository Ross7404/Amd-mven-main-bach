import { MongoDBService } from '@feathersjs/mongodb';
import redisClient from '../../redisClient.js';  // Import Redis client

// Service class for managing users with caching
export class UserService extends MongoDBService {
  
  // Override the find method to implement caching
  async find(params) {
    const key = 'usersCache';
    
    // Check if data is in cache
    const cachedData = await redisClient.get(key);
    
    if (cachedData) {
      console.log('Returning cached data');
      return JSON.parse(cachedData);
    }
    
    // If not cached, proceed with normal find
    const data = await super.find(params);
    
    // Store the result in cache with an expiration time (e.g., 3600 seconds)
    await redisClient.set(key, JSON.stringify(data), 'EX', 3600);
    
    return data;
  }

  // Override create method to invalidate cache
  async create(data, params) {
    const result = await super.create(data, params);
    await redisClient.del('usersCache');  // Invalidate cache
    return result;
  }

  // Override patch method to invalidate cache
  async patch(id, data, params) {
    const result = await super.patch(id, data, params);
    await redisClient.del('usersCache');  // Invalidate cache
    return result;
  }

  // Override remove method to invalidate cache
  async remove(id, params) {
    const result = await super.remove(id, params);
    await redisClient.del('usersCache');  // Invalidate cache
    return result;
  }
}

// Options for the service
export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('users'))
  };
}
