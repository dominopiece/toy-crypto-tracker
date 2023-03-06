import { useParams } from "react-router-dom";

function Coin() {
  const { coinId } = useParams();
//   console.log(coinId);
  return (
    <div>
      <h1>Coin</h1>
    </div>
  );
}

export default Coin;
