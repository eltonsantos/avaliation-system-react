import { useLocation } from "react-router-dom";

export function useToken() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
