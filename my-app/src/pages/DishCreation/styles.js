import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 320px;
    min-height: 100%;
    width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 10.5rem auto 8rem;
    grid-template-areas:
    "header"
    "content"
    "footer";
 

    overflow-y: auto;
     
    &::-webkit-scrollbar {
        width: 22px;
         
  }
    
   &::-webkit-scrollbar-thumb {
     background-color: transparent;
     border-radius: 80px;
     box-shadow: inset 0 0 0px 6px ${({ theme }) => theme.COLORS.BLUE};
     border: solid 10px transparent;
 }


 @media only screen and (max-width: 768px) {
    &::-webkit-scrollbar {
display: none;

}}
    
`;

export const Content = styled.div`
 grid-area: content;
    display: flex;
    flex-direction: column;
    
    width: 100%;
    max-width: 121.2rem;
    height: 100%;
    margin: auto;
    padding: 3.5rem 4rem;

    .button {
        display: flex;
        justify-content: center;
        margin-top: 3.2rem;
    }

    @media only screen and (min-width: 768px) {
        .button {
            align-self: flex-end;
            justify-content: end;
        }
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 3.2rem;
        font-weight: 500;
        line-height: 4.5rem;
        text-align: center;
        
        margin: 2.4rem 0 0;
    }

    button:first-child {
        font-size: 2.4rem;
    }

    .header {
        justify-content: center;
        text-align: center;
    }

    > div p {
        margin-bottom: 0.8rem;
    }

    .details {
        display: flex;
        width: auto;
        gap: 3.2rem;
        @media only screen and (max-width: 768px) {
        flex-direction:column;
    }
    }
    
    .dishCategory{
        width: 100%;
    }

    .dishCategory select {
    background: ${({ theme }) => theme.COLORS.BLUE_300};

    border-radius: 0.5rem;
    border: none;
    border: 1px solid ${({ theme }) => theme.COLORS.WHITE};

    height: 4.8rem;
    width: 100%;

    padding: 10px;

    font-size: 16px;

    line-height: 26px;

    color: ${({ theme }) => theme.COLORS.GRAY_100};

    }

    .dishImage {
        display: flex;
        flex-direction: column;
        
        width: 100%;
        
        input[type='file'] {
        display: none;
        }
        
        > label {
            display: flex;
            justify-content: center;

            padding: 1.1rem 0.5rem;
            gap: 0.5rem;
            border-radius: 0.5rem;
            border: 1px solid ${({ theme }) => theme.COLORS.WHITE};

            background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

            font-family: 'Poppins', sans-serif;
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 2.4rem;

            cursor: pointer;
        }

        > label:hover {
            background-color: ${({ theme }) => theme.COLORS.BLUE};
        }
    }

    .ingredients {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        height: auto;
        gap: 2.4rem;
        padding: 0.8rem;
        width: 100%;
        border-radius: 0.8rem;
        margin-bottom: 3.2rem;
        border: 1px solid white;
    }

    .ingredientsTag { 
        gap: 3rem;
    }

    .price {
        width: 100%;
    }

    @media only screen and (min-width: 768px) {

        h1 {
            text-align: left;
        }

        .dishImage {
            max-width: 22.9rem;
            width: 50%;
        }

        .dish {
            max-width: 85rem;
            width: 40%;
        }
        
        .dishCategory{
        width: 30%;
    }

        .ingredients {
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            
            max-width: 83.7rem;
            height: auto;
            padding: 0.8rem;
            margin-bottom: 0;

            border-radius: 0.8rem;
            border: 1px solid ${({ theme }) => theme.COLORS.WHITE};
        }

        .ingredientsTag { 
            display: flex;
        
        }

        .price {
            max-width: 25.1rem;
            width: 100%;
        }
    }
`;