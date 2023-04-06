import { useRef, useEffect } from "react";

const Select = ({
  onChange,
  value,
  options,
}) => {

  const ref = useRef();

  useEffect(() => {

    // Autosizing select
    const createResize = document.createElement('div');
    createResize.className = 'resize';
    createResize.style = `
      position: absolute;
      opacity: 0
    `;
    createResize.innerText = options.find(option => option.value === value).label;
    
    ref.current.parentElement.appendChild(createResize);

    const getResize = document.querySelector('.resize');
    const width = getResize.offsetWidth;

    ref.current.style = `width: ${width}px`;
    getResize.remove();

  })
  return(
    <>
      <select onChange={onChange} value={value} ref={ref}>
        {
          options.map( ( option ) => {
            const { value, label } = option;
            return (
              <option key={value} value={value}>{label}</option>
            )
          })
        }
      </select>
    </>
  )
}

export default Select