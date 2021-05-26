import styled from "styled-components";
import loadingGif from "../../Assets/loading.jpg";

const LoadingIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const Loadingimage = () => {
  return <LoadingIcon src={loadingGif} />;
};

export default Loadingimage;
