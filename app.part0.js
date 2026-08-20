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
// PART0_PLACEHOLDER_SHORT_FOR_TEST
