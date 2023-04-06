import './style.scss';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// pages
import Main from './routes/Main';
import Editor from './routes/Editor/Editor';
import Minuta from './routes/Minuta/Minuta';


function App() {

  const [data, setData] = useState({
    tipo: "tabela",
    produtora: {
      string: '43717567000196',
      empresa: {
        nome: 'joao cu',
        cep: '',
        email: ''
      }
    },
    solicitante: "",
    job: "",
    observacao: "obs lindo",
    valor: {
      tabela: 3,
      valorHora: 52,
      minimoDeHoras: 11
    },
    diarias: [
      {
        id: '1',
        inicio: "2022-08-21T10:00",
        horas: 15,
        ocorrencia: "Retirada",
        valor: 520,
        adicional: [
          {
            ocorrencia: 'Almoço',
            valor: 28
          },
          {
            ocorrencia: 'Janta',
            valor: 30
          }
        ]
      },
      {
        id: '2',
        inicio: "2022-08-21T10:00",
        horas: 15,
        ocorrencia: "Montagem2",
        valor: 520,
        adicional: []
      }
    ]
  });
  const navigate = useNavigate();

  const openNavigation = {
    home: () => { 
      navigate('/');
    },
    editor: {
      new: () => {
        const newId = Math.random().toString(36).slice(8);
        navigate(`./editor/new/${newId}`);
      },
      edit: (id) => {
        navigate(`./editor/edit/${id}`);
      },
    },
    minuta: () => {
      navigate('./minuta');
    }
  }

  return (
    <>
      <Routes>
        <Route
          path='/*'
          element={(
            <>
              <Main 
                data={data}
                setData={setData} 
                openNavigation={openNavigation}
              />
              <Routes>
                <Route 
                  path='/editor/:editorMode/:usedItemId'
                  element={(
                    <Editor
                      openNavigation={openNavigation}
                      data={data}
                      setData={setData}
                    />
                  )} 
                />
              </Routes>
            </>
          )}
        />
        <Route 
          path='/minuta'
          element={
            <Minuta 
              data={data}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
