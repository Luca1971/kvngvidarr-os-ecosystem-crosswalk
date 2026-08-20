false,
    active: true
  }, {
    id: 'r2',
    task_domain: 'LONG_DOCUMENT',
    primary_platform: 'CLAUDE',
    fallback_platforms: ['GROK'],
    routing_reason: 'Long-context strength',
    approval_required: false,
    active: true
  }],
  llmHandoffRules: [{
    id: 'h1',
    from_platform: 'GROK',
    to_platform: 'CLAUDE',
    trigger_condition: 'Context length exceeded',
    handoff_payload: 'SUMMARY + ARTIFACTS',
    active: true
  }],
  llmSpecializationRegistry: [{
    id: 's1',
    platform: 'GROK',
    model_or_family: 'Grok-4',
    role: 'PRIMARY_OPERATOR',
    specialization: 'Real-time tools + code',
    preferred_workloads: ['coding', 'search', 'dashboard'],
    unique_strengths: 'Live tools, truth-seeking',
    limitations: 'Context on massive single files',
    evidence_status: 'VERIFIED-CALLABLE',
    last_verified_at: '2026-08-19'
  }, {
    id: 's2',
    platform: 'CLAUDE',
    model_or_family: 'Claude-3.5/4',
    role: 'ANALYST',
    specialization: 'Deep analysis & long context',
    preferred_workloads: ['document analysis', 'policy'],
    unique_strengths: 'Nuance, long context',
    limitations: 'No native live tools in this setup',
    evidence_status: 'VERIFIED-AVAILABLE',
    last_verified_at: '2026-08-15'
  }],
  llmBootManifest: [{
    key: 'canonical_authority.human',
    value: 'administrative authority',
    version: '1.0',
    authority: 'SYSTEM',
    active: true
  }, {
    key: 'canonical_authority.supabase',
    value: 'structured state',
    version: '1.0',
    authority: 'SYSTEM',
    active: true
  }, {
    key: 'canonical_authority.google_drive',
    value: 'structural knowledge',
    version: '1.0',
    authority: 'SYSTEM',
    active: true
  }, {
    key: 'capability_evidence.model',
    value: 'VERIFIED-CALLABLE | VERIFIED-AVAILABLE | UNVERIFIED | NOT AVAILABLE',
    version: '1.0',
    authority: 'SYSTEM',
    active: true
  }, {
    key: 'security.least_privilege',
    value: 'true',
    version: '1.0',
    authority: 'SYSTEM',
    active: true
  }, {
    key: 'security.bootstrap_no_permissions',
    value: 'true',
    version: '1.0',
    authority: 'SYSTEM',
    active: true
  }, {
    key: 'node_boot.sequence',
    value: 'connect → identify → read manifest → read architecture/rules/state → inventory tools → test capabilities → record evidence → derive operating profile → determine routing eligibility → report readiness',
    version: '1.0',
    authority: 'SYSTEM',
    active: true
  }, {
    key: 'blind_spot.llm_get_boot_contract',
    value: 'Does not query llm_memory_operations_protocol — reconstruction invariant may be invisible to newly admitted nodes. PROVISIONAL/OPEN.',
    version: '1.0',
    authority: 'SYSTEM',
    active: true
  }]
};
function mockProvider() {
  const wrap = key => {
    const data = MOCK[key];
    if (!data) return createEmptyResult();
    if (Array.isArray(data) && data.length === 0) return createEmptyResult();
    return createSuccess(data);
  };
  return {
    name: 'MockProvider',
    isMock: true,
    getLiquiditySources: () => wrap('liquiditySources'),
    getAllocationPolicies: () => wrap('allocationPolicies'),
    getSourceClassifications: () => wrap('sourceClassifications'),
    getGapMonths: () => wrap('gapMonths'),
    getQuarterlySchedule: () => wrap('quarterlySchedule'),
    getInflows: () => wrap('inflows'),
    getCycleReconciliation: () => wrap('cycleReconciliation'),
    getTradingAccounts: () => wrap('tradingAccounts'),
    getTradingCapitalState: () => wrap('tradingCapitalState'),
    getTradingExecutions: () => wrap('tradingExecutions'),
    getTradingObservations: () => wrap('tradingObservations'),
    getTradingValidations: () => wrap('tradingValidations'),
    getBusinessDomains: () => wrap('businessDomains'),
    getMusicAudience: () => wrap('musicAudience'),
    getMusicRetention: () => wrap('musicRetention'),
    getContentAssets: () => wrap('contentAssets'),
    getMarketingCampaigns: () => wrap('marketingCampaigns'),
    getMarketingSpend: () => wrap('marketingSpend'),
    getCreativeProjects: () => wrap('creativeProjects'),
    getLLMCapabilities: () => wrap('llmCapabilityRegistry'),
    getLLMMemoryProtocol: () => wrap('llmMemoryProtocol'),
    getLLMRoutingRules: () => wrap('llmRoutingRules'),
    getLLMHandoffRules: () => wrap('llmHandoffRules'),
    getLLMSpecializations: () => wrap('llmSpecializationRegistry'),
    getLLMBootManifest: () => wrap('llmBootManifest')
  };
}

