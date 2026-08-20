# KVNGVIDARR OS — Ecosystem Crosswalk

## Deliverable

Single self-contained HTML application (`index.html`) implementing the Ecosystem Crosswalk dashboard.

## How to run

Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

No build step, no server, no backend required for the mock provider.

## Architecture

```
UI (tabs + components)
 ↓
Domain Data Interface (getLiquiditySources, getTradingCapitalState, …)
 ↓
┌─────────────────────┬──────────────────────┐
│ MockProvider        │ SupabaseProvider     │
│ (active by default) │ (stub ready)         │
│ DEVELOPMENT         │ PRODUCTION (later)   │
└─────────────────────┴──────────────────────┘
```

- Presentation layer never imports table names or raw fetch logic.
- Mock provider supplies the 2026-08-20 snapshot reference data.
- Supabase provider maps to the verified table names and is ready for `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (or `window.__SUPABASE_URL__` / `window.__SUPABASE_ANON_KEY__`).

## Tabs preserved

1. Command Center
2. Liquidity
3. Trading
4. Domains
5. LLM OS

## Visual system

- Near-black background, warm off-white text, gold accent
- Space Grotesk + JetBrains Mono
- Status pills (VERIFIED / PROVISIONAL / EMPTY / ERROR / MOCK)
- Responsive cards + horizontally scrollable tables

## Key invariants enforced in UI

- No cross-currency aggregation without verified conversion (BMI USD excluded from NGN totals)
- Equity ≠ liquidity
- Empty structured state shown as “EMPTY IN STRUCTURED STATE”, never “INACTIVE”
- Allocation total validated (100% = VALID, otherwise INVALID)
- Trading executions ≠ observations ≠ validations
- LLM capability evidence states: VERIFIED-CALLABLE / VERIFIED-AVAILABLE / UNVERIFIED / NOT AVAILABLE
- DISTRIBUTED_OS_RECONSTRUCTION_INVARIANT surface
- Known baseline defect (boot contract blind spot on memory protocol) rendered as PROVISIONAL/OPEN

## Swapping to live Supabase

1. Replace `const PROVIDER = mockProvider();` with a configured `createSupabaseProvider({ url, anonKey })`.
2. Implement the real `supabase-js` queries inside the provider methods (table names already mapped).
3. Never place service_role or secrets in the frontend.

## Validation checklist (mock)

- All five tabs render
- Mock data populates every important panel
- Empty content/marketing states display correctly
- Allocation shows VALID 100%
- Gap month shows PROVISIONAL_GAP with correct NGN figures
- Trading capital, executions, observations, validations distinct
- LLM protocol + boot manifest + blind-spot warning present
- Responsive layout works on narrow viewports
