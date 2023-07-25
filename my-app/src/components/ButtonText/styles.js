import styled from "styled-components";

export const Container = styled.button`
    display: flex;
    align-items: center;
    text-align: end;
    
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 2.5rem;
    font-family: 'Poppins', sans-serif;
    
    border: none;
    gap: 0.8rem;

    background: none;


  &.color{
      font-size: 1.5rem;
      color: ${({ theme }) => theme.COLORS.RED};
  }
`;