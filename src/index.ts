import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const app = new Hono()

// デバッグ用ミドルウェア
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  await next()
})

// 静的ファイルの配信（絶対パス指定）
const publicPath = join(process.cwd(), 'public')
console.log('Public path:', publicPath)
console.log('Public directory exists:', existsSync(publicPath))

// 各ディレクトリの存在確認
const cssPath = join(publicPath, 'css')
const jsPath = join(publicPath, 'js')
const imgPath = join(publicPath, 'img')
console.log('CSS directory exists:', existsSync(cssPath))
console.log('JS directory exists:', existsSync(jsPath))
console.log('IMG directory exists:', existsSync(imgPath))

// 静的ファイルの配信設定を削除（手動配信のみ使用）

// 静的ファイルの手動配信
app.get('/css/*', async (c) => {
  const path = c.req.path.replace('/css/', '')
  const filePath = join(publicPath, 'css', path)
  console.log('CSS request:', filePath)
  
  try {
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8')
      return c.text(content, 200, {
        'Content-Type': 'text/css; charset=utf-8'
      })
    } else {
      console.log('CSS file does not exist:', filePath)
      return c.text('CSS file not found: ' + path, 404)
    }
  } catch (error) {
    console.error('Error reading CSS file:', error)
    return c.text('Error reading CSS file', 500)
  }
})

app.get('/js/*', async (c) => {
  const path = c.req.path.replace('/js/', '')
  const filePath = join(publicPath, 'js', path)
  console.log('JS request:', filePath)
  
  try {
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8')
      return c.text(content, 200, {
        'Content-Type': 'application/javascript; charset=utf-8'
      })
    } else {
      console.log('JS file does not exist:', filePath)
      return c.text('JS file not found: ' + path, 404)
    }
  } catch (error) {
    console.error('Error reading JS file:', error)
    return c.text('Error reading JS file', 500)
  }
})

app.get('/img/*', async (c) => {
  const path = c.req.path.replace('/img/', '')
  const filePath = join(publicPath, 'img', path)
  console.log('IMG request:', filePath)
  
  try {
    if (existsSync(filePath)) {
      const content = readFileSync(filePath)
      const ext = path.split('.').pop()?.toLowerCase()
      let contentType = 'application/octet-stream'
      
      if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg'
      else if (ext === 'png') contentType = 'image/png'
      else if (ext === 'gif') contentType = 'image/gif'
      else if (ext === 'svg') contentType = 'image/svg+xml'
      else if (ext === 'webp') contentType = 'image/webp'
      else if (ext === 'mp4') contentType = 'video/mp4'
      else if (ext === 'mp3') contentType = 'audio/mpeg'
      else if (ext === 'ico') contentType = 'image/x-icon'
      
      return new Response(content, {
        headers: {
          'Content-Type': contentType
        }
      })
    } else {
      console.log('Image file does not exist:', filePath)
      return c.text('Image file not found: ' + path, 404)
    }
  } catch (error) {
    console.error('Error reading image file:', error)
    return c.text('Error reading image file', 500)
  }
})

// 404ハンドラー
app.notFound((c) => {
  const url = c.req.url
  console.log('Page not found:', url)
  return c.text('Page not found: ' + url, 404)
})

// ルーティング設定
app.get('/', async (c) => {
  try {
    const html = readFileSync(join(process.cwd(), 'views/index.html'), 'utf-8')
    return c.html(html)
  } catch (error) {
    // views/index.htmlが見つからない場合の仮のページ
    return c.html(`
      <h1>Showcase Hotel KASANE</h1>
      <p>views/index.html ファイルが見つかりません。</p>
      <p>現在開発中です。</p>
    `)
  }
})

app.get('/concept', async (c) => {
  try {
    const html = readFileSync(join(process.cwd(), 'views/concept.html'), 'utf-8')
    return c.html(html)
  } catch (error) {
    return c.html('<h1>Concept - 準備中</h1><a href="/">ホームに戻る</a>')
  }
})

app.get('/room', async (c) => {
  try {
    const html = readFileSync(join(process.cwd(), 'views/room.html'), 'utf-8')
    return c.html(html)
  } catch (error) {
    return c.html('<h1>Room - 準備中</h1><a href="/">ホームに戻る</a>')
  }
})

app.get('/bar', async (c) => {
  try {
    const html = readFileSync(join(process.cwd(), 'views/bar.html'), 'utf-8')
    return c.html(html)
  } catch (error) {
    return c.html('<h1>Bar - 準備中</h1><a href="/">ホームに戻る</a>')
  }
})

app.get('/news', async (c) => {
  try {
    const html = readFileSync(join(process.cwd(), 'views/news.html'), 'utf-8')
    return c.html(html)
  } catch (error) {
    return c.html('<h1>News - 準備中</h1><a href="/">ホームに戻る</a>')
  }
})

app.get('/contact', async (c) => {
  try {
    const html = readFileSync(join(process.cwd(), 'views/contact.html'), 'utf-8')
    return c.html(html)
  } catch (error) {
    return c.html('<h1>Contact - 準備中</h1><a href="/">ホームに戻る</a>')
  }
})

// サーバー起動
const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
