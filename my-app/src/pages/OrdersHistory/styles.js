import styled, { keyframes } from "styled-components";


const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`; 
export const Container = styled.div`
    position: relative;
    min-width: 32rem;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 10.5rem auto 8rem;
    grid-template-areas:
    "header"
    "content"
    "footer";

    .back{
    position: absolute;
    top: 14rem;
    left: 10%;
    display: flex;

    gap: 5px;
    >h3{
      font-size:25px;
    }

    @media only screen and (min-width: 1350px){
    position: absolute;
    left: 19%;
    }
  }

    footer {
        position: absolute;
        bottom: 0;
    }

    @media  only screen and (min-width: 768px) {
        .desktop {
            display: block;
        }
        .mobile {
            display: none;
        }

        .loading-spinner {
            display: none;
}

    }

    @media  only screen and (max-width: 767px) {
        .desktop {
            display: none;
        }
        .mobile {
            display: flex;
            flex-direction: column;
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: content;
    padding-top: 6rem;
    max-width: 121.2rem;
    margin: 4rem auto;

   
    padding: 3rem 4rem;

    .loading-spinner {
   margin-top: 4rem;
 animation:${spin} 1s linear infinite;
}

  
`;

export const Table = styled.div`

        
    table {

        display: block;
        overflow: auto;
        overflow: overlay;
        white-space: nowrap;
        
        width: 100%;
        max-height: 54.4rem;
        margin-top: 3.5rem;
        
        border: 2px solid ${({ theme }) => theme.COLORS.BLUE_300};
        border-radius: 0.8rem;
        border-collapse: collapse;

        &::-webkit-scrollbar {
          width: 22px;     
    }
    
      
     &::-webkit-scrollbar-thumb {
       background-color: transparent;
       border-radius: 80px;
       box-shadow: inset 0 0 0px 6px ${({ theme }) => theme.COLORS.BLUE};
       border: solid 10px transparent;
    }
    
    }

    table * {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    table th {
        position: sticky;
        top: 0px;

        height: 6.4rem;
        padding: 2.1rem 2.4rem;
        border-bottom: 2px solid ${({ theme }) => theme.COLORS.BLUE_300};
        
        text-align: left;
        color: ${({ theme }) => theme.COLORS.WHITE_100};
        background: ${({ theme }) => theme.COLORS.BLUE_200};
    }

    table th:first-child {
        width: 22.3rem;
    }

    table th:nth-child(2) {
        width: 15.1rem;
    }

    table th:nth-child(3) {
        width: 60.5rem;
    }

    table th:last-child {
        width: 15.1rem;
    }

    table tr {
        border-bottom: 2px solid ${({ theme }) => theme.COLORS.BLUE_300};
    }

    table tr:nth-child(even) {
        background: ${({ theme }) => theme.COLORS.BLUE_200};
    }

    table tr:last-child {
        border-bottom: none;
    }

    table td {
        height: 8rem;
        padding: 1.6rem 2.4rem;
    }

    table th:nth-child(-n+3),
    table td:nth-child(-n+3) {
        border-right: 2px solid ${({ theme }) => theme.COLORS.BLUE_300};
    }

    select {
        max-width: 17.5rem;
        background: ${({ theme }) => theme.COLORS.BACKGROUND_900};

        border-radius: 0.8rem;
     

        padding: 1.3rem 1.6rem;

    }
`;

export const Order = styled.div`


    border: 2px solid ${({ theme }) => theme.COLORS.BLUE_300};
       border-radius: 0.8rem;
       padding: 2rem 3rem;
       width: 100%;
       display:flex;
       flex-direction: column;
       gap: 2rem;
       margin-top:2rem;
    .details{
      display: flex;
      gap: 2rem;
    }


    select {
        max-width: 17.5rem;
        background: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        color:${({ theme }) => theme.COLORS.WHITE};
        border-radius: 0.8rem;
     

        padding: 1.3rem 1.6rem;

    }
`;