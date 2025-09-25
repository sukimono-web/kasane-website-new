# Showcase Hotel Kasane Website

archive.orgから取得したHTMLをベースに、Honoを使用して再構築したShowcase Hotel KasaneのWebサイトです。

## 技術スタック

- **フレームワーク**: Hono
- **言語**: TypeScript
- **静的ファイル**: HTML, CSS, JavaScript
- **デプロイ**: Cloudflare Workers / Node.js

## プロジェクト構成

```
project/
├─ src/
│   └─ index.ts        # Honoのルーティング設定
├─ public/
│   ├─ css/            # CSSファイル
│   ├─ js/             # JavaScriptファイル
│   └─ img/            # 画像ファイル（要配置）
└─ views/
    ├─ index.html      # トップページ
    ├─ concept.html    # コンセプトページ
    ├─ room.html       # ルームページ
    ├─ bar.html        # バーページ
    ├─ news.html       # ニュースページ
    └─ contact.html    # お問い合わせページ
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 画像ファイルの配置

`public/img/` ディレクトリに以下の画像ファイルを配置してください：

- `favicon.ico`
- `logo_loading.svg`
- `drawer_logo.svg`
- `logo_white.svg`
- `mv_logo.svg`
- `webmv600.mp4`
- `logo.png`
- `icon_facebook.svg`
- `icon_facebook-white.svg`
- `ogp.jpg`
- `LOG_20210904_master.mp3`

また、以下のディレクトリも作成して画像を配置してください：

- `public/img/concept/` - コンセプトページの画像
- `public/img/room/` - ルームページの画像
- `public/img/products/` - プロダクト画像

### 3. 開発サーバーの起動

```bash
npm run dev
```

サーバーが起動したら、ブラウザで `http://localhost:3000` にアクセスしてください。

## ルーティング

- `/` - トップページ
- `/concept` - コンセプトページ
- `/room` - ルームページ
- `/bar` - バーページ
- `/news` - ニュースページ
- `/contact` - お問い合わせページ

## デプロイ

### Cloudflare Workers

```bash
npm run deploy
```

### Node.js

```bash
npm run build
npm start
```

## 主な機能

- レスポンシブデザイン
- スムーズスクロール
- 画像モーダル
- スライダー（Swiper.js）
- アニメーション（WOW.js）
- お問い合わせフォーム
- BGM機能
- 予約ボタン

## 注意事項

- 画像ファイルは手動で配置する必要があります
- お問い合わせフォームの送信機能は実装されていません（必要に応じて追加してください）
- BGMファイルは著作権に注意してください

## ライセンス

MIT License
