import styled from "styled-components";

export const Container = styled.div`
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin-bottom: 2rem;
    width: 35rem;
    .container{
      display: flex;
      gap: 1.5rem;
      margin-top:2rem;
    }

     p strong {
            margin-right: 1.2rem;
        }

    p span {
            margin-left: 1.2rem;
            font-size: 1.2rem;
            font-weight: 400;
        }
    img{
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    object-fit: cover
  }

  p{
    text-align: left;
  }
    
`;