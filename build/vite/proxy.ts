const httpsRE = /^https:\/\//

type Proxy = Record<string, any>

export function createProxy(proxyJson: Proxy) {
  const res: Proxy = {}
  for (const key of Object.keys(proxyJson)) {
    const isHttps = httpsRE.test(proxyJson[key])
    res[key] = {
      target: proxyJson[key],
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${key}`), ''),
      ...(isHttps ? { secure: false } : {})
    }
  }
  return res
}
