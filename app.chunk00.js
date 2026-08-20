const {
  useState,
  useMemo,
  useEffect
} = React;
function useAsyncResult(fn) {
  const [result, setResult] = useState({
    status: 'loading',
    data: null,
    error: null
  });
  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => fn()).then(r => {
      if (!cancelled) setResult(r);
    }).catch(e => {
      if (!cancelled) setResult(createError(e.message || String(e)));
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return result;
}
const createEmptyResult = () => ({
  status: 'empty',
  data: null,
  error: null
});
const createSuccess = data => ({
  status: 'success',
  data,
  error: null
});
const createError = msg => ({
  status: 'error',
  data: null,
  error: msg
});
const MOCK = {
  liquiditySources: [{
    id: '1',
    source_key: 'ROYALTY_BMI',
    source_type: 'ROYALTY',
    source_name: 'BMI',
    description: 'BMI royalty distributions',
    cycle_independence: true,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }, {
    id: '2',
    source_key: 'ROYALTY_SENTRIC',
    source_type: 'ROYALTY',
    source_name: 'Sentric',
    description: 'Sentric royalty distributions',
    cycle_independence: true,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }, {
    id: '3',
    source_key: 'SONGWRITING_FEES',
    source_type: 'FEE',
    source_name: 'Songwriting Fees',
    description: 'Direct songwriting fees',
    cycle_independence: true,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }, {
    id: '4',
    source_key: 'TRADING_PROCEEDS',
    source_type: 'TRADING',
    source_name: 'Trading Proceeds',
    description: 'Verified trading proceeds only',
    cycle_independence: true,
    status: 'ACTIVE',
    provenance: 'VERIFIED'
  }],
  sourceClassifications: [{
    id: '1',
    source_key: 'ROYALTY_BMI',
    source_name: 'BMI',
    liquidity_class: 'ROYALTY',
    income_nature: 'PASSIVE',
    recurrence_model: 'QUARTERLY',
    cash_role: 'DISTRIBUTABLE',
    trading_funding_eligible: false,
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
    required_currency: 'NGN',
    confirmed_inflows: 342773.12,
    confirmed_inflows_currency: 'NGN',
    trading_required_amount: 457226.88,
    trading_required_currency: 'NGN',
    gap_amount: 457226.88,
    status: 'PROVISIONAL_GAP',
    provenance: 'OPERATIONAL'
  }],
  quarterlySchedule: [{
    id: '1',
    calendar_month: 1,
    month_name: 'January',
    sentric_distribution: false,
    bmi_distribution: false,
    royalty_gap_month: true,
    buffer_role: 'PRIMARY',
    trading_role: 'SECONDARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '2',
    calendar_month: 2,
    month_name: 'February',
    sentric_distribution: true,
    bmi_distribution: false,
    royalty_gap_month: false,
    buffer_role: 'SUPPORT',
    trading_role: 'PRIMARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '3',
    calendar_month: 3,
    month_name: 'March',
    sentric_distribution: false,
    bmi_distribution: true,
    royalty_gap_month: false,
    buffer_role: 'SUPPORT',
    trading_role: 'PRIMARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '4',
    calendar_month: 4,
    month_name: 'April',
    sentric_distribution: false,
    bmi_distribution: false,
    royalty_gap_month: true,
    buffer_role: 'PRIMARY',
    trading_role: 'SECONDARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '5',
    calendar_month: 5,
    month_name: 'May',
    sentric_distribution: true,
    bmi_distribution: false,
    royalty_gap_month: false,
    buffer_role: 'SUPPORT',
    trading_role: 'PRIMARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '6',
    calendar_month: 6,
    month_name: 'June',
    sentric_distribution: false,
    bmi_distribution: true,
    royalty_gap_month: false,
    buffer_role: 'SUPPORT',
    trading_role: 'PRIMARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '7',
    calendar_month: 7,
    month_name: 'July',
    sentric_distribution: false,
    bmi_distribution: false,
    royalty_gap_month: true,
    buffer_role: 'PRIMARY',
    trading_role: 'SECONDARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '8',
    calendar_month: 8,
    month_name: 'August',
    sentric_distribution: true,
    bmi_distribution: false,
    royalty_gap_month: false,
    buffer_role: 'SUPPORT',
    trading_role: 'PRIMARY',
    evidence: 'CURRENT',
    status: 'ACTIVE'
  }, {
    id: '9',
    calendar_month: 9,
    month_name: 'September',
    sentric_distribution: false,
    bmi_distribution: true,
    royalty_gap_month: false,
    buffer_role: 'SUPPORT',
    trading_role: 'PRIMARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '10',
    calendar_month: 10,
    month_name: 'October',
    sentric_distribution: false,
    bmi_distribution: false,
    royalty_gap_month: true,
    buffer_role: 'PRIMARY',
    trading_role: 'SECONDARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '11',
    calendar_month: 11,
    month_name: 'November',
    sentric_distribution: true,
    bmi_distribution: false,
    royalty_gap_month: false,
    buffer_role: 'SUPPORT',
    trading_role: 'PRIMARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }, {
    id: '12',
    calendar_month: 12,
    month_name: 'December',
    sentric_distribution: false,
    bmi_distribution: true,
    royalty_gap_month: false,
    buffer_role: 'SUPPORT',
    trading_role: 'PRIMARY',
    evidence: 'HISTORICAL',
    status: 'ACTIVE'
  }],
  inflows: [{
    id: '1',
    source_type: 'ROYALTY',
    source_name: 'BMI',
    cycle_label: '2026-Q2',
    received_at: '2026-07-15',
    gross_amount: 83.72,
    gross_currency: 'USD',
    fees_amount: 2.00,
    net_amount: 81.72,
    net_currency: 'USD',
    conversion_rate: null,
    converted_amount: null,
    converted_currency: null,
    status: 'VERIFIED',
    notes: 'Conversion intentionally unset pending verified rate',
    provenance: 'VERIFIED'
  }, {
    id: '2',
    source_type: 'ROYALTY',
    source_name: 'Sentric',
    cycle_label: '2026-Q2',
    received_at: '2026-07-20',
    gross_amount: 52.63,
    gross_currency: 'GBP',
    fees_amount: 2.00,
    net_amount: 50.63,
    net_currency: 'GBP',
    conversion_rate: 1851.02,
    converted_amount: 92773.12,
    converted_currency: 'NGN',
    status: 'VERIFIED',
    notes: 'Verified conversion applied',
    provenance: 'VERIFIED'
  }, {
    id: '3',
    source_type: 'FEE',
    source_name: 'Songwriting Fees',
    cycle_label: '20