import styled from "styled-components";

export const ProductStyle = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    cursor: pointer;
  }
  h2,
  h3 {
    padding: 0.5rem 0rem;
  }
`;
