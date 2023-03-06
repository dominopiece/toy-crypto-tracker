import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
interface IStateLocation {
  state: string;
}

function Coin() {
  // const { coinId } = useParams();
  //   console.log(coinId);
  const { state } = useLocation() as IStateLocation;
  console.log(state);
  return (
    <Container>
      <Title>{state ? state : <h1>Loading..</h1> }</Title>
    </Container>
  );
}

export default Coin;
