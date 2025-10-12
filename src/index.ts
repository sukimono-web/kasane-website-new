import { Hono } from 'hono'

// 型定義
interface Env {
  STRAPI_URL: string
  STRAPI_API_TOKEN: string
  ASSETS?: any
}

const app = new Hono<{ Bindings: Env }>()

// デバッグ用ミドルウェア
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  await next()
})

// HTMLファイルを返すヘルパー関数
async function serveHTML(c: any, filename: string, fallbackContent: string) {
  try {
    // ASSETS経由でファイルを取得
    const response = await c.env.ASSETS.fetch(new URL(filename, c.req.url))
    if (response.ok) {
      const html = await response.text()
      return c.html(html)
    }
    return c.html(fallbackContent)
  } catch (error) {
    console.error(`Error loading ${filename}:`, error)
    return c.html(fallbackContent)
  }
}

// Strapiからニュース記事を取得する関数
async function fetchNews(env: Env, status: 'published' | 'draft' = 'published') {
  const strapiUrl = env.STRAPI_URL || 'http://localhost:1337'
  const token = env.STRAPI_API_TOKEN || ''
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    const url = `${strapiUrl}/api/news?sort=publishedAt:desc&populate=*&publicationState=${status}`
    console.log('Fetching news from:', url)
    
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      throw new Error(`Strapi API Error: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}

// 単一ニュース記事を取得する関数
async function fetchNewsBySlug(env: Env, slug: string) {
  const strapiUrl = env.STRAPI_URL || 'http://localhost:1337'
  const token = env.STRAPI_API_TOKEN || ''
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    const url = `${strapiUrl}/api/news?filters[slug][$eq]=${slug}&populate=*`
    console.log('Fetching news by slug:', url)
    
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      throw new Error(`Strapi API Error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.data?.[0] || null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    throw error
  }
}

// ルーティング設定
app.get('/', async (c) => {
  return serveHTML(c, 'index.html', `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Showcase Hotel KASANE</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
          }
          .header {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 30px;
          }
          h1 { color: #333; margin: 0 0 20px 0; }
          nav a {
            display: inline-block;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
          }
          nav a:hover { background: #0056b3; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🏨 Showcase Hotel KASANE</h1>
          <nav>
            <a href="/concept">コンセプト</a>
            <a href="/room">客室</a>
            <a href="/bar">バー</a>
            <a href="/news">ニュース</a>
            <a href="/contact">お問い合わせ</a>
            <a href="/products">商品</a>
            <a href="/parking">駐車場</a>
          </nav>
        </div>
      </body>
    </html>
  `)
})

app.get('/concept', async (c) => {
  return serveHTML(c, 'concept.html', '<h1>Concept - 準備中</h1><a href="/">ホームに戻る</a>')
})

app.get('/room', async (c) => {
  return serveHTML(c, 'room.html', '<h1>Room - 準備中</h1><a href="/">ホームに戻る</a>')
})

app.get('/bar', async (c) => {
  return serveHTML(c, 'bar.html', '<h1>Bar - 準備中</h1><a href="/">ホームに戻る</a>')
})

app.get('/contact', async (c) => {
  return serveHTML(c, 'contact.html', '<h1>Contact - 準備中</h1><a href="/">ホームに戻る</a>')
})

app.get('/products', async (c) => {
  return serveHTML(c, 'products.html', '<h1>Products - 準備中</h1><a href="/">ホームに戻る</a>')
})

app.get('/parking', async (c) => {
  return serveHTML(c, 'parking.html', '<h1>Parking - 準備中</h1><a href="/">ホームに戻る</a>')
})

