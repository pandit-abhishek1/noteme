import {createContext,} from React;

const usercreatecontext = createContext('light');

const userContext = ()=>{
  const  value = {
            
    }

    return <usercreatecontext.provider  value= {value} >

    </usercreatecontext.provider>
}