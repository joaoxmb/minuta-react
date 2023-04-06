import { useEffect, useRef } from "react";

const Textarea = ({
  value = '',
  onChange,
  name,
  className,
  placeholder
}) => {

  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
  })
  return (
    <div className="input-box">
      <div>
        <textarea
          ref={ref}
          onChange={onChange}
          name={name}
          value={value}
          className={`border ${className}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default Textarea