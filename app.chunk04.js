eact.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("td", null, r.month_name), /*#__PURE__*/React.createElement("td", null, r.sentric_distribution ? '\u25CF' : '\u2014'), /*#__PURE__*/React.createElement("td", null, r.bmi_distribution ? '\u25CF' : '\u2014'), /*#__PURE__*/React.createElement("td", null, r.royalty_gap_month ? 'GAP' : '\u2014'), /*#__PURE__*/React.createElement("td", null, r.buffer_role), /*#__PURE__*/React.createElement("td", null, r.trading_role), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: r.evidence
  }, r.evidence)))))))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Ecosystem Activity Snapshot"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-label"
  }, "Business Domains"), /*#__PURE__*/React.createElement(ResultRenderer, {
    result: domains,
    emptyLabel: "EMPTY IN STRUCTURED STATE"
  }, rows => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "card-value"
  }, rows.length), /*#__PURE__*/React.createElement("div", {
    className: "card-sub"
  }, rows.map(d => d.name).join(' \xB7 '))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-label"
  }, "Music Audience (latest)"), /*#__PURE__*/React.createElement(ResultRenderer, {
    result: music,
    emptyLabel: "EMPTY IN STRUCTURED STATE"
  }, rows => {
    const latest = rows[rows.length - 1];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "card-value"
    }, latest.monthly_listeners), /*#__PURE__*/React.createElement("div", {
      className: "card-sub"
    }, "Monthly listeners \xB7 ", latest.period_month, " \xB7 Active ", latest.active_listeners));
  })), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-label"
  }, "Content / Marketing"), /*#__PURE__*/React.createElement("div", {
    className: "card-value muted"
  }, "\u2014"), /*#__PURE__*/React.createElement("div", {
    className: "card-sub"
  }, "Content: EMPTY IN STRUCTURED STATE", /*#__PURE__*/React.createElement("br", null), "Marketing: EMPTY IN STRUCTURED STATE")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Data Integrity / Failed Queries"), /*#__PURE__*/React.createElement("div", {
    className: "alert info"
  }, "No QUERY_FAILED conditions in current provider responses."), /*#__PURE__*/React.createElement("div", {
    className: "invariant-box",
    style: {
      marginTop: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "DISTRIBUTED_OS_RECONSTRUCTION_INVARIANT"), /*#__PURE__*/React.createElement("br", null), "Supabase = canonical structured-state layer. Google Drive = structural knowledge. Operational Prep = moving knowledge. Structural Prep = durable verified knowledge. Absence from one layer does not prove absence from the OS.")));
}
function LiquidityTab({
  provider
}) {
  const sources = useAsyncResult(() => provider.getLiquiditySources());
  const classifications = useAsyncResult(() => provider.getSourceClassifications());
  const policies = useAsyncResult(() => provider.getAllocationPolicies());
  const gaps = useAsyncResult(() => provider.getGapMonths());
  const inflows = useAsyncResult(() => provider.getInflows());
  const recon = useAsyncResult(() => provider.getCycleReconciliation());
  const allocTotal = policies.status === 'success' ? policies.data.reduce((s, p) => s + (Number(p.allocation_pct) || 0), 0) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Architecture: SOURCE \u2192 COMMON LIQUIDITY POOL \u2192 ALLOCATION"), /*#__PURE__*/React.createElement("div", {
    className: "alert info"
  }, "Confirmed receipts \u2260 forecasts. Projected future receipts are never shown as confirmed. Equity is never treated as liquidity. Allocation must total 100% or be marked INVALID.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Liquidity Sources"), /*#__PURE__*/React.createElement(ResultRenderer, {
    result: sources
  }, rows => /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Source Key"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Provenance"), /*#__PURE__*/React.createElement("th", null, "Cycle Independence"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id
  }, /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, r.source_key), /*#__PURE__*/React.createElement("td", null, r.source_name), /*#__PURE__*/React.createElement("td", null, r.source_type), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: r.status
  }, r.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: r.provenance
  }, r.provenance)), /*#__PURE__*/React.createElement("td", null, r.cycle_independence ? 'Yes' : 'No')))))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Source Classification"), /*#__PURE__*/React.createElement(ResultRenderer, {
    result: classifications
  }, rows => /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.