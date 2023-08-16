import styled from "styled-components";


export const Container = styled.header`
   grid-area:header;
   position: fixed;
   height: 10.5rem;
    display: flex;
    width: 100%;
    box-shadow: 0px 0px 10px 5px #193746;
    -webkit-box-shadow: 0px 0px 10px 5px #193746; 
    z-index: 999;
    justify-content: center;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
  

    @keyframes scale-up-center {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.2);
        }
    }
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    
    padding: 0 4rem;
    gap: 3rem;
    width: 121rem;
    height: 10.5rem;
    

    .logo{
    display: flex;
    gap:10px;
    align-items: center;
    color: ${({ theme }) => theme.COLORS.WHITE};
    
    h1 {
        font-size: 2.5rem;
      
    }
    
    a {
        display: flex;
        gap: 1rem;

        text-decoration: none;
        color: inherit;
    }

}


#order{
    display: none;
}
 
    .nav-menu {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 3rem;

        .noShow{
            margin-left:4rem;
        }
        p{
            cursor: pointer;
            display: flex;
            align-items: center;
          
           }

    }

    .menu {
        display: none;
    }

    .bar {
        display: block;
        
        width: 25px;
        height: 3px;
        margin: 5px auto;
        
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        background-color: ${({ theme }) => theme.COLORS.BLUE};
    }

    .button{
        width: 30rem;
        display:flex;
        align-items: center;
    
    }

    @media (max-width: 1020px) {
        max-width: 768px;

        #order{
            cursor: pointer;
            display:flex;
        }

        .nav-menu {
            flex-direction: column;
            align-items: center;
            text-align: center;
            
            position: fixed;
            left: -100%;
            top: 10.4rem;
            z-index: 9999;
            .button{
            display:none
          }
            width: 100%;
            height: 35rem;
            gap: 2rem;
            padding: 5rem 5rem 3rem;
            border-radius: 0 0 2rem 2rem;
            border: 1px solid ${({ theme }) => theme.COLORS.WHITE};
            
            transition: 0.3s;
            
            background-color: ${({ theme }) => theme.COLORS.BLUE_200};
            box-shadow:
                0 10px 27px rgba(0, 0, 0, 0.05);

           
        }

        .nav-menu.active {
            left: 0;
            .button{
            display:none
          }
            
        }

        .nav-item {
            margin: 2.5rem 0;
        }

        .menu {
            display: block;
            cursor: pointer;
        }

        .menu.active .bar:nth-child(2) {
            opacity: 0;
        }

        .menu.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        .menu.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;


export const Search = styled.div`
    align-self: center;

    width: 100%;
    border-radius: 5px;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

    input {
        width: 100%;
        height: 4.8rem;

        padding: 1.6rem;
        border: 0;

        color: ${({ theme }) => theme.COLORS.GRAY_200};
        background: transparent;

        &:placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_200};
        }

    }

    label {
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 1.6rem;
    } 

    svg {
        color: ${({ theme }) => theme.COLORS.GRAY_200};
    }
`;



export const Logout = styled.div`
    display: flex;
    align-self: center;
    cursor: pointer;
    border: none;
    background: none;
    
    > svg {
        color: ${({ theme }) => theme.COLORS.BLUE};
        font-size: 3.2rem;
    }

    > svg:hover {
        animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }
`;

