import React from 'react';
import { ExperienceBar } from './components/ExperienceBar';
import './styles/global.css';
//dentro do react sempre importar as coisas no App.tsx e não no index.html, é um pattern do react

//App é um componente do react que cria conteúdo em HTML
function App() {
  return (
    <div className="container">
      <ExperienceBar></ExperienceBar>
    </div>

  );
}

export default App;
