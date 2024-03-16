type Env = {
  KV: KVNamespace
  DISCORD_WEBHOOK_URL: string
}

const sites = [
  {
    title: 'Paimon+',
    url: 'https://paimon.plus',
    description: 'Beta Access Key',
    icon: '/maskable_icon_x128.png',
  },
  {
    title: 'AI Paint',
    url: 'https://ai-paint.luis.fun',
    description: 'No Ads Key',
    icon: '/favicon.png',
  },
]

const task = async (env: Env) => {
  // create new key
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const N = 16
  const key = [...Array(N)].map(() => S[Math.floor(Math.random() * S.length)]).join('')
  await env.KV.put('key', key)
  // create message
  const message = {
    embeds: sites.map(site => ({
      color: 1667583,
      title: site.title + ' :key:',
      url: site.url + '/?auth=' + key,
      description: site.description,
      thumbnail: {
        url: site.url + site.icon,
      },
    })),
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