// ニュース一覧ページ（Strapi連携）
app.get('/news', async (c) => {
  try {
    const data = await fetchNews(c.env, 'published')
    const newsItems = data.data || []
    
    const newsHtml = newsItems.map((item: any) => {
      const { title, content, publishedAt, slug } = item.attributes
      const date = new Date(publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      
      // コンテンツを150文字に制限
      const excerpt = content ? content.substring(0, 150) + '...' : ''
      
      return `
        <article class="news-item">
          <h2><a href="/news/${slug}">${title}</a></h2>
          <time datetime="${publishedAt}">${date}</time>
          <div class="excerpt">${excerpt}</div>
          <a href="/news/${slug}" class="read-more">続きを読む →</a>
        </article>
      `
    }).join('')
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ニュース一覧 - Showcase Hotel KASANE</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              max-width: 900px;
              margin: 0 auto;
              padding: 20px;
              background: #f8f9fa;
              line-height: 1.6;
            }
            .header {
              background: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              margin-bottom: 30px;
            }
            h1 {
              color: #333;
              margin: 0 0 15px 0;
              font-size: 2em;
            }
            .back-link {
              display: inline-block;
              color: #007bff;
              text-decoration: none;
              font-size: 0.95em;
            }
            .back-link:hover {
              text-decoration: underline;
            }
            .news-item {
              background: white;
              padding: 30px;
              margin-bottom: 20px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              transition: transform 0.2s;
            }
            .news-item:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            }
            .news-item h2 {
              margin: 0 0 10px 0;
              font-size: 1.5em;
            }
            .news-item h2 a {
              color: #333;
              text-decoration: none;
            }
            .news-item h2 a:hover {
              color: #007bff;
            }
            .news-item time {
              color: #666;
              font-size: 0.9em;
              display: block;
              margin-bottom: 15px;
            }
            .news-item .excerpt {
              color: #555;
              margin-bottom: 15px;
            }
            .read-more {
              color: #007bff;
              text-decoration: none;
              font-weight: 500;
              display: inline-block;
            }
            .read-more:hover {
              text-decoration: underline;
            }
            .empty-state {
              text-align: center;
              padding: 60px 20px;
              background: white;
              border-radius: 10px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📰 ニュース一覧</h1>
            <a href="/" class="back-link">← ホームに戻る</a>
          </div>
          
          ${newsItems.length > 0 
            ? newsHtml 
            : '<div class="empty-state"><p>現在、ニュースはありません</p></div>'
          }
        </body>
      </html>
    `)
  } catch (error: any) {
    console.error('News page error:', error)
    return c.html(`
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <title>エラー - ニュース</title>
          <style>
            body {
              font-family: sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
            }
            .error {
              background: #fee;
              border: 2px solid #f88;
              padding: 30px;
              border-radius: 10px;
            }
            h1 { color: #c33; }
            pre {
              background: #f5f5f5;
              padding: 15px;
              border-radius: 5px;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <div class="error">
            <h1>❌ ニュースの取得に失敗しました</h1>
            <p><strong>エラー:</strong> ${error.message}</p>
            <p>以下を確認してください：</p>
            <ul>
              <li>Strapiが起動しているか (http://localhost:1337)</li>
              <li>Newsコンテンツタイプが作成されているか</li>
              <li>API権限が設定されているか (Settings → Roles → Public → News)</li>
              <li>.dev.varsファイルが正しく設定されているか</li>
            </ul>
            <a href="/">← ホームに戻る</a>
          </div>
        </body>
      </html>
    `, 500)
  }
})

// ニュース詳細ページ（Strapi連携）
app.get('/news/:slug', async (c) => {
  const { slug } = c.req.param()
  
  try {
    const article = await fetchNewsBySlug(c.env, slug)
    
    if (!article) {
      return c.html(`
        <!DOCTYPE html>
        <html lang="ja">
          <head>
            <meta charset="UTF-8">
            <title>記事が見つかりません</title>
          </head>
          <body>
            <h1>記事が見つかりません</h1>
            <p>指定された記事は存在しないか、削除されました。</p>
            <a href="/news">← ニュース一覧に戻る</a>
          </body>
        </html>
      `, 404)
    }
    
    const { title, content, publishedAt } = article.attributes
    const date = new Date(publishedAt).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title} - Showcase Hotel KASANE</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background: #f8f9fa;
              line-height: 1.8;
            }
            .article-header {
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              margin-bottom: 30px;
            }
            h1 {
              color: #333;
              margin: 0 0 15px 0;
              font-size: 2em;
            }
            .meta {
              color: #666;
              font-size: 0.95em;
              margin-bottom: 20px;
            }
            .back-link {
              display: inline-block;
              color: #007bff;
              text-decoration: none;
            }
            .back-link:hover {
              text-decoration: underline;
            }
            .article-content {
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              color: #333;
            }
            .article-content p {
              margin-bottom: 1.2em;
            }
          </style>
        </head>
        <body>
          <div class="article-header">
            <h1>${title}</h1>
            <div class="meta">
              <time datetime="${publishedAt}">📅 ${date}</time>
            </div>
            <a href="/news" class="back-link">← ニュース一覧に戻る</a>
          </div>
          
          <article class="article-content">
            ${content || '<p>本文がありません</p>'}
          </article>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="/news" class="back-link">← ニュース一覧に戻る</a>
          </div>
        </body>
      </html>
    `)
  } catch (error: any) {
    console.error('Article detail error:', error)
    return c.html(`
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <title>エラー</title>
        </head>
        <body>
          <h1>エラーが発生しました</h1>
          <p>${error.message}</p>
          <a href="/news">← ニュース一覧に戻る</a>
        </body>
      </html>
    `, 500)
  }
})

// API確認用エンドポイント（JSON）
app.get('/api/news', async (c) => {
  try {
    const data = await fetchNews(c.env, 'published')
    return c.json({
      success: true,
      count: data.data?.length || 0,
      data: data.data
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// 404ハンドラー
app.notFound((c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>404 - ページが見つかりません</title>
        <style>
          body {
            font-family: sans-serif;
            text-align: center;
            padding: 50px;
          }
          h1 { font-size: 3em; color: #ccc; }
        </style>
      </head>
      <body>
        <h1>404</h1>
        <p>ページが見つかりません: ${c.req.url}</p>
        <a href="/">ホームに戻る</a>
      </body>
    </html>
  `, 404)
})

export default app