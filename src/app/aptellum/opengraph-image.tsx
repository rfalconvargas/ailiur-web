import { ImageResponse } from 'next/og';
import { APTELLUM_OG_DESCRIPTION, APTELLUM_OG_TITLE } from '@/lib/aptellum/metadata';

export const alt = APTELLUM_OG_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Aptellum-branded social preview — ivory field, ink type, gold accent. */
export default function AptellumOpenGraphImage() {
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
          background: 'linear-gradient(160deg, #f7f4ee 0%, #efe9df 100%)',
          color: '#0f1218',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#b8956b',
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#5c6470',
            }}
          >
            Aptellum by Ailiur
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 920 }}>
          <div
            style={{
              width: 72,
              height: 4,
              borderRadius: 999,
              background: '#b8956b',
            }}
          />
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            {APTELLUM_OG_TITLE.replace('Aptellum — ', '')}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              color: '#5c6470',
              maxWidth: 820,
            }}
          >
            {APTELLUM_OG_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            color: '#5c6470',
          }}
        >
          <span>ailiur.com/aptellum</span>
          <span>The AI Co-op Studio for Creative Education</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
