import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";

interface ICoinListShape {
  id: "btc-bitcoin";
  name: "Bitcoin";
  symbol: "BTC";
  rank: 1;
  is_new: false;
  is_active: true;
  type: "coin";
}

function Coins() {
  //   useEffect(() => {
  //     (async () => {
  //       const response = await (
  //         await fetch(`https://api.coinpaprika.com/v1/coins`)
  //       ).json();
  //     //   console.log(response);
  //     })();
  //   }, []);

  const { isLoading, data } = useQuery<ICoinListShape[]>(
    "coinList",
    fetchCoins
  );
  console.log(data);

  return (
    <>
      <h1>Coins</h1>
      <li>{data?.slice(0, 100).map((coin) => coin.name)}</li>
    </>
  );
}

export default Coins;
