import { ImageResponse } from 'next/og';

export const alt = 'Ailiur — AI-first outcome engines for a better human life';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Home social preview — Ailiur's bright-yellow field, ink type, green accent. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(150deg, #ffd60a 0%, #ffe873 100%)',
          color: '#1a1505',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#1fa85c' }} />
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#5a4d0a',
            }}
          >
            Ailiur · AI-first outcome engines
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 960 }}>
          <div style={{ width: 80, height: 5, borderRadius: 999, background: '#1fa85c' }} />
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.03em' }}>
            Outcome engines for a better human life.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: '#5a4d0a', maxWidth: 880 }}>
            Learning · Health · Creativity · Personal intelligence · Work — connected by one private
            Context Mesh.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#5a4d0a',
          }}
        >
          <span>ailiur.com</span>
          <span>Qetos · Enchiridion · Oruvo · Tayzt · Tellumetry</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
