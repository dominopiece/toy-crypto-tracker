import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 5px 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  // vh: Viewport Height)
  height: 15vh;
`;

const Title = styled.h1`
  font-size: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: black;
  color: ${(props) => props.theme.textColor};
  a {
    display: flex;
    padding: 20px;
    align-items: center;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 7px;
  align-items: center;
  justify-content: center;
`;

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
  //   console.log(data);

  return (
    <Container>
      <Header>
        <Title>Coin List</Title>
      </Header>
      {isLoading ? (
        <Title>Loading..</Title>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.rank}>
              <Link to={`/${coin.id}`}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                />
                {coin.rank} {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
