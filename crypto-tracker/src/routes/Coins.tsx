import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

const Container = styled.div`
  max-width: 680px;
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

const CoinList = styled.div`
  display: grid;
  justify-items: center;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
`;

const Coin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  border-radius: 15px;
  margin-bottom: 5px;
  background-color: black;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.textColor};
  a {
    display: flex;
    padding: 20px;
    align-items: center;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.5);
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;

const Paging = styled.div`
  padding: 50px 50px;
`;

const PageList = styled.ul`
  display: flex;
  justify-content: center;
`;

const Page = styled.li<{ isActive: boolean }>`
  background-color: black;
  margin: 0 20px;
  font-size: 20px;
  a {
    display: block;
    padding: 15px 20px;
  }
  &:hover{
    color: ${props => props.theme.accentColor};
  }
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
  const { isLoading, data } = useQuery<ICoinListShape[]>(
    "coinList",
    fetchCoins
  );
  //   console.log(data);
  const homeMatch = useMatch("/");
  const page1Match = useMatch("/pages/1");
  const page2Match = useMatch("/pages/2");
  const homeList = [true, false, false];
  return (
    <Container>
      <Header>
        <Title>Coin List</Title>
      </Header>
      {isLoading ? (
        <Title>Loading..</Title>
      ) : (
        <>
          <>
            <CoinList>
              {data?.slice(0, 33).map((coin) => (
                <Coin key={coin.rank}>
                  <Link to={`/${coin.id}`} state={coin.name}>
                    <Img
                      src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                    />
                    {coin.name}
                  </Link>
                </Coin>
              ))}
            </CoinList>
            <Paging>
              <PageList>
                {["1", "2", "3"].map((page) => (
                  <Page key={page} isActive={homeList[+page - 1]}>
                    <Link to={`/pages/${page}`}>{page}</Link>
                  </Page>
                ))}
              </PageList>
            </Paging>
          </>
          <>
          {/* TODO: 페이지 */}
          <Routes>
            <Route>

            </Route>
          </Routes>
          </>
        </>

      )}
    </Container>
  );
}

export default Coins;
