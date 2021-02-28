import React from 'react';
import {Button} from './components/button'

//App é um componente do react que cria conteúdo em HTML
function App() {
  return (
    <div>
      <Button color="red">
        Botão 1
      </Button>
      <Button color="green">
        Botão 2
      </Button>
      <Button color="blue">
        Botão 3
      </Button>
    </div>

  );
}

export default App;
