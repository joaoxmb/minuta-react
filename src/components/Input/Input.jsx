import PropTypes from "prop-types";

// inputs import
import Currency from "./components/Currency";
import Select from "./components/Select";
import Textarea from "./components/Textarea";

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
  label,
  options
}) => {

  const InputType = {
    'currency': Currency,
    'textarea': Textarea,
    'select': Select,
  }[type] || 'input';

  return (
    <div>
      {label && <label>{label}</label>}
      <InputType
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        options={options}
        type={type}
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'currency', 'textarea', 'select','datetime-local']).isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
};

const Inputs = (props) => {

  return (
    <>
      <div className="input-box">
        {props.children}
      </div>
      <br />
    </>
  );
}

Inputs.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Inputs, Input };