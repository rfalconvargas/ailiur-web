-- =============================================================================
-- 0003 — Seed the Ailiur App Registry
-- =============================================================================
-- The system-level catalog of every Ailiur product. Idempotent: re-running
-- updates existing rows (matched on slug) rather than duplicating. Keep this in
-- sync with src/lib/account/app-registry.ts (the TS mirror used by the UI).
--
-- Apply with `supabase db push`. Requires 0002.
-- =============================================================================

insert into public.app_registry
  (slug, name, category, url, status, description, brand_color, required_permissions, optional_permissions, context_types)
values
  -- ---- Platform / internal --------------------------------------------------
  ('ailiur', 'Ailiur', 'internal', 'https://www.ailiur.com', 'active',
   'The Ailiur main site and Account Center — your canonical identity.',
   'var(--ailiur-yellow)',
   array['profile:read','profile:write'],
   array['context:read'],
   array['profile']),

  ('ucm', 'Unified Context Mesh', 'internal', 'https://ucm.ailiur.com', 'active',
   'The context layer that lets one Ailiur app improve another, with consent.',
   'var(--accent-green)',
   array['profile:read','context:read','context:write'],
   array['app_data:read','app_data:write'],
   array['profile','health_context','learning_context','finance_context','calendar_context']),

  -- ---- Consumer apps --------------------------------------------------------
  ('qetos', 'Qetos', 'consumer', 'https://qetos.ailiur.com', 'active',
   'Metabolic & energy tracking — educational, never diagnostic.',
   'var(--ketofy)',
   array['profile:read','app_data:read','app_data:write'],
   array['health_context:read','calendar_context:read','google_calendar:read'],
   array['health_context','app_data']),

  ('enchiridion', 'Enchiridion', 'consumer', 'https://www.enchiridion.ailiur.com', 'active',
   'Guided learning that adapts to how you actually learn.',
   'var(--enchiridion)',
   array['profile:read','app_data:read','app_data:write'],
   array['learning_context:read','calendar_context:read'],
   array['learning_context','app_data']),

  ('oruvo', 'Oruvo', 'consumer', 'https://oruvo.ailiur.com', 'active',
   'Your life balance sheet — assets, goals, and time ROI. Not investment advice.',
   'var(--accent-green)',
   array['profile:read','app_data:read','app_data:write'],
   array['finance_context:read'],
   array['finance_context','app_data']),

  ('retellum', 'Retellum', 'consumer', 'https://retellum.ailiur.com', 'active',
   'Log-first media memory — your footprint across what you watch and read.',
   'var(--accent-red)',
   array['profile:read','app_data:read','app_data:write'],
   array['context:read'],
   array['media_context','app_data']),

  ('tayzt', 'Tayzt', 'consumer', 'https://tayzt.ailiur.com', 'active',
   'Atmosphere & taste — turn footage into on-brand, taste-aware treatments.',
   'var(--ketofy)',
   array['profile:read','app_data:read','app_data:write'],
   array['context:read'],
   array['creative_context','app_data']),

  ('daymesh', 'Daymesh', 'consumer', 'https://daymesh.ailiur.com', 'active',
   'A biometric camera roll — your days, woven from photos and signals.',
   'var(--accent-green)',
   array['profile:read','app_data:read','app_data:write'],
   array['health_context:read'],
   array['health_context','media_context','app_data']),

  ('tellumetry', 'Tellumetry', 'consumer', 'https://tellumetry.ailiur.com', 'active',
   'Calm agent & project telemetry — signal over noise.',
   'var(--accent-green)',
   array['profile:read','app_data:read','app_data:write'],
   array['context:read'],
   array['project_context','app_data']),

  ('ollune', 'Ollune', 'consumer', 'https://ollune.ailiur.com', 'active',
   'The quiet AI OS layer that sits under everything you do.',
   '#2b2b2b',
   array['profile:read','context:read'],
   array['context:write'],
   array['profile','app_data']),

  ('aptellum', 'Aptellum', 'consumer', 'https://aptellum.ailiur.com', 'active',
   'Language fluency through real-world outreach and feedback.',
   'var(--accent-green)',
   array['profile:read','app_data:read','app_data:write'],
   array['learning_context:read'],
   array['learning_context','app_data']),

  ('iris', 'Iris', 'consumer', 'https://iris.ailiur.com', 'coming_soon',
   'Coming soon.',
   'var(--accent-green)',
   array['profile:read'],
   array['context:read'],
   array['profile']),

  ('civis', 'Civis', 'consumer', 'https://civis.ailiur.com', 'coming_soon',
   'Coming soon.',
   'var(--accent-green)',
   array['profile:read'],
   array['context:read'],
   array['profile']),

  ('glyfra', 'Glyfra', 'consumer', 'https://glyfra.ailiur.com', 'active',
   'Write ugly, ship organized — the paper computer.',
   '#1a1a1a',
   array['profile:read','app_data:read','app_data:write'],
   array['context:read'],
   array['creative_context','app_data']),

  ('lociq', 'Lociq', 'consumer', 'https://lociq.ailiur.com', 'coming_soon',
   'Civic intelligence for where you live.',
   'var(--accent-green)',
   array['profile:read'],
   array['context:read'],
   array['profile']),

  -- ---- Provider / institution / enterprise surfaces -------------------------
  ('qetos-provider', 'Qetos Clinics', 'provider', 'https://qetosclinics.ailiur.com', 'active',
   'Qetos for clinicians and care teams — consented, shared care context.',
   'var(--ketofy)',
   array['profile:read'],
   array['health_context:read'],
   array['health_context']),

  ('enchiridion-institution', 'Enchiridion Schools', 'institution', 'https://enchiridionschools.ailiur.com', 'active',
   'Enchiridion for schools, districts, and educators.',
   'var(--enchiridion)',
   array['profile:read'],
   array['learning_context:read'],
   array['learning_context']),

  ('oruvo-advisors', 'Oruvo Advisors', 'enterprise', 'https://oruvoadvisors.ailiur.com', 'active',
   'A calm, read-only view of a client''s whole picture for advisors.',
   'var(--accent-green)',
   array['profile:read'],
   array['finance_context:read'],
   array['finance_context'])

on conflict (slug) do update set
  name                 = excluded.name,
  category             = excluded.category,
  url                  = excluded.url,
  status               = excluded.status,
  description          = excluded.description,
  brand_color          = excluded.brand_color,
  required_permissions = excluded.required_permissions,
  optional_permissions = excluded.optional_permissions,
  context_types        = excluded.context_types,
  updated_at           = now();

-- ROLLBACK: delete from public.app_registry; (or delete the specific slugs above)
