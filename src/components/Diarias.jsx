import React, { memo } from "react";
import moment from "moment";

//components
import Valor from "./Valor";

const Diarias = ({ 
  navigateOpenEditor,
  data
}) => {

  const { diarias } = data;

  const formatCurrency = ( number ) => number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

  return (
    <>
      <div className="diarie-box">
        {
          diarias.map((diarie) => {
            const { ocorrencia, inicio, horas, adicional, id } = diarie;
            const startDate = moment(inicio).format("DD");
            const startTime = moment(inicio).format("HH:mm");
            const endTime = moment(inicio)
              .add(horas, "hour")
              .format("HH:mm");
  
            return (
              <div key={ocorrencia} onClick={() => navigateOpenEditor.edit(id)}>
                <div className="content">
                  <div className="right">
                    <div className="day flex center border">{startDate}</div>
                    <div>
                      <p>{ocorrencia}</p>
                      <span>{`${startTime} as ${endTime}`}</span>
                    </div>
                  </div>
                  <div className="results font center">
                    <p>
                      {
                        Valor({
                          data: data, 
                          diarie: diarie,
                        }).format(true)
                      }
                    </p>
                    <span>{`${horas} Horas`}</span>
                  </div>
                </div>
                {
                  adicional.length !== 0 && (
                    <div className="adicional">
                      {
                        adicional.map(( adicional ) => {
                          return (
                            <div key={adicional.ocorrencia}>
                              <p className="flex between">
                                <span>- {adicional.ocorrencia}</span> 
                                <span>{formatCurrency(adicional.valor)}</span>
                              </p>
                            </div>
                          )
                        })
                      }                      
                    </div>
                  )
                }
              </div>
            )
          })
        }

        <div className="font blue" onClick={navigateOpenEditor.new}>
          Adicionar diaria
        </div>
      </div>
      
      <br />
    </>
  )
};

export default Diarias;