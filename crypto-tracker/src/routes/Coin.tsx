import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";

export const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  /* color: ${(props) => props.theme.accentColor}; */
  color: ${(props) => props.theme.textColor};
`;

const PriceSpan = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const Price24Span = styled.span`
  color: ${(props) => props.theme.accentColor};
`;

const Rank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  border: solid 1px;
  padding: 16px 20px;
  span {
    font-size: 15px;
  }
  p {
    margin-top: 10px;
    font-size: 19px;
  }
`;

const Loader = styled.span`
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 20px;
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  /* background-color: rgba(0, 0, 0, 0.5); */
  border-radius: 5px;
  padding: 10px 20px;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 7px;
    text-transform: uppercase;
  }
`;

const OverViewDes = styled(OverView)`
  background-color: ${props => props.theme.grayDiv};
  /* background-color: red; */
`;

const OverViewItemDes = styled(OverViewItem)`
  justify-content: center;
  align-items: center;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 15px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 500;
  padding: 7px 10px;
  background-color: ${props => props.theme.grayDiv};
  /* background-color: black; */
  border-radius: 10px;
  a {
    display: block;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

interface IStateLocation {
  state: string;
}

interface ITag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

interface ILinkExtended {
  type: string;
  url: string;
}
interface ITeam {
  id: string;
  name: string;
  position: string;
}
interface ICoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  team: ITeam[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: ILinkExtended[];
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  //   console.log(coinId);
  const { state } = useLocation() as IStateLocation;
  // console.log(state);

  const { isLoading: coinLoading, data: coinData } = useQuery<ICoinData>(
    ["info", coinId],
    () => fetchCoinInfo(String(coinId))
  );

  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceInfo>(
    ["priceInfo", coinId],
    () => fetchCoinTickers(String(coinId))
  );
  // console.log(priceData);

  const isLoding = coinLoading && priceLoading;

  // useMatch: 지정된 주소가 있으면 Object 없으면 null
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");

  return (
    <>
      <Container>
        <Header>
          <TitleDiv>
            {/* 시크릿 모드 또는 다이렉트 주소 접속 시 coin name 출력 */}
            <Title>
              {state ? state : isLoding ? "Loding(title)" : coinData?.name}
            </Title>
            <PriceSpan>
              USD
              {priceData?.quotes.USD.price.toFixed(3)}
            </PriceSpan>
            <Price24Span>
              {priceData?.quotes.USD.percent_change_24h}% <span>24hours</span>
            </Price24Span>
          </TitleDiv>
          <Rank>
            <span>Rank</span>
            <p>#{coinData?.rank}</p>
          </Rank>
        </Header>
        {isLoding ? (
          <Loader>Loading..isLoading</Loader>
        ) : (
          <span>{coinData?.name}</span>
        )}
        {isLoding ? (
          <Loader>Loading..isLoading</Loader>
        ) : (
          <>
            <OverView>
              <OverViewItem>
                <span>Symbol</span>
                <span>{coinData?.symbol}</span>
              </OverViewItem>
              <OverViewItem>
                <span>OpenSource</span>
                <span>{coinData?.open_source ? "YES" : "NO"}</span>
              </OverViewItem>
            </OverView>
            <OverViewDes>
              <OverViewItemDes>
                <h3>{coinData?.description}</h3>
              </OverViewItemDes>
            </OverViewDes>
            <OverView>
              <OverViewItem>
                <span>Total Suply</span>
                <span>{priceData?.total_supply}</span>
              </OverViewItem>
              <OverViewItem>
                <span>Max Suply</span>
                <span>{priceData?.max_supply}</span>
              </OverViewItem>
              <OverViewItem>
                <span>Price USD($)</span>
                <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
              </OverViewItem>
            </OverView>

            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`} state={coinId}>
                  Chart
                </Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`} state={coinId}>
                  Price
                </Link>
              </Tab>
            </Tabs>
            <Outlet />
          </>
        )}
      </Container>
    </>
  );
}

export default Coin;
