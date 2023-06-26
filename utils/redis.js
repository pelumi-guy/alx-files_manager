// RedisClient should have:
// - the constructor that creates a client to Redis:
//      - any error of the redis client must be displayed in the console
//          (you should use o ('error') of the redis client)
// - a function isAlive that returns true when the connection to Redis is a success otherwise, false
// - an asynchronous function get that takes a string key as argument
//     and returns the Redis value stored for this key
// - an asynchronous function set that takes a string key, a value and a duration
//     in second as arguments to store it in Redis
//     (with an expiration set by the duration argument)
// - an asynchronous function del that takes a string key as argument and remove
//      the value in Redis for this key

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.myClient = createClient();
    this.myClient.on('error', (error) => console.log(error));
  }

  isAlive() {
    return this.myClient.connected;
  }

  async get(key) {
    const getAsync = promisify(this.myClient.GET).bind(this.myClient);
    return getAsync(key);
  }

  async set(key, val, time) {
    const setAsync = promisify(this.myClient.SET).bind(this.myClient);
    return setAsync(key, val, 'EX', time);
  }

  async del(key) {
    const delAsync = promisify(this.myClient.DEL).bind(this.myClient);
    return delAsync(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
