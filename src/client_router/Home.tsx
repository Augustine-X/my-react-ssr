
import React from 'react';
import logo from '../resource/react_logo192.png';
import { useNavigate } from "react-router-dom";

export default
function Home(props) {
  const navigate = useNavigate();

  const goCounter = function(){
    // 这种直接改是会发请求的
    // window.location.href = '/counter';

    // 要用 react-router 的方法，不会发请求
    navigate('/counter');
  }


  /*
    项目中的图片资源有两种使用方式
      1. css
      2. img 标签
      
      这里说下 第二种用发会产生的问题，及解决方式。

      下面这种写法，src中直接写【字符串】，在webpack 打包的时候，无法正确的将媒体资源打包进去。
        <img src='../resource/logo.svg' />
      因为此时，这个「JS文件」对目标「媒体文件」没有任何的引用关联。
      所以，webpack 在打包时，就认为这个「媒体文件」是从未被使用的无关文件，不应该被打包进去。

      改为：
        import logo from '../resource/logo.svg';
        <img src={logo} />

      此时，ts 飘红，但是webpack打包是能成功的。
          Type '() => Element' is not assignable to type 'string'

      改成这样依旧报错
        <img src={logo as string} />

        Conversion of type '() => Element' to type 'string' may be a mistake 
        because neither type sufficiently overlaps with the other. 
        If this was intentional, convert the expression to 'unknown' first.

      按照提示，最终改成下面形式
        <img src={logo as unknown as string} />

  */
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            props.userList.map((name, index)=>{
              return (
                <p key={index} >username:{name}</p>
              )
            })
          }
        </header>
        <br />
        <button onClick={goCounter}> go Counter</button>
      </div>
    );
}
