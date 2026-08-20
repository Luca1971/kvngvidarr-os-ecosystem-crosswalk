t Manifest"), /*#__PURE__*/React.createElement(ResultRenderer, {
    result: boot
  }, rows => /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Key"), /*#__PURE__*/React.createElement("th", null, "Value"), /*#__PURE__*/React.createElement("th", null, "Version"), /*#__PURE__*/React.createElement("th", null, "Authority"), /*#__PURE__*/React.createElement("th", null, "Active"))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, r.key), /*#__PURE__*/React.createElement("td", {
    style: {
      maxWidth: '420px',
      whiteSpace: 'normal'
    }
  }, r.value), /*#__PURE__*/React.createElement("td", null, r.version), /*#__PURE__*/React.createElement("td", null, r.authority), /*#__PURE__*/React.createElement("td", null, r.active ? 'Yes' : 'No')))))))));
}
function App() {
  const [tab, setTab] = useState('command');
  const provider = PROVIDER;
  const tabs = [{
    id: 'command',
    label: 'Command Center'
  }, {
    id: 'liquidity',
    label: 'Liquidity'
  }, {
    id: 'trading',
    label: 'Trading'
  }, {
    id: 'domains',
    label: 'Domains'
  }, {
    id: 'llm',
    label: 'LLM OS'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "app-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-mark"
  }, "KV"), /*#__PURE__*/React.createElement("div", {
    className: "brand-text"
  }, /*#__PURE__*/React.createElement("h1", null, "KVNGVIDARR OS"), /*#__PURE__*/React.createElement("p", null, "Ecosystem Crosswalk"))), /*#__PURE__*/React.createElement("div", {
    className: "status-bar"
  }, provider.isMock ? /*#__PURE__*/React.createElement(StatusPill, {
    status: "MOCK"
  }, "DEVELOPMENT / MOCK STATE") : /*#__PURE__*/React.createElement(StatusPill, {
    status: "LIVE"
  }, "LIVE SUPABASE"), /*#__PURE__*/React.createElement(StatusPill, {
    status: "info"
  }, "Provider: ", provider.name), /*#__PURE__*/React.createElement(StatusPill, {
    status: "info"
  }, "Schema: VERIFIED"))), /*#__PURE__*/React.createElement("nav", {
    className: "tabs"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: tab === t.id ? 'active' : '',
    onClick: () => setTab(t.id)
  }, t.label))), /*#__PURE__*/React.createElement("main", null, tab === 'command' && /*#__PURE__*/React.createElement(CommandCenter, {
    provider: provider
  }), tab === 'liquidity' && /*#__PURE__*/React.createElement(LiquidityTab, {
    provider: provider
  }), tab === 'trading' && /*#__PURE__*/React.createElement(TradingTab, {
    provider: provider
  }), tab === 'domains' && /*#__PURE__*/React.createElement(DomainsTab, {
    provider: provider
  }), tab === 'llm' && /*#__PURE__*/React.createElement(LLMTab, {
    provider: provider
  })), /*#__PURE__*/React.createElement("footer", null, "KVNGVIDARR OS · Ecosystem Crosswalk · Backend-independent UI · Mock → Supabase swap without presentation rebuild · Snapshot reference 2026-08-20 · Provenance-aware · No currency aggregation without verified conversion · Equity ≠ Liquidity"));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
  