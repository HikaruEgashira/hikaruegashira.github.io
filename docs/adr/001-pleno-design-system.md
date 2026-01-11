# ADR-001: Pleno Design System

## Status

Accepted

## Context

Pleno Projectの紹介ページを構築するにあたり、既存のPleno製品群（pleno-anonymize、pleno-audit、pleno-transcribe）との統一感を保つデザインシステムが必要。

### Plenoの思想

> Pleno は、足した結果の豊かさではなく、削ったあとに残る充足を名乗る言葉です。
> もう足さなくていい。もう急がなくていい。すでに満ちている。

**コアメッセージ:** Pleno は、足りなさを解決しない。足りている状態を整える。

**ブランドトーン:** 語らない。盛らない。説明しすぎない。しかし欠けていない。

## Decision

### 1. カラーパレット（Vercelスタイル・モノトーン）

```css
/* Light Mode */
--background: #ffffff;
--foreground: #111111;
--primary: #000000;
--primary-foreground: #ffffff;
--secondary: #fafafa;
--secondary-foreground: #111111;
--muted: #999999;
--muted-foreground: #666666;
--border: #eaeaea;

/* Dark Mode */
--background: #0a0a0a;
--foreground: #e5e5e5;
--primary: #ffffff;
--primary-foreground: #000000;
--secondary: #1a1a1a;
--secondary-foreground: #e5e5e5;
--muted: #666666;
--muted-foreground: #a0a0a0;
--border: #333333;
```

**根拠:** pleno-anonymize、pleno-auditと完全に同一のカラーシステム。ミニマルモノトーンはPlenoの「削ったあとに残る充足」という思想と合致。

### 2. タイポグラフィ

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
```

**サイズ体系:**
- Hero見出し: 5xl-7xl (font-weight: normal)
- セクション見出し: 2xl-3xl
- 本文: base-lg
- キャプション: sm

**根拠:** システムフォント優先で高速読み込み。Interは明示的にフォールバックとして指定。

### 3. レイアウト構造

```
Header (固定, backdrop-blur-lg, border-b)
  ↓
HeroSection (max-w-6xl, py-32-40)
  - 見出し（中央揃え、最小限の言葉）
  - サブテキスト（1-2文のみ）
  - プロダクトリンク（カード形式）
  ↓
FeaturesSection (bg-secondary)
  - 3列グリッド (md:2, lg:3)
  - FeatureCard（icon + title + desc）
  ↓
Footer (シンプル、ブランドリンクのみ)
```

### 4. コンポーネント定義

#### Button
```typescript
variant: 'primary' | 'secondary'
size: 'medium' | 'large'

// primary
bg-[#171717] text-white hover:bg-[#333] (light)
bg-[#ededed] text-[#0a0a0a] hover:bg-[#fafafa] (dark)

// secondary
bg-white text-[#171717] border border-[#eaeaea] (light)
bg-[#171717] text-[#ededed] border border-[#333] (dark)
```

#### ProductCard
```typescript
// プロダクト紹介用カード
border: #eaeaea (light) / #333 (dark)
background: #ffffff (light) / #1a1a1a (dark)
border-radius: xl
hover: subtle shadow + scale(1.02)
```

#### FeatureCard
```typescript
icon背景: #fafafa (light) / #2a2a2a (dark)
border-radius: xl
padding: 6
```

### 5. アニメーション

- **ライブラリ:** framer-motion
- **原則:** subtle、minimal、functional
- **エントリ:** fade-up (y: 20 → 0, opacity: 0 → 1)
- **ホバー:** scale 1.02、shadow増加
- **トランジション:** duration 0.3s, ease-out

### 6. スペーシング

6pxグリッドベース:
- xs: 6px (1.5)
- sm: 12px (3)
- md: 24px (6)
- lg: 48px (12)
- xl: 96px (24)

### 7. ダークモード

```css
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* dark mode colors */
  }
}
```

システム設定に追従。`.light`クラスで上書き可能。

### 8. Plenoページ固有の要素

**プロダクト一覧セクション:**
- 各Pleno製品へのリンクカード
- アイコン + 名前 + 一行説明
- GitHub/Website リンク

**思想セクション:**
- 最小限の言葉で思想を伝える
- 大きな余白
- 静謐なトーン

## Consequences

### Positive
- 既存Pleno製品群との完全な視覚的統一
- Plenoの思想（ミニマル、充足）をデザインで体現
- メンテナンス性が高い（共通コンポーネント）
- ダークモード対応

### Negative
- カラフルな要素が使えない制約
- 差別化が難しい（意図的）

### Neutral
- Tailwind CSS v4.0を使用
- 静的HTML/CSS/JSでビルド（React不要）

## References

- `/Users/hikae/ghq/github.com/HikaruEgashira/pleno-anonymize/website/src/index.css`
- `/Users/hikae/ghq/github.com/HikaruEgashira/pleno-audit/app/website/src/index.css`
- Vercel Design System
