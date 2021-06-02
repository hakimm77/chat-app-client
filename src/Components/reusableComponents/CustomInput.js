import styled from "styled-components";

const Input = styled.input`
  ::placeholder {
    color: #cfc3cf;
  }
`;

const CustomInput = ({
  textinside,
  onChangetext,
  width,
  height,
  Style,
  focus,
  blurInput,
}) => {
  const inputStyle = {
    width: width,
    height: height,
    ...Style,
  };
  return (
    <Input
      placeholder={textinside}
      onChange={onChangetext}
      onFocus={focus}
      onBlur={blurInput}
      style={inputStyle}
    />
  );
};

export default CustomInput;
