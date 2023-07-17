import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-rows: 10.5rem auto ;
    grid-template-areas:
    "header"
    "content";
    height: 100vh;
    width: 100%;
   >main{
       overflow-y: auto;
       grid-area:content;

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
    
`;

export const Content = styled.div`

    display: flex;
    flex-direction: column;
    
    width: 100%;
    margin: auto;
    padding: 3.5rem 4rem;

    font-family: 'Poppins', sans-serif;

    .swiper {
        margin-bottom: 6rem;
    }

    p {
        font-size: 3.2rem;
        margin-bottom: 3rem;
    }
    
    .card{
        display: flex;
        gap: 5rem;
        margin-bottom: 3rem;
    }

    @keyframes scale-up-center {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.2);
        }
    }
`;

export const Banner = styled.div`
    text-align: center;
    justify-content: space-between;
    font-family: 'Poppins', sans-serif;
   
    margin-bottom: 6.2rem;

    .banner {
        background: linear-gradient(180deg, ${({ theme }) => theme.COLORS.BLUE_400} 0%, ${({ theme }) => theme.COLORS.BLUE_500} 100%);
        border-radius: 0.8rem;
        position: relative;
        height: 15rem;
    }

    .title {
        padding: 2rem;
    }

    img {
        width: 100%;
        margin-bottom: -2.7rem;
        z-index: -1;
    }

    h1 {
        line-height: 140%;
        font-size: clamp(1rem, 6vw, 4rem);
        font-weight: 500;

        margin-bottom: 0.8rem;
    }

    span {
        font-size: clamp(1rem, 2.5vw, 1.6rem);
    }

    @media only screen and (min-width: 1060px) {
        position: relative;
        margin-top: 17rem;
        

        .banner {
            display: flex;
            justify-content: end;
            height: 25rem;
        }
        
        .title {
            width: 54rem;
            height: 26rem;

            padding: 8.7rem 4.6rem 0 0;

            text-align: right;
        }

        img {
            width: 65.6rem;
            position: absolute;
            bottom: 1.3rem;
            z-index: 1;
            left: -5rem;
        }
    }
`;

export const Category = styled.div`
   display: flex;
  

  > .card {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px;

    &::-webkit-scrollbar {
      display: none;
     
  }
  }
   
  button{
    color:${({ theme }) => theme.COLORS.BLUE_GREEN_800}
  }
`;