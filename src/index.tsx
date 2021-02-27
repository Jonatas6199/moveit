import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


//JSX = HTML DENTRO DO JAVASCRIPT
ReactDOM.render(
  //depois que entrou no root, como está na linha 10, ele vai rendereziar esse componente do react <App/>
    <App/>,
  document.getElementById('root')//pega o elemento root e entra dentro dele
);
