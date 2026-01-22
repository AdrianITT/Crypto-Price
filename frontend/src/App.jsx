import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    setError(null);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/prices/", {
        params: { ids: "bitcoin,ethereum", vs: "usd" },
        timeout: 8000,
      });
      setPrices(res.data);
    } catch (e) {
      setError({
        message: e.message,
        status: e?.response?.status ?? null,
        data: e?.response?.data ?? null,
      });
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Crypto-Price</h1>

      <button onClick={load}>Refrescar</button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {prices && <pre>{JSON.stringify(prices, null, 2)}</pre>}
    </div>
  );
}
