import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

export const TokenContext = createContext();

export function TokenProvider({ children }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState([]);
  const [token, setToken] = useState();

  const validateToken = useCallback(
    (urlToken) => {
      if (!urlToken) {
        navigate("/not-found");
        return;
      }

      const usedTokens = tokens.filter((firebaseToken) => firebaseToken.used);
      const tokenExists = tokens.find(
        (firebaseToken) => firebaseToken.id === urlToken
      );
      const tokenIsUsed =
        usedTokens.filter((firebaseToken) => firebaseToken.id === urlToken)
          .length > 0;

      if (tokenIsUsed || (!isLoading && !tokenExists)) {
        navigate("/not-found");
        return;
      }

      setToken(tokenExists);
    },
    [isLoading, navigate, tokens]
  );

  const updateTokenAsUsed = useCallback(
    async (urlToken) => {
      if (!urlToken) return;

      setTokens((prevTokens) =>
        prevTokens.map((firebaseToken) => {
          if (firebaseToken.id === urlToken) {
            return {
              ...firebaseToken,
              used: true,
            };
          }
          return firebaseToken;
        })
      );

      navigate("/thanks");
    },
    [navigate]
  );

  const getTokens = useCallback(async () => {
    setTokens();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTokens();
  }, [getTokens]);

  const providerValues = useMemo(
    () => ({
      isLoading,
      token,
      tokens,
      validateToken,
      updateTokenAsUsed,
    }),
    [isLoading, token, tokens, updateTokenAsUsed, validateToken]
  );

  return (
    <TokenContext.Provider value={providerValues}>
      {children}
    </TokenContext.Provider>
  );
}
