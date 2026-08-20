
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }, {
    id: '2',
    source_key: 'ROYALTY_SENTRIC',
    source_name: 'Sentric',
    liquidity_class: 'ROYALTY',
    income_nature: 'PASSIVE',
    recurrence_model: 'QUARTERLY',
    cash_role: 'DISTRIBUTABLE',
    trading_funding_eligible: false,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }, {
    id: '3',
    source_key: 'SONGWRITING_FEES',
    source_name: 'Songwriting Fees',
    liquidity_class: 'SERVICE',
    income_nature: 'ACTIVE',
    recurrence_model: 'EVENT',
    cash_role: 'DISTRIBUTABLE',
    trading_funding_eligible: true,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }, {
    id: '4',
    source_key: 'TRADING_PROCEEDS',
    source_name: 'Trading Proceeds',
    liquidity_class: 'TRADING',
    income_nature: 'ACTIVE',
    recurrence_model: 'EVENT',
    cash_role: 'RESTRICTED',
    trading_funding_eligible: false,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }],
  allocationPolicies: [{
    id: '1',
    policy_key: 'OPS_RESERVE',
    allocation_pct: 40,
    pool_name: 'Operations Reserve',
    purpose: 'Operating runway',
    trading_funding_allowed: false,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }, {
    id: '2',
    policy_key: 'GROWTH',
    allocation_pct: 30,
    pool_name: 'Growth & Reinvestment',
    purpose: 'Reinvestment into domains',
    trading_funding_allowed: true,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }, {
    id: '3',
    policy_key: 'DISTRIBUTION',
    allocation_pct: 20,
    pool_name: 'Distribution',
    purpose: 'Owner distributions',
    trading_funding_allowed: false,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }, {
    id: '4',
    policy_key: 'BUFFER',
    allocation_pct: 10,
    pool_name: 'Liquidity Buffer',
    purpose: 'Gap-month coverage',
    trading_funding_allowed: false,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }],
  gapMonths: [{
    id: '1',
    month_start: '2026-08-01',
    required_amount: 800000,
    required