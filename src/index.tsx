import { Hono } from 'hono'
import { jsx } from 'hono/jsx'


// ページコンポーネントをインポート
import { IndexPage } from './pages'
import { ConceptPage } from './pages/concept'
import { RoomPage } from './pages/room'
import { BarPage } from './pages/bar'
import { ContactPage } from './pages/contact'
import { ProductsPage } from './pages/products'
import { ParkingPage } from './pages/parking'

// 型定義
interface Env {
  STRAPI_URL: string
  STRAPI_API_TOKEN: string
  ENVIRONMENT: string
  ASSETS: { fetch: (url: URL | string) => Promise<Response> }
}

interface NewsItem {
  id: number
  attributes: {
    title: string
    content: string
    publishedAt: string
    slug: string
  }
}

const app = new Hono<{ Bindings: Env }>()

app.get('/css/*', async (c) => {
  const path = c.req.path
  try {
    if (c.env.ASSETS) {
      const response = await c.env.ASSETS.fetch(new URL(path, c.req.url))
      if (response.ok) return response
    }
    // ASSETS が機能しない場合は、直接ファイルパスを返す
    console.log('Trying to serve CSS from path:', path)
    return c.text('Not found', 404)
  } catch (error) {
    console.error('CSS Error:', path, error)
    return c.text('Not found', 404)
  }
})

app.get('/js/*', async (c) => {
  const path = c.req.path
  try {
    const response = await c.env.ASSETS.fetch(new URL(path, c.req.url))
    if (response.ok) return response
    return c.text('Not found', 404)
  } catch (error) {
    console.error('JS Error:', path, error)
    return c.text('Not found', 404)
  }
})

app.get('/img/*', async (c) => {
  const path = c.req.path
  try {
    const response = await c.env.ASSETS.fetch(new URL(path, c.req.url))
    if (response.ok) return response
    return c.text('Not found', 404)
  } catch (error) {
    console.error('IMG Error:', path, error)
    return c.text('Not found', 404)
  }
})

// デバッグ用ミドルウェア
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  await next()
})

// デバッグ用ミドルウェア
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  await next()
})

// Layout コンポーネント
const Layout = ({ title, children }: { title: string; children: any }) => (
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} - Showcase Hotel KASANE</title>
      <link rel="icon" href="/img/favicon.ico" />
      <link rel="stylesheet" href="/css/reset.css" />
      <link rel="stylesheet" href="/css/animate.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <link rel="stylesheet" href="https://unpkg.com/swiper@8.2.2/swiper-bundle.min.css" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
      <script src="https://unpkg.com/swiper@8.2.2/swiper-bundle.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
      <script src="/js/progressbar.min.js"></script>
      <script src="/js/script.js"></script>
    </head>
    <body>
      {children}
    </body>
  </html>
)

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

// トップページ
app.get('/', (c) => c.html(<Layout title="index"><IndexPage /></Layout>))

// ページルーティング
app.get('/concept', (c) => c.html(<Layout title="Concept"><ConceptPage /></Layout>))
app.get('/room', (c) => c.html(<Layout title="Room"><RoomPage /></Layout>))
app.get('/bar', (c) => c.html(<Layout title="Bar"><BarPage /></Layout>))
app.get('/contact', (c) => c.html(<Layout title="Contact"><ContactPage /></Layout>))
app.get('/products', (c) => c.html(<Layout title="Products"><ProductsPage /></Layout>))
app.get('/parking', (c) => c.html(<Layout title="Parking"><ParkingPage /></Layout>))

