# KVNGVIDARR OS — Ecosystem Crosswalk

Single self-contained HTML application (`index.html`) implementing the Ecosystem Crosswalk dashboard.

**Commit baseline (live provider):** `8327f92ad9012b05fa40c7630a54944ff379a6b5`

## Architecture

```
UI (tabs + components)
 ↓
Domain Data Interface
 ↓
┌─────────────────────┬──────────────────────┐
│ MockProvider        │ SupabaseProvider     │
│ (fallback)          │ (active when key set)│
│ DEVELOPMENT         │ PRODUCTION           │
└─────────────────────┴──────────────────────┘
```

Active selection in `index.html`:

```js
const PROVIDER = _creds.anonKey ? createSupabaseProvider() : mockProvider();
```

## How to run (mock)

Open `index.html` in any modern browser. No build step. Mock data is used when no anon key is present.

## How to activate LIVE Supabase

1. Obtain the **publishable / anon** key from the Supabase project  
   `cywvlgwwsvtftylggehv` → Settings → API → `anon` `public`.
2. **Never** use the `service_role` key in the browser.
3. Before the app script runs, set:

```html
<script>
  window.__SUPABASE_URL__ = 'https://cywvlgwwsvtftylggehv.supabase.co'; // optional, already defaulted
  window.__SUPABASE_ANON_KEY__ = 'YOUR_PUBLISHABLE_ANON_KEY';
</script>
```

4. Open `index.html`. The header should show **LIVE SUPABASE** instead of **DEVELOPMENT / MOCK STATE**.
5. Empty canonical tables must remain **EMPTY IN STRUCTURED STATE**. Failures surface as `QUERY_FAILED (table_name): …` — mock data is not substituted.

### Safe ways to supply the key (do not commit secrets)

- Local: inject the script tag above when opening the file, or use a local-only override HTML that loads the committed `index.html` and sets the key.
- GitHub Pages / static host: use a build-time env injection or a separate non-committed config that is never pushed. The anon key is public-by-design (protected by RLS) but still should not be hard-coded into a committed source file if you prefer rotation hygiene.

## Tables queried by the live provider

| Domain | Table |
|--------|--------|
| Liquidity | `liquidity_source_definitions` |
| Liquidity | `financial_liquidity_allocation_policies` |
| Liquidity | `liquidity_source_classifications` |
| Liquidity | `liquidity_gap_months` |
| Liquidity | `liquidity_quarterly_gap_schedule` |
| Liquidity | `liquidity_inflows` |
| Liquidity | `financial_liquidity_source_cycle_reconciliation` |
| Liquidity | `liquidity_trading_funding_links` |
| Trading | `trading_accounts` |
| Trading | `trading_capital_state` |
| Trading | `trading_execution_events` |
| Trading | `trading_observations` |
| Trading | `trading_validations` |
| Domains | `os_business_domains` |
| Domains | `music_audience_measurements` |
| Domains | `music_retention_measurements` |
| Domains | `content_assets` |
| Domains | `marketing_campaigns` |
| Domains | `marketing_spend` |
| Domains | `creative_projects` |
| LLM OS | `llm_capability_registry` |
| LLM OS | `llm_memory_operations_protocol` |
| LLM OS | `llm_routing_rules` |
| LLM OS | `llm_handoff_rules` |
| LLM OS | `llm_specialization_registry` |
| LLM OS | `llm_system_boot_manifest` |

## Tabs

1. Command Center  
2. Liquidity  
3. Trading  
4. Domains  
5. LLM OS  

## Invariants enforced in UI

- No cross-currency aggregation without verified conversion  
- Equity ≠ liquidity  
- Empty structured state → “EMPTY IN STRUCTURED STATE” (never INACTIVE)  
- Allocation total validated (100% = VALID)  
- Executions ≠ observations ≠ validations  
- DISTRIBUTED_OS_RECONSTRUCTION_INVARIANT surface  

## Security

- Browser uses **only** the publishable/anon key.  
- No service_role key in source or runtime.  
- RLS is not disabled by this application.  
- If a table returns RLS denial, the UI shows `QUERY_FAILED` for that table only.
