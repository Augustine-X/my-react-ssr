import React from "react";
import styled from 'styled-components';
import react_logo from "../resource/react_logo192.png";
type InitialData = any[];



const Input = styled.input<{ $inputColor?: string; }>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.$inputColor || "#BF4F74"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;


export default 
function App({ initialData = [] }: {initialData:InitialData})  {
  // 这就是反例，浏览器会报错
  let random = Math.floor(Math.random()*3);
  let userName = initialData[random];

  const log = React.useCallback(() => {
      console.log(`Hello ${userName}`);
  }, []);

  console.log('更新');
  return (
      <div>
          <p>react ssr demo</p>
          <img src={react_logo} alt="" />
          <p>{userName}</p>
          <button onClick={log}>Click me</button>
          <Input placeholder="#placeholder" defaultValue="@geelen" type="text" $inputColor="rebeccapurple" />
      </div>
  );
};





