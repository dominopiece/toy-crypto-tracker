import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { isDarkAtom } from "./atoms";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
}
`;

const Nav = styled.div`
  display: flex;
  justify-content: left;
`;

const BtnToHome = styled.button`
  /* color: white; */
  color: ${(props) => props.theme.textColor};
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  font-size: 18px;
  :hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 55px;
  color: ${(props) => props.theme.textColor};
  height: 25vh;
`;

const Button = styled.button`
  display: block;
  padding: 10px 15px;
  font-size: 15px;
  border-radius: 15px;
  /* background-color: ${(props) => props.theme.textColor}; */
  /* background-color: ${(props) => props.theme.cardBgColor}h; */
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.5);
  }
`;

function Root() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);
  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Nav>
          <BtnToHome>
            <Link to={"/"}>😼 home</Link>
          </BtnToHome>
          <BtnToHome>
            <Link to={"/coins"}> 📆 Coin-list</Link>
          </BtnToHome>
          <Button onClick={toggleDark}>Toggle Mode</Button>
        </Nav>
        <>
          <Title>Cryto tracker</Title>
        </>
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default Root;
