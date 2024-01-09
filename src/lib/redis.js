import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://summary-fowl-34182.upstash.io',
  token:
    'AYWGACQgZTYyYWVlMzAtNmViNy00MzUyLTg0ZGUtZTdjMzI5NjkzM2JkNzg0NDVjMWE1OTJlNDhmYzhkNjEyODIyM2M2OWIxNTg',
})

// Create a new ratelimiter, that allows 30 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '10 s'),
  analytics: true,
})
