import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 32rem;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 10.5rem auto 8rem;
    grid-template-areas:
    "header"
    "content";
    
    >button{
        position: absolute;
        top: 14rem;
        left: 30rem;
    }
  
    >h1{
        position:absolute;
        left:35rem;
        top: 15rem;
    }

    footer {
        position: absolute;
        bottom: 0;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: content;
    padding-top: 6rem;
    overflow: auto;
    overflow: overlay;
    
    justify-content:center;
    align-items: center;

   
    padding: 3.5rem 4rem;

    .zeroOrders {
        justify-content: center;
        align-items: center;
        padding: 10rem;
        white-space: normal;
    }

    .zeroOrders p {
        text-align: center;
        font-weight: bold;
        font-size: 3rem;
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
        border: 1px solid ${({ theme }) => theme.COLORS.WHITE};

        padding: 1.3rem 1.6rem;
    }
`;