import React from 'react';

export default
function Counter(){
  const [num, setNum] = React.useState(100);

  const add = React.useCallback(function(){
    setNum(num+1)
  },[])

  return (
    <div>
      it's a Counter
      <div>{num}</div>
      <button onClick={add}>+</button>
      <button >-</button>
    </div>
  )
}