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