import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";

interface ICoinLocation {
  state: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
function Chart() {
  const { state } = useLocation() as ICoinLocation;
  // console.log(state);
  const coinId = state;
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  // console.log(data);

  return (
    <div>
      Chart
      <h1>{data?.map((price) => price.close)}</h1>
      <ApexCharts
        type="line"
        series={[
          {
            name: "coin",
            data: data?.map((price) => Number(price.close)) as number[],
          },
        ]}
        options={{}}
      />
    </div>
  );
}

export default Chart;
