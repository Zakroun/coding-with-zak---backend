// api/home.js
module.exports = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>codingwithzak — API</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0a0a0a;
            --surface: #111111;
            --border: #1f1f1f;
            --border-light: #2a2a2a;
            --text-primary: #f0f0f0;
            --text-secondary: #888888;
            --text-muted: #444444;
            --accent: #ffffff;
            --mono: 'IBM Plex Mono', monospace;
            --sans: 'DM Sans', sans-serif;
        }

        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html, body {
            height: 100%;
        }

        body {
            background-color: var(--bg);
            color: var(--text-primary);
            font-family: var(--sans);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
        }

        /* Subtle grid background */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image:
                linear-gradient(var(--border) 1px, transparent 1px),
                linear-gradient(90deg, var(--border) 1px, transparent 1px);
            background-size: 60px 60px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 0;
        }

        /* ── HEADER ── */
        header {
            position: relative;
            z-index: 10;
            border-bottom: 1px solid var(--border-light);
            padding: 20px 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            animation: fadeDown 0.6s ease both;
        }

        .logo {
            font-family: var(--mono);
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            letter-spacing: 0.04em;
        }

        .logo span {
            color: var(--text-muted);
        }

        .status-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--mono);
            font-size: 11px;
            color: var(--text-secondary);
            letter-spacing: 0.06em;
            text-transform: uppercase;
        }

        .status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #4ade80;
            box-shadow: 0 0 8px #4ade8088;
            animation: pulse 2s infinite;
        }

        /* ── HERO ── */
        .hero {
            position: relative;
            z-index: 10;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 40px;
            text-align: center;
        }

        .hero-label {
            font-family: var(--mono);
            font-size: 11px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 24px;
            animation: fadeUp 0.6s 0.1s ease both;
        }

        .hero-title {
            font-family: var(--mono);
            font-size: clamp(36px, 6vw, 64px);
            font-weight: 600;
            color: var(--text-primary);
            line-height: 1.1;
            letter-spacing: -0.02em;
            margin-bottom: 20px;
            animation: fadeUp 0.6s 0.2s ease both;
        }

        .hero-title em {
            font-style: normal;
            color: var(--text-secondary);
        }

        .hero-sub {
            font-size: 15px;
            font-weight: 300;
            color: var(--text-secondary);
            max-width: 420px;
            line-height: 1.7;
            margin-bottom: 56px;
            animation: fadeUp 0.6s 0.3s ease both;
        }

        /* ── ROUTE CARD ── */
        .routes {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
            max-width: 560px;
            animation: fadeUp 0.6s 0.4s ease both;
        }

        .route-card {
            background: var(--surface);
            border: 1px solid var(--border-light);
            border-radius: 6px;
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 20px;
            text-align: left;
            transition: border-color 0.2s, background 0.2s;
            cursor: default;
        }

        .route-card:hover {
            border-color: #3a3a3a;
            background: #161616;
        }

        .method-tag {
            font-family: var(--mono);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.08em;
            padding: 4px 10px;
            border-radius: 3px;
            background: #1a1a1a;
            border: 1px solid #2f2f2f;
            color: #d4d4d4;
            flex-shrink: 0;
            min-width: 52px;
            text-align: center;
        }

        .method-tag.post {
            color: #fbbf24;
            border-color: #3d2e0a;
            background: #1c1500;
        }

        .route-info {
            flex: 1;
        }

        .route-path {
            font-family: var(--mono);
            font-size: 13px;
            color: var(--text-primary);
            margin-bottom: 4px;
        }

        .route-desc {
            font-size: 12px;
            color: var(--text-muted);
        }

        .route-arrow {
            color: var(--text-muted);
            font-size: 16px;
            flex-shrink: 0;
            transition: color 0.2s, transform 0.2s;
        }

        .route-card:hover .route-arrow {
            color: var(--text-secondary);
            transform: translateX(3px);
        }

        /* ── FOOTER ── */
        footer {
            position: relative;
            z-index: 10;
            border-top: 1px solid var(--border);
            padding: 20px 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            animation: fadeUp 0.6s 0.5s ease both;
        }

        .footer-left {
            font-family: var(--mono);
            font-size: 11px;
            color: var(--text-muted);
            letter-spacing: 0.04em;
        }

        .footer-right {
            font-family: var(--mono);
            font-size: 11px;
            color: var(--text-muted);
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.4; }
        }

        @media (max-width: 560px) {
            header, footer { padding: 16px 20px; }
            .hero { padding: 60px 20px; }
            .route-card { padding: 16px 18px; gap: 14px; }
        }
    </style>
</head>
<body>

    <header>
        <div class="logo">coding<span>with</span>zak</div>
        <div class="status-badge">
            <span class="status-dot"></span>
            operational
        </div>
    </header>

    <main class="hero">
        <p class="hero-label">REST API · v1.0</p>
        <h1 class="hero-title">codingwithzak <em>API</em></h1>
        <p class="hero-sub">A minimal API powering the codingwithzak platform. Use the endpoints below to interact with available services.</p>

        <div class="routes">
            <div class="route-card">
                <span class="method-tag post">POST</span>
                <div class="route-info">
                    <div class="route-path">/api/contact</div>
                    <div class="route-desc">Send an email via the contact form</div>
                </div>
                <span class="route-arrow">→</span>
            </div>
        </div>
    </main>

    <footer>
        <span class="footer-left">© ${new Date().getFullYear()} codingwithzak</span>
        <span class="footer-right">api.codingwithzak.dev</span>
    </footer>

</body>
</html>
    `);
};