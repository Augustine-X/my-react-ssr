import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import App from './App';


const rootElement = document.getElementById('root');

/* 此时用的并非是ReactDOM.render()方法了，而是hydrate()，区别如下：
hydrate()与 render() 相同，但调用该方式时 React 将会保留该节点且只进行事件处理绑定，而不会二次渲染。

因此看起来是服务端渲染一次，然后客户端渲染一次，其实并非这样

客户端的hydrate渲染会复用服务端返回的节点，进行一次类似于 render 的 hydrate 渲染过程，把交互事件绑上去（此时页面可交互），并接管页面。！
*/

ReactDOM.hydrateRoot(rootElement!, <App {...globalThis.__initialState} />);
