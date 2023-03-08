import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "coins",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            // FIXME 아래 코드 이해불가
            element: (
              <Price
                percent12h={1}
                percent1h={1}
                percent1y={1}
                percent30d={1}
                percent30m={1}
                percent7d={1}
              />
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
