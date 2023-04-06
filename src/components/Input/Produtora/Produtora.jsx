import React, { useState } from "react";

const maskCNPJ = ( string ) => 
  unmaskCNPJ(string)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');

const unmaskCNPJ = ( string ) => string.replace(/\D/g, '').substring(0, 14);

const queryCNPJ = async ({ cnpj, queryStatus, setData, setQueryStatus }) => {
  const { consultedCNPJ = "" } = queryStatus;

  if ( cnpj !== consultedCNPJ ) {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbzBsSm03dZadsBRIoSqnEWGMoi-4GJSFPnSarxWZ_87eHDv6HWUnU1rdFkST9uOBtb2/exec?cnpj=${cnpj}`
      );
      const dataApi = await response.json();
      const { status } = dataApi;

      if ( status === "OK" ) {
        const { email, cep, fantasia } = dataApi;
        const empresa = { email, cep, nome: fantasia };

        setData((data) => ({
          ...data,
          produtora: { ...data.produtora, empresa },
        }));

        setQueryStatus({
          consultedCNPJ: cnpj,
          empresa,
          status: "OK",
        });
      } else if ( status === "ERROR" ) {
        setQueryStatus({
          consultedCNPJ: cnpj,
          status: "ERROR",
          message: dataApi.message,
        });
      }
    } catch ( error ) {
      console.error(error);
    }
  } else {
    // Already consulted
    setData((data) => ({
      ...data,
      produtora: { ...data.produtora, empresa: queryStatus.empresa },
    }));
  }
};

export default function Produtora({ 
  data,
  setData 
}) {
  
  const { produtora: { string, empresa } } = data;
  const isCnpj = /^[0-9]{3}/.test(string);

  const [ queryStatus, setQueryStatus ] = useState({});

  const handleChange = ( event ) => {
    const value = event.target.value;
    const unMaskValue = unmaskCNPJ(value);
    const validation = /^[0-9]{14}/.test(unMaskValue);

    if ( validation ) {
      queryCNPJ({
        cnpj: unMaskValue,
        queryStatus, 
        setData, 
        setQueryStatus,
      });
    } else {
      setQueryStatus({});
    }

    setData(( data ) => {
      const setProdutoraObj = () => {
        const string = isCnpj ? unMaskValue : value;

        return validation ? 
          {
            empresa: data.produtora.empresa,
            string: string
          } :
          {
            string: string
          }
      }

      return ({
        ...data,
        produtora: setProdutoraObj(),
      })
    });

  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={isCnpj ? maskCNPJ(string) : string}
        onChange={handleChange}
        placeholder="Produtora"
      />
      {isCnpj && (
        <span
          style={{
            position: "absolute",
            right: 10,
            width: "50%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            color: "#cdcdcd",
            textAlign: 'right'
          }}
        >
          {
            empresa?.nome || queryStatus?.message
          }
        </span>
      )}
    </div>
  );
}; 