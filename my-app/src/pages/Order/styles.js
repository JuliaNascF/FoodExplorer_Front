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
    "content"
    "footer";
    `;
    
    
    export const Content = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: content;
    width: 100%;
    max-width: 121.2rem;
    height: 100%;
    margin: 0 auto;
    padding: 3.5rem 4rem;
    align-items: center;
    text-align: center;
    
    .back{
    display: flex;
    gap: 5px;
    >h3{
      font-size:25px;
    }

    .show{
        display:none;
    }

    @media only screen and (max-width: 980px) {
        position:absolute;
        top: 13rem ;
        left: 4rem;
    
    }
    
  }
    &::-webkit-scrollbar {
          width: 22px;     
    }
    
      
     &::-webkit-scrollbar-thumb {
       background-color: transparent;
       border-radius: 80px;
       box-shadow: inset 0 0 0px 6px ${({ theme }) => theme.COLORS.BLUE};
       border: solid 10px transparent;
    }

  
     h2 {
        font-weight: 500;
        font-size: 3.2rem;
        font-family: 'Poppins', sans-serif;
        margin-bottom: 3rem;
        margin-top: 3rem;
        justify-content: center;
    }
      
    .details{
        margin-top:3rem;
    
    }
      

    @media only screen and (min-width: 980px) {
        flex-direction: row;
        text-align: left;
        align-items: flex-start;
        
        .order-wrapper{
           margin-right: 10rem;
        
        }
        .details {
            max-height: 520px;
            overflow: auto;
            overflow: overlay;
        }
        .total {
            margin: 0;
            text-align: center;
            white-space: nowrap;
        }

    }
`;

export const PaymentCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 3rem;

    max-width: 53.0rem;
    
    .paymentHeader {
        .buttons {
            display: flex;
            height: 8.1rem;
        } 
    
        .buttons button {
            width: 100%;
            background-color: transparent;
            color: ${({ theme }) => theme.COLORS.GRAY_300};
            border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
            border-bottom: none;
            font-size: 1.6rem;
            line-height: 2.4rem;
        }
    
        .buttons button.active {
            top: 2px;
            left: 1px;
            box-shadow: none;
            background-color: ${({ theme }) => theme.COLORS.GRAY_400};
        } 
    
        .buttons img {
            margin-right: 1.4rem;
            vertical-align: middle;
        }
    
        .buttons button:first-child {
            border-radius: 0.8rem 0 0;
        }
    
        .buttons button:last-child {
            border-radius: 0 0.8rem 0 0;
        }
    }

    .paymentBody {
        width: 100%;
        max-width: 53.0rem;
        max-height: 48rem;
        font-family: 'Roboto', sans-serif;

        padding: 5.9rem clamp(3rem, 3rem + 5.5vw, 9.1rem) 4.8rem;
        border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
        border-radius: 0 0 0.8rem 0.8rem;

        justify-content: center;
        align-self: center;
        align-items: center;
        align-content: center;
      
        .validTo {
            display: flex;
            gap: 1.7rem;
            margin: 3.7rem 0 3.7rem;
        }

        .paymentCredit p {
            margin-bottom: 0.8rem;
        }

        .paymentPix {
            text-align: center;
        }

        .qr {
            text-align: center;
        }

        #paymentPix img {
            width: clamp(5rem, 5rem + 20vw, 27rem);
            height: clamp(5rem, 5rem + 20vw, 27rem);

            margin-bottom: 2rem;
        }

        
        .clock,
        .approved,
        .cart {
            width: 100%;
            text-align: center;
            color: ${({ theme }) => theme.COLORS.GRAY_300};
        }

        > .clock p,
        .approved p,
        .cart p {
            font-size: 2.4rem;
            margin-top: 3rem;
        }
    }

    .cart,
    .clock,
    .approved,
    .paymentCredit,
    #paymentPix {
	    -webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	    animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    @-webkit-keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
        }
        @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;