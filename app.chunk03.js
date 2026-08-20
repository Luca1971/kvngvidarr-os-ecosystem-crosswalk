ery('os_business_domains', {
        order: ['domain_key', true]
      });
    },
    getMusicAudience: function () {
      return sbQuery('music_audience_measurements', {
        order: ['period_month', true]
      });
    },
    getMusicRetention: function () {
      return sbQuery('music_retention_measurements', {
        order: ['period_month', true]
      });
    },
    getContentAssets: function () {
      return sbQuery('content_assets');
    },
    getMarketingCampaigns: function () {
      return sbQuery('marketing_campaigns');
    },
    getMarketingSpend: function () {
      return sbQuery('marketing_spend');
    },
    getCreativeProjects: function () {
      return sbQuery('creative_projects');
    },
    getLLMCapabilities: function () {
      return sbQuery('llm_capability_registry', {
        order: ['platform', true]
      });
    },
    getLLMMemoryProtocol: function () {
      return sbQuery('llm_memory_operations_protocol', {
        order: ['priority', true]
      });
    },
    getLLMRoutingRules: function () {
      return sbQuery('llm_routing_rules');
    },
    getLLMHandoffRules: function () {
      return sbQuery('llm_handoff_rules');
    },
    getLLMSpecializations: function () {
      return sbQuery('llm_specialization_registry');
    },
    getLLMBootManifest: function () {
      return sbQuery('llm_system_boot_manifest');
    }
  };
}

// Prefer live Supabase when publishable anon key is present; otherwise mock.
const _creds = getSupabaseCredentials();
const PROVIDER = _creds.anonKey ? createSupabaseProvider() : mockProvider();
function StatusPill({
  status,
  children
}) {
  const s = (status || '').toUpperCase();
  let cls = 'pill';
  if (s.includes('VERIFIED') || s === 'ACTIVE' || s === 'SUCCESS') cls += ' verified';else if (s.includes('PROVISIONAL') || s.includes('PENDING') || s === 'OPEN' || s === 'MOCK') cls += ' provisional';else if (s.includes('ERROR') || s.includes('FAILED') || s === 'QUERY_FAILED') cls += ' error';else if (s.includes('EMPTY') || s === 'NOT AVAILABLE') cls += ' empty';else if (s.includes('LIVE')) cls += ' live';else cls += ' info';
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, children || status);
}
function ResultRenderer({
  result,
  emptyLabel = 'EMPTY IN STRUCTURED STATE',
  children
}) {
  if (!result) return /*#__PURE__*/React.createElement("div", {
    className: "alert empty"
  }, "No result");
  if (result.status === 'loading') return /*#__PURE__*/React.createElement("div", {
    className: "alert info"
  }, "Loading\u2026");
  if (result.status === 'error') return /*#__PURE__*/React.createElement("div", {
    className: "alert error"
  }, "QUERY_FAILED \u2014 ", result.error);
  if (result.status === 'empty' || Array.isArray(result.data) && result.data.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "alert empty"
    }, emptyLabel);
  }
  return children(result.data);
}
function formatMoney(amount, currency) {
  if (amount == null) return '\u2014';
  const n = Number(amount);
  if (isNaN(n)) return String(amount);
  const formatted = n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return currency ? `${formatted} ${currency}` : formatted;
}
function CommandCenter({
  provider
}) {
  const inflows = useAsyncResult(() => provider.getInflows());
  const policies = useAsyncResult(() => provider.getAllocationPolicies());
  const gaps = useAsyncResult(() => provider.getGapMonths());
  const capital = useAsyncResult(() => provider.getTradingCapitalState());
  const domains = useAsyncResult(() => provider.getBusinessDomains());
  const music = useAsyncResult(() => provider.getMusicAudience());
  const content = useAsyncResult(() => provider.getContentAssets());
  const marketing = useAsyncResult(() => provider.getMarketingCampaigns());
  const quarterly = useAsyncResult(() => provider.getQuarterlySchedule());
  const verifiedInflowsNgn = useMemo(() => {
    if (inflows.status !== 'success') return null;
    return inflows.data.filter(r => r.converted_currency === 'NGN' && r.status === 'VERIFIED').reduce((s, r) => s + (r.converted_amount || 0), 0);
  }, [inflows]);
  const allocationTotal = useMemo(() => {
    if (policies.status !== 'success') return null;
    return policies.data.reduce((s, p) => s + (Number(p.allocation_pct) || 0), 0);
  }, [policies]);
  const nextGap = gaps.status === 'success' && gaps.data.length ? gaps.data[0] : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-label"
  }, "Verified Inflows (NGN converted only)"), /*#__PURE__*/React.createElement("div", {
    className: "card-value gold"
  }, verifiedInflowsNgn != null ? formatMoney(verifiedInflowsNgn, 'NGN') : '\u2014'), /*#__PURE__*/React.createElement("div", {
    className: "card-sub"
  }, "BMI USD intentionally excluded until conversion verified")), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-label"
  }, "Allocation Policy Total"), /*#__PURE__*/React.createElement("div", {
    className: `card-value ${allocationTotal === 100 ? 'positive' : 'warning'}`
  }, allocationTotal != null ? `${allocationTotal}%` : '\u2014'), /*#__PURE__*/React.createElement("div", {
    className: "card-sub"
  }, allocationTotal === 100 ? 'VALID' : allocationTotal != null ? 'INVALID \u2014 must equal 100%' : '\u2014')), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-label"
  }, "Next Gap Month"), /*#__PURE__*/React.createElement("div", {
    className: "card-value warning"
  }, nextGap ? formatMoney(nextGap.gap_amount, nextGap.required_currency) : '\u2014'), /*#__PURE__*/React.createElement("div", {
    className: "card-sub"
  }, nextGap ? /*#__PURE__*/React.createElement(React.Fragment, null, "Required ", formatMoney(nextGap.required_amount, nextGap.required_currency), " \xB7 Confirmed ", formatMoney(nextGap.confirmed_inflows, nextGap.confirmed_inflows_currency), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(StatusPill, {
    status: nextGap.status
  }, nextGap.status)) : 'No gap record')), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-label"
  }, "Verified Trading Proceeds"), /*#__PURE__*/React.createElement("div", {
    className: "card-value"
  }, "\u2014"), /*#__PURE__*/React.createElement("div", {
    className: "card-sub"
  }, "Only verified funding/proceeds records enter liquidity. Equity \u2260 liquidity."))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Structural Royalty-Cycle Bridge"), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "card-sub",
    style: {
      marginBottom: '0.5rem'
    }
  }, "Royalty sources (BMI, Sentric) operate on independent quarterly cycles. Confirmed receipts are distinct from forecasts. Projected future receipts are never displayed as confirmed."), /*#__PURE__*/React.createElement(ResultRenderer, {
    result: quarterly
  }, rows => /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Month"), /*#__PURE__*/React.createElement("th", null, "Sentric"), /*#__PURE__*/React.createElement("th", null, "BMI"), /*#__PURE__*/React.createElement("th", null, "Gap Month"), /*#__PURE__*/React.createElement("th", null, "Buffer Role"), /*#__PURE__*/React.createElement("th", null, "Trading Role"), /*#__PURE__*/React.createElement("th", null, "Evidence"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id
  }, /*#__PURE__*/React.createElement("td", null, r.month_name), /*#__PURE__*/React.createElement("td", null, r.sentric_distribution ? '\u25CF' : '\u2014'), /*#__PURE__*/React.createElement("td", null, r.bmi_distribution ? '\u25CF' : '\u2014'), /*#__PURE__*/React.create