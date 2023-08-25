import { useState, useContext, createContext } from "react";

export const ModeContext = createContext();

const ModeProvider = ({children}) => {

    const[mode, setMode] = useState('light');

    const toggleMode = () => {
        if(mode === 'light'){
            setMode('dark');
            document.body.style.backgroundColor = 'grey';
            document.body.style.color = 'white'
        }else{
            setMode('light');
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black'
        }
    }


    return(
        <ModeContext.Provider value={{mode, toggleMode}}>{children}</ModeContext.Provider>
    )
}

const useMode = () => useContext(ModeContext);
export {useMode, ModeProvider}