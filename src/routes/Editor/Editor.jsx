import moment from "moment";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import Termino from "./components/Termino";
import Valor from "../../components/Valor";
import Cobranca from "./components/Adicional";

import { Inputs, Input } from "../../components/Input/Input";

// datas
import Valores from "../../Valores";

const Editor = ({
  data,
  setData,
  openNavigation
}) => {

  const { editorMode, usedItemId } = useParams();

  // Temporary Data
  const [ diarie, setDiarie ] = useState(() => {

    if( editorMode === 'edit' ){ // this script will get an object diarie
      const getData = data.diarias.find(( item ) => item.id === usedItemId);
      const detectExistenceOfData = getData ? true : false;
    
      if( detectExistenceOfData ){
        return getData;
      }else{
        openNavigation.home();
        return null;
      };

    }else if( editorMode === 'new' ){ // when the editor is in 'new' mode this script will create a new object for that day
      const initialHours = () => {
        if( data.tipo === 'tabela' ){
          return Valores.find(table => table.id === data.valor.tabela).valores[0].horas;
        }else if ( data.tipo === 'corrida' ){
          return data.valor.minimoDeHoras
        }
      };

      return ({
        id: (usedItemId),
        inicio: (moment().format('YYYY-MM-DDT07:00')),
        horas: (initialHours()),
        adicional: []
      });

    };

  });


    // functions

    const editorCloseAnimation = () => {
      const animation = () => {
        document.querySelector('.editor').style = 'top; 100%';
        document.querySelector('.home').style = '';
        document.body.style = 'background-color: #f2f1f6;';
      };

      animation();
      openNavigation.home();
    }

    const handleStart = ( event ) => {
      const value = event.target.value;
      const date = moment(value).format();

      if (date !== 'Invalid date') {
        setDiarie(( values ) => ({...values, inicio: value }))
      }
    };
    const handleInputs = ( event ) => {
      const value = event.target.value;
      const type = event.target.name;

      setDiarie(( values ) => ({...values, [type]: (type === 'valor' ? Number(value) : value) }));
    };

    const saveDiarie = () => {
      if( editorMode === 'edit' ){
        const getIndex = data.diarias.map(value => value.id === diarie.id ? diarie : value)
        setData(( values ) => ({
          ...values,
          diarias: getIndex
        }))
      }else if ( editorMode === 'new' ){
        setData(( values ) => ({
         ...values,
         diarias: [...values.diarias, diarie]
        }))
      }

      editorCloseAnimation();
    };
    const deleteDiarie = () => {
      const removeDiarieFromData = data.diarias.filter(getDiarie => getDiarie.id !== diarie.id);
      setData(( values ) => ({
        ...values,
        diarias: removeDiarieFromData
      }));
      
      editorCloseAnimation();
    };

  // Results
  useEffect(() => {
    const animation = () => {
      document.querySelector('.editor').style = 'top: 40px';
      document.querySelector('.home').style = `
        transform: translate(-50%, -0%) scale(0.93); 
        filter: brightness(0.85); 
        padding: 20px 0 0 0; 
        overflow: hidden;
        border-radius: 10px;
        height: 100%;
        position: fixed;
      `;
      document.body.style = 'background: #231d20';
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
    animation();

    window.onpopstate = () => {
      if ( window.location.pathname === '/' ){
        document.querySelector('body').style = '';
        document.querySelector('.home').style = '';
      }
    };

  }, []);
  return (
    <div className="container editor border dontBottom">
      <div className="padding">
        <div className="container-nav">
          <div onClick={editorCloseAnimation} className="font blue">
            Cancelar
          </div>
          <div className="center">
            {editorMode === "edit"
              ? "Editar"
              : editorMode === "new"
              ? "Nova diária"
              : null}
          </div>
          <div onClick={saveDiarie} className="font bold blue">
            Salvar
          </div>
        </div>

        <br />

        <Inputs>
          <Input
            type="text"
            name="ocorrencia"
            placeholder="Ocorrência"
            value={diarie.ocorrencia}
            onChange={handleInputs}
          />
        </Inputs>

        <Inputs>
          <Input
            label="Início"
            className="font right"
            type="datetime-local"
            name="inicio"
            onChange={handleStart}
            value={diarie.inicio}
          />

          {data.tipo !== "pacote" && (
            <div className="flex between">
              <label>Termino</label>
              <Termino data={data} diarie={diarie} setDiarie={setDiarie} />
            </div>
          )}

          <div className={data.tipo === "pacote" ? null : "disabled"}>
            <label>Valor</label>
            {data.tipo === "pacote" ? (
              <Input
                type="currency"
                className="font right"
                name="valor"
                value={diarie.valor}
                onChange={(element) => handleInputs(element)}
              />
            ) : (
              Valor({
                data: data,
                diarie: diarie,
              }).format(true)
            )}
          </div>
        </Inputs>

        <Cobranca diarie={diarie} setDiarie={setDiarie} />
        <br />

        {editorMode === "edit" ? (
          <button className="btn font red" onClick={deleteDiarie}>
            Apagar diaria
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default Editor;