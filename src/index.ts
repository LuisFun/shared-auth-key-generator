type Env = {
  KV: KVNamespace
  DISCORD_WEBHOOK_URL: string
}

const task = async (env: Env) => {
	// create new key
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const N = 16
  const key = [...Array(N)].map(() => S[Math.floor(Math.random() * S.length)]).join('')
  await env.KV.put('key', key)
	// create message
  const message = {
    content: '@here',
    embeds: [
      {
        color: 1667583,
        title: 'Paimon+ :key:',
        url: 'https://paimon.plus/?auth=' + key,
        description: 'Monthly Update',
        thumbnail: {
          url: 'https://paimon.plus/maskable_icon_x128.png',
        },
      },
      {
        color: 1667583,
        title: 'Image Generator :key:',
        url: 'https://image-generator.luis.fun/?auth=' + key,
        description: 'Monthly Update',
        thumbnail: {
          url: 'https://image-generator.luis.fun/favicon.png',
        },
      },
    ],
  }
	// send message
  await fetch(env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
}

export default {
  async scheduled(controller: any, env: Env, ctx: any) {
    ctx.waitUntil(task(env))
  },
}
