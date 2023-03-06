import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: black;
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
  background-color: gray;
`;

const OverViewItemDes = styled(OverViewItem)`
  justify-content: center;
  align-items: center;
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

  return (
    <>
      <Container>
        <Header>
          <Title>{state ? state : <h1>Loading..</h1>}</Title>
        </Header>
        <OverView>
          <OverViewItem>
            <span>Rank</span>
            <span>{coinData?.rank}</span>
          </OverViewItem>
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
      </Container>
    </>
  );
}

export default Coin;
