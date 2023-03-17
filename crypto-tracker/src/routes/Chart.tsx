import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

export const ChartDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const ChartBox = styled.div`
  /* padding: 40px 40px; */
  width: 500px;
`;
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
  const isDark = useRecoilValue(isDarkAtom);
  const { state } = useLocation() as ICoinLocation;
  // console.log(state);
  const coinId = state;
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  // console.log(data);

  console.log(data?.map((price) => price.close));

  return (
    <>
      {isLoading ? (
        <Title>Loading..</Title>
      ) : (
        <>
          <ChartDiv>
            <Title>Chart no.1</Title>
            <ChartBox>
              <ApexCharts
                type="line"
                series={[
                  {
                    name: "coin",
                    data: data?.map((price) => Number(price.close)) as number[],
                  },
                ]}
                options={{
                  theme: {
                    // mode: "dark",
                    mode: isDark ? "dark" : "light",
                  },
                  chart: {
                    width: 300,
                    height: 500,
                    toolbar: {
                      show: false,
                    },
                    background: "trasparent",
                  },
                  grid: { show: false },
                  stroke: {
                    curve: "smooth",
                    width: 3,
                  },
                  xaxis: {
                    labels: {
                      show: false,
                    },
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: false,
                    },
                    type: "datetime",
                    categories: data?.map((price) =>
                      new Date(price.time_close * 1000).toISOString()
                    ),
                  },
                  yaxis: {
                    labels: {
                      show: false,
                    },
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      gradientToColors: ["white"],
                      stops: [0, 100],
                    },
                  },
                  // 소수점
                  tooltip: {
                    y: {
                      formatter: (value) => `${value.toFixed(2)}`,
                    },
                  },
                  colors: ["pink"],
                }}
              />
            </ChartBox>
          </ChartDiv>
          <ChartDiv>
            <Title>Chart no.2</Title>
            <ChartBox>
              <ApexCharts
                type="candlestick"
                series={
                  [
                    {
                      data: data?.map((price) => {
                        return {
                          x: price.time_close,
                          y: [price.open, price.high, price.low, price.close],
                        };
                      }),
                    },
                  ] as unknown as number[]
                }
                options={{
                  theme: {
                    // mode: "dark",
                    mode: isDark ? "dark" : "light",
                  },
                  chart: {
                    width: 300,
                    height: 500,
                    toolbar: {
                      show: false,
                    },
                    background: "trasparent",
                  },
                  grid: { show: false },
                  stroke: {
                    curve: "smooth",
                    width: 3,
                  },
                  xaxis: {
                    labels: {
                      show: false,
                    },
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: false,
                    },
                    type: "datetime",
                    categories: data?.map((price) =>
                      new Date(price.time_close * 1000).toISOString()
                    ),
                  },
                  yaxis: {
                    labels: {
                      show: false,
                    },
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      gradientToColors: ["white"],
                      stops: [0, 100],
                    },
                  },
                  // 소수점
                  tooltip: {
                    y: {
                      formatter: (value) => `${value.toFixed(2)}`,
                    },
                  },
                  colors: ["pink"],
                }}
              />
            </ChartBox>
          </ChartDiv>
        </>
      )}
    </>
  );
}

export default Chart;
