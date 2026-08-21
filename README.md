# KVNGVIDARR OS — Ecosystem Crosswalk

Single self-contained HTML application (`index.html`) implementing the Ecosystem Crosswalk dashboard.

**Live provider:** publishable key embedded; status **PENDING_RECONCILIATION**

## Architecture

UI → Domain Data Interface → MockProvider | SupabaseProvider (active when key present)

## Security

- Publishable/anon key only in browser
- No service_role
- RLS not disabled
- Read-only dashboard

See IMPLEMENTATION_REPORT.md.
