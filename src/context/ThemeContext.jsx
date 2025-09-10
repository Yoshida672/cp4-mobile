import React,{createContext,useContext,useEffect,useState} from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext(ThemeContext)

export function useTheme(){
    return useContext(ThemeContext)
}
export default function ThemeProvider({children}){

    const colorScheme = Appearance.getColorScheme()
    const [theme,setTheme] = useState(colorScheme||"light")

    const toggleTheme = ()=>{
        setTheme((v)=> v==='light'?'dark':'light')
    }
     const themeColors = {
        light:{
            background:'#fff',
            text:'#000'
  
        },
        dark:{
            background:'#000',
            text:'#fff'
        }
    }
    return(
        <ThemeContext>
            {children}
        </ThemeContext>
    )

}