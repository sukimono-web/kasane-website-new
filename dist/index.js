import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { Hono } from 'hono';
// ページコンポーネントをインポート
import { IndexPage } from './pages';
import { ConceptPage } from './pages/concept';
import { RoomPage } from './pages/room';
import { BarPage } from './pages/bar';
import { ContactPage } from './pages/contact';
import { ProductsPage } from './pages/products';
import { ParkingPage } from './pages/parking';
const app = new Hono();
app.get('/css/*', async (c) => {
    const path = c.req.path;
    try {
        if (c.env.ASSETS) {
            const response = await c.env.ASSETS.fetch(new URL(path, c.req.url));
            if (response.ok)
                return response;
        }
        // ASSETS が機能しない場合は、直接ファイルパスを返す
        console.log('Trying to serve CSS from path:', path);
        return c.text('Not found', 404);
    }
    catch (error) {
        console.error('CSS Error:', path, error);
        return c.text('Not found', 404);
    }
});
app.get('/js/*', async (c) => {
    const path = c.req.path;
    try {
        const response = await c.env.ASSETS.fetch(new URL(path, c.req.url));
        if (response.ok)
            return response;
        return c.text('Not found', 404);
    }
    catch (error) {
        console.error('JS Error:', path, error);
        return c.text('Not found', 404);
    }
});
app.get('/img/*', async (c) => {
    const path = c.req.path;
    try {
        const response = await c.env.ASSETS.fetch(new URL(path, c.req.url));
        if (response.ok)
            return response;
        return c.text('Not found', 404);
    }
    catch (error) {
        console.error('IMG Error:', path, error);
        return c.text('Not found', 404);
    }
});
// デバッグ用ミドルウェア
app.use('*', async (c, next) => {
    console.log(`${c.req.method} ${c.req.url}`);
    await next();
});
// デバッグ用ミドルウェア
app.use('*', async (c, next) => {
    console.log(`${c.req.method} ${c.req.url}`);
    await next();
});
// Layout コンポーネント
const Layout = ({ title, children }) => (_jsxs("html", { lang: "ja", children: [_jsxs("head", { children: [_jsx("meta", { charset: "UTF-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }), _jsxs("title", { children: [title, " - Showcase Hotel KASANE"] }), _jsx("link", { rel: "icon", href: "/img/favicon.ico" }), _jsx("link", { rel: "stylesheet", href: "/css/reset.css" }), _jsx("link", { rel: "stylesheet", href: "/css/animate.css" }), _jsx("link", { rel: "stylesheet", href: "/css/style.css" }), _jsx("link", { rel: "stylesheet", href: "https://unpkg.com/swiper@8.2.2/swiper-bundle.min.css" }), _jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com" }), _jsx("link", { href: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap", rel: "stylesheet" }), _jsx("script", { src: "https://code.jquery.com/jquery-3.6.0.js" }), _jsx("script", { src: "https://unpkg.com/swiper@8.2.2/swiper-bundle.min.js" }), _jsx("script", { src: "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js" }), _jsx("script", { src: "/js/progressbar.min.js" }), _jsx("script", { src: "/js/script.js" })] }), _jsx("body", { children: children })] }));
// Strapiからニュース記事を取得する関数
async function fetchNews(env, status = 'published') {
    const strapiUrl = env.STRAPI_URL || 'http://localhost:1337';
    const token = env.STRAPI_API_TOKEN || '';
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const url = `${strapiUrl}/api/news?sort=publishedAt:desc&populate=*&publicationState=${status}`;
        console.log('Fetching news from:', url);
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`Strapi API Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}
// 単一ニュース記事を取得する関数
async function fetchNewsBySlug(env, slug) {
    const strapiUrl = env.STRAPI_URL || 'http://localhost:1337';
    const token = env.STRAPI_API_TOKEN || '';
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const url = `${strapiUrl}/api/news?filters[slug][$eq]=${slug}&populate=*`;
        console.log('Fetching news by slug:', url);
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`Strapi API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data.data?.[0] || null;
    }
    catch (error) {
        console.error('Error fetching news by slug:', error);
        throw error;
    }
}
// トップページ
app.get('/', (c) => c.html(_jsx(Layout, { title: "index", children: _jsx(IndexPage, {}) })));
// ページルーティング
app.get('/concept', (c) => c.html(_jsx(Layout, { title: "Concept", children: _jsx(ConceptPage, {}) })));
app.get('/room', (c) => c.html(_jsx(Layout, { title: "Room", children: _jsx(RoomPage, {}) })));
app.get('/bar', (c) => c.html(_jsx(Layout, { title: "Bar", children: _jsx(BarPage, {}) })));
app.get('/contact', (c) => c.html(_jsx(Layout, { title: "Contact", children: _jsx(ContactPage, {}) })));
app.get('/products', (c) => c.html(_jsx(Layout, { title: "Products", children: _jsx(ProductsPage, {}) })));
app.get('/parking', (c) => c.html(_jsx(Layout, { title: "Parking", children: _jsx(ParkingPage, {}) })));
// ニュース一覧ページ（動的レンダリング）
app.get('/news', async (c) => {
    try {
        const data = await fetchNews(c.env, 'published');
        const newsItems = data.data || [];
        return c.html(_jsx(Layout, { title: "\u30CB\u30E5\u30FC\u30B9", children: _jsxs("div", { style: "max-width: 900px; margin: 0 auto; padding: 20px;", children: [_jsx("h1", { style: "text-align: center; margin-bottom: 30px;", children: "\uD83D\uDCF0 \u30CB\u30E5\u30FC\u30B9\u4E00\u89A7" }), _jsx("a", { href: "/", style: "color: #007bff; text-decoration: none;", children: "\u2190 \u30DB\u30FC\u30E0\u306B\u623B\u308B" }), newsItems.length > 0 ? (_jsx("div", { children: newsItems.map((item) => {
                            const { title, content, publishedAt, slug } = item.attributes;
                            const date = new Date(publishedAt).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            });
                            const excerpt = content ? content.substring(0, 150) + '...' : '';
                            return (_jsxs("article", { style: {
                                    background: 'white',
                                    padding: '30px',
                                    marginBottom: '20px',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                }, children: [_jsx("h2", { children: _jsx("a", { href: `/news/${slug}`, style: { color: '#333', textDecoration: 'none' }, children: title }) }), _jsxs("time", { datetime: publishedAt, style: { color: '#666', fontSize: '0.9em', display: 'block', marginBottom: '15px' }, children: ["\uD83D\uDCC5 ", date] }), _jsx("div", { style: { color: '#555', marginBottom: '15px' }, children: excerpt }), _jsx("a", { href: `/news/${slug}`, style: { color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }, children: "\u7D9A\u304D\u3092\u8AAD\u3080 \u2192" })] }, item.id));
                        }) })) : (_jsx("div", { style: { textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '10px', color: '#666' }, children: _jsx("p", { children: "\u73FE\u5728\u3001\u30CB\u30E5\u30FC\u30B9\u306F\u3042\u308A\u307E\u305B\u3093" }) }))] }) }));
    }
    catch (error) {
        console.error('News page error:', error);
        return c.html(_jsx(Layout, { title: "\u30CB\u30E5\u30FC\u30B9", children: _jsxs("div", { style: { maxWidth: '800px', margin: '50px auto', padding: '20px', background: '#fee', border: '2px solid #f88', borderRadius: '10px', color: '#c33' }, children: [_jsx("h1", { children: "\u274C \u30CB\u30E5\u30FC\u30B9\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F" }), _jsxs("p", { children: [_jsx("strong", { children: "\u30A8\u30E9\u30FC:" }), " ", error.message] }), _jsx("p", { children: "\u4EE5\u4E0B\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\uFF1A" }), _jsxs("ul", { style: { marginLeft: '20px', marginTop: '15px' }, children: [_jsx("li", { children: "Strapi\u304C\u8D77\u52D5\u3057\u3066\u3044\u308B\u304B (http://localhost:1337)" }), _jsx("li", { children: "News\u30B3\u30F3\u30C6\u30F3\u30C4\u30BF\u30A4\u30D7\u304C\u4F5C\u6210\u3055\u308C\u3066\u3044\u308B\u304B" }), _jsx("li", { children: "API\u6A29\u9650\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u308B\u304B (Settings \u2192 Roles \u2192 Public \u2192 News)" }), _jsx("li", { children: ".dev.vars\u30D5\u30A1\u30A4\u30EB\u304C\u6B63\u3057\u304F\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u308B\u304B" })] }), _jsx("a", { href: "/", children: "\u2190 \u30DB\u30FC\u30E0\u306B\u623B\u308B" })] }) }));
    }
});
// ニュース詳細ページ（動的レンダリング）
app.get('/news/:slug', async (c) => {
    const { slug } = c.req.param();
    try {
        const article = await fetchNewsBySlug(c.env, slug);
        if (!article) {
            return c.html(_jsx(Layout, { title: "\u8A18\u4E8B\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093", children: _jsxs("div", { style: { maxWidth: '800px', margin: '50px auto', padding: '20px' }, children: [_jsx("h1", { children: "\u8A18\u4E8B\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093" }), _jsx("a", { href: "/news", style: { color: '#007bff', textDecoration: 'none' }, children: "\u2190 \u30CB\u30E5\u30FC\u30B9\u4E00\u89A7\u306B\u623B\u308B" })] }) }), 404);
        }
        const { title, content, publishedAt } = article.attributes;
        const date = new Date(publishedAt).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return c.html(_jsx(Layout, { title: title, children: _jsxs("div", { style: { maxWidth: '800px', margin: '0 auto', padding: '20px' }, children: [_jsx("a", { href: "/news", style: { color: '#007bff', textDecoration: 'none', display: 'block', marginBottom: '20px' }, children: "\u2190 \u30CB\u30E5\u30FC\u30B9\u4E00\u89A7\u306B\u623B\u308B" }), _jsxs("article", { style: { background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }, children: [_jsx("h1", { children: title }), _jsx("div", { style: { color: '#666', fontSize: '0.95em', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }, children: _jsxs("time", { datetime: publishedAt, children: ["\uD83D\uDCC5 ", date] }) }), _jsx("div", { style: { color: '#333', lineHeight: '1.8' }, dangerouslySetInnerHTML: { __html: content } })] }), _jsx("div", { style: { marginTop: '30px', textAlign: 'center' }, children: _jsx("a", { href: "/news", style: { color: '#007bff', textDecoration: 'none' }, children: "\u2190 \u30CB\u30E5\u30FC\u30B9\u4E00\u89A7\u306B\u623B\u308B" }) })] }) }));
    }
    catch (error) {
        console.error('Article detail error:', error);
        return c.html(_jsx(Layout, { title: "\u30A8\u30E9\u30FC", children: _jsxs("div", { style: { maxWidth: '800px', margin: '50px auto', padding: '20px', background: '#fee', border: '2px solid #f88', borderRadius: '10px', color: '#c33' }, children: [_jsx("h1", { children: "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F" }), _jsx("p", { children: error.message }), _jsx("a", { href: "/news", children: "\u2190 \u30CB\u30E5\u30FC\u30B9\u4E00\u89A7\u306B\u623B\u308B" })] }) }), 500);
    }
});
// API確認用エンドポイント（JSON）
app.get('/api/news', async (c) => {
    try {
        const data = await fetchNews(c.env, 'published');
        return c.json({
            success: true,
            count: data.data?.length || 0,
            data: data.data,
        });
    }
    catch (error) {
        return c.json({
            success: false,
            error: error.message,
        }, 500);
    }
});
// 404ハンドラー
app.notFound((c) => {
    return c.html(_jsx(Layout, { title: "404", children: _jsxs("div", { style: { maxWidth: '800px', margin: '50px auto', padding: '20px', textAlign: 'center' }, children: [_jsx("h1", { style: { fontSize: '3em', color: '#ccc' }, children: "404" }), _jsxs("p", { children: ["\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093: ", c.req.url] }), _jsx("a", { href: "/", children: "\u30DB\u30FC\u30E0\u306B\u623B\u308B" })] }) }), 404);
});
export default app;
