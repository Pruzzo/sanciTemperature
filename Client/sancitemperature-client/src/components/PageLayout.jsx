import { useState } from "react";
import BackButtonContext from "../context/BackButtonContext";
import Navbar from "./Navbar";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { useLocation } from "react-router-dom";

export const PageLayout = (props) => {
    
    // const location = useLocation();
    const [backButton, showBackButton] = useState(false);

    return (
        <>
            <BackButtonContext.Provider value={{ backButton, showBackButton }}>
                    <Navbar />
                    {props.children}
                    {/* <TransitionGroup>
                        <CSSTransition key={location.key} classNames="fade" timeout={0}>
                            {props.children}
                        </CSSTransition>
                    </TransitionGroup> */}
            </BackButtonContext.Provider>
        </>
    );
};

