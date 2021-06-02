import styled from "styled-components";
import Spacer from "./reusableComponents/Spacer";

const InputInfo = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 4px;
  color: #3f4547;
  outline: none;
  border: 1px solid #d9dbe4;
  padding-left: 10px;
  font-size: 16px;

  :focus {
    border-color: #50b648;
  }
`;

const InputField = ({
  insideText,
  savetext,
  typeOf,
  emailPattern,
  inputVal,
}) => {
  return (
    <div>
      <InputInfo
        placeholder={insideText}
        onChange={savetext}
        required
        type={typeOf}
        pattern={emailPattern}
        value={inputVal}
      />
      <Spacer height={1} />
    </div>
  );
};

export default InputField;