// ニュース一覧ページ（動的レンダリング）
app.get('/news', async (c) => {
  try {
    const data = await fetchNews(c.env, 'published')
    const newsItems: NewsItem[] = data.data || []

    return c.html(
      <Layout title="ニュース">
        <div style="max-width: 900px; margin: 0 auto; padding: 20px;">
          <h1 style="text-align: center; margin-bottom: 30px;">📰 ニュース一覧</h1>
          <a href="/" style="color: #007bff; text-decoration: none;">← ホームに戻る</a>

          {newsItems.length > 0 ? (
            <div>
              {newsItems.map((item: NewsItem) => {
                const { title, content, publishedAt, slug } = item.attributes
                const date = new Date(publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
                const excerpt = content ? content.substring(0, 150) + '...' : ''

                return (
                  <article key={item.id} style={{
                    background: 'white',
                    padding: '30px',
                    marginBottom: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    <h2>
                      <a href={`/news/${slug}`} style={{ color: '#333', textDecoration: 'none' }}>
                        {title}
                      </a>
                    </h2>
                    <time datetime={publishedAt} style={{ color: '#666', fontSize: '0.9em', display: 'block', marginBottom: '15px' }}>
                      📅 {date}
                    </time>
                    <div style={{ color: '#555', marginBottom: '15px' }}>{excerpt}</div>
                    <a href={`/news/${slug}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                      続きを読む →
                    </a>
                  </article>
                )
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '10px', color: '#666' }}>
              <p>現在、ニュースはありません</p>
            </div>
          )}
        </div>
      </Layout>
    )
  } catch (error: any) {
    console.error('News page error:', error)
    return c.html(
      <Layout title="ニュース">
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', background: '#fee', border: '2px solid #f88', borderRadius: '10px', color: '#c33' }}>
          <h1>❌ ニュースの取得に失敗しました</h1>
          <p>
            <strong>エラー:</strong> {error.message}
          </p>
          <p>以下を確認してください：</p>
          <ul style={{ marginLeft: '20px', marginTop: '15px' }}>
            <li>Strapiが起動しているか (http://localhost:1337)</li>
            <li>Newsコンテンツタイプが作成されているか</li>
            <li>API権限が設定されているか (Settings → Roles → Public → News)</li>
            <li>.dev.varsファイルが正しく設定されているか</li>
          </ul>
          <a href="/">← ホームに戻る</a>
        </div>
      </Layout>
    )
  }
})

// ニュース詳細ページ（動的レンダリング）
app.get('/news/:slug', async (c) => {
  const { slug } = c.req.param()

  try {
    const article = await fetchNewsBySlug(c.env, slug)

    if (!article) {
      return c.html(
        <Layout title="記事が見つかりません">
          <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
            <h1>記事が見つかりません</h1>
            <a href="/news" style={{ color: '#007bff', textDecoration: 'none' }}>
              ← ニュース一覧に戻る
            </a>
          </div>
        </Layout>,
        404
      )
    }

    const { title, content, publishedAt } = article.attributes
    const date = new Date(publishedAt).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return c.html(
      <Layout title={title}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <a href="/news" style={{ color: '#007bff', textDecoration: 'none', display: 'block', marginBottom: '20px' }}>
            ← ニュース一覧に戻る
          </a>

          <article style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h1>{title}</h1>
            <div style={{ color: '#666', fontSize: '0.95em', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
              <time datetime={publishedAt}>📅 {date}</time>
            </div>
            <div style={{ color: '#333', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: content }} />
          </article>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <a href="/news" style={{ color: '#007bff', textDecoration: 'none' }}>
              ← ニュース一覧に戻る
            </a>
          </div>
        </div>
      </Layout>
    )
  } catch (error: any) {
    console.error('Article detail error:', error)
    return c.html(
      <Layout title="エラー">
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', background: '#fee', border: '2px solid #f88', borderRadius: '10px', color: '#c33' }}>
          <h1>エラーが発生しました</h1>
          <p>{error.message}</p>
          <a href="/news">← ニュース一覧に戻る</a>
        </div>
      </Layout>,
      500
    )
  }
})

// API確認用エンドポイント（JSON）
app.get('/api/news', async (c) => {
  try {
    const data = await fetchNews(c.env, 'published')
    return c.json({
      success: true,
      count: data.data?.length || 0,
      data: data.data,
    })
  } catch (error: any) {
    return c.json(
      {
        success: false,
        error: error.message,
      },
      500
    )
  }
})

// 404ハンドラー
app.notFound((c) => {
  return c.html(
    <Layout title="404">
      <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3em', color: '#ccc' }}>404</h1>
        <p>ページが見つかりません: {c.req.url}</p>
        <a href="/">ホームに戻る</a>
      </div>
    </Layout>,
    404
  )
})

export default app