import { defineNitroPlugin } from 'nitropack/runtime/plugin'
import Redis, { Cluster } from 'ioredis'

export default defineNitroPlugin((nitroApp) => {

  if (
    (!process.env.REDIS_CLUSTER_HOST || !process.env.REDIS_CLUSTER_PORT) &&
    (!process.env.REDIS_HOST || !process.env.REDIS_PORT)
  ) {
    console.error('✖ Redis config is not defined in environment variables')
    return
  }
  const isCluster = process.env.REDIS_CLUSTER_HOST && process.env.REDIS_CLUSTER_PORT

  let subscriber: Redis | Cluster
  if (isCluster) {
    subscriber = new Redis.Cluster(
      [
        {
          port: process.env.REDIS_CLUSTER_PORT as unknown as number,
          host: process.env.REDIS_CLUSTER_HOST,
        }
      ],
      {
        redisOptions: {
          password: process.env.REDIS_CLUSTER_PASSWORD,
        }
      }
    )
  } else {
    subscriber = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as unknown as number,
      password: process.env.REDIS_PASSWORD,
    })
  }


  subscriber.on('error', (err) => {
    console.error('✖ Redis subscriber error:', err)
  })

  subscriber.subscribe('cache:invalidate', (err) => {
    if (err) {
      console.error('✖ Redis failed to subscribe to cache:invalidate:', err)
      return
    }
    console.log('✔ Redis subscribed to cache:invalidate channel')
  })

  subscriber.on('message', async (channel, message) => {

    if (channel === 'cache:invalidate') {
      try {
        const { cacheKey } = JSON.parse(message)

        await useStorage("lru-cache").removeItem(cacheKey)
        console.log('✔ Cache invalidated:', cacheKey)
      } catch (error) {
        console.error('✖ Cache invalidation error:', error)
      }
    }
  })

  nitroApp.hooks.hook('close', () => {
    subscriber.quit()
  })
})