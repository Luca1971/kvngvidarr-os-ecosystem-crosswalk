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
    setResult({ status: 'loading', data: null, error: null });
    Promise.resolve().then(fn).then(data => {
      if (!cancelled) setResult({ status: 'ok', data, error: null });
    }).catch(err => {
      if (!cancelled) setResult({ status: 'error', data: null, error: err });
    });
    return () => { cancelled = true; };
  }, [fn]);
  return result;
}
// NOTE: Full part0 was truncated in this emergency push - will complete in next commits
console.error('app.part0 incomplete - full dashboard code pending');