// ============================================================
// LIVE SUPABASE PROVIDER
// ============================================================
// Browser-safe only. Uses publishable/anon key.
// Set window.__SUPABASE_ANON_KEY__ before load (or inject below).
// URL defaults to the canonical project.

const SUPABASE_URL_DEFAULT = 'https://cywvlgwwsvtftylggehv.supabase.co';
function getSupabaseCredentials() {
  const url = typeof window !== 'undefined' && window.__SUPABASE_URL__ || SUPABASE_URL_DEFAULT;
  const anonKey = typeof window !== 'undefined' && window.__SUPABASE_ANON_KEY__ || '';
  return {
    url,
    anonKey
  };
}
function createSupabaseClient() {
  const {
    url,
    anonKey
  } = getSupabaseCredentials();
  if (!anonKey) return null;
  if (typeof supabase === 'undefined' || !supabase.createClient) return null;
  return supabase.createClient(url, anonKey);
}
async function sbQuery(table, opts) {
  opts = opts || {};
  const client = createSupabaseClient();
  if (!client) {
    return createError('SUPABASE_ANON_KEY_MISSING — set window.__SUPABASE_ANON_KEY__ to the publishable anon key');
  }
  try {
    let q = client.from(table).select(opts.select || '*');
    if (opts.order) {
      const col = Array.isArray(opts.order) ? opts.order[0] : opts.order;
      const ascending = Array.isArray(opts.order) ? opts.order[1] !== false : true;
      q = q.order(col, {
        ascending: ascending
      });
    }
    if (opts.limit) q = q.limit(opts.limit);
    const result = await q;
    if (result.error) {
      return createError('QUERY_FAILED (' + table + '): ' + (result.error.message || result.error.code || String(result.error)));
    }
    const data = result.data;
    if (!data || Array.isArray(data) && data.length === 0) {
      return createEmptyResult();
    }
    return createSuccess(data);
  } catch (e) {
    return createError('QUERY_FAILED (' + table + '): ' + (e.message || String(e)));
  }
}
function createSupabaseProvider() {
  return {
    name: 'SupabaseProvider',
    isMock: false,
    getLiquiditySources: function () {
      return sbQuery('liquidity_source_definitions', {
        order: ['source_key', true]
      });
    },
    getAllocationPolicies: function () {
      return sbQuery('financial_liquidity_allocation_policies', {
        order: ['policy_key', true]
      });
    },
    getSourceClassifications: function () {
      return sbQuery('liquidity_source_classifications', {
        order: ['source_key', true]
      });
    },
    getGapMonths: function () {
      return sbQuery('liquidity_gap_months', {
        order: ['month_start', false]
      });
    },
    getQuarterlySchedule: function () {
      return sbQuery('liquidity_quarterly_gap_schedule', {
        order: ['calendar_month', true]
      });
    },
    getInflows: function () {
      return sbQuery('liquidity_inflows', {
        order: ['received_at', false]
      });
    },
    getCycleReconciliation: function () {
      return sbQuery('financial_liquidity_source_cycle_reconciliation', {
        order: ['source_key', true]
      });
    },
    getTradingFundingLinks: function () {
      return sbQuery('liquidity_trading_funding_links');
    },
    getTradingAccounts: function () {
      return sbQuery('trading_accounts', {
        order: ['created_at', false]
      });
    },
    getTradingCapitalState: function () {
      return sbQuery('trading_capital_state', {
        order: ['measured_at', false],
        limit: 20
      });
    },
    getTradingExecutions: function () {
      return sbQuery('trading_execution_events', {
        order: ['trading_date', false],
        limit: 50
      });
    },
    getTradingObservations: function () {
      return sbQuery('trading_observations', {
        order: ['created_at', false]
      });
    },
    getTradingValidations: function () {
      return sbQuery('trading_validations', {
        order: ['created_at', false]
      });
    },
    getBusinessDomains: function () {
      return sbQu