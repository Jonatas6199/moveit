import { useState} from 'react';

interface ButtonProperties{
    color: string;
    children: string;
}
export function Button(props:ButtonProperties){
    const [counter,setCounter] = useState(1);
    
    function increment() {
        setCounter(counter+1);
    }

    return(
        // aqui tem duas chaves no style, uma dentro da outra
        // a primeira chave significa que vou incluir código JavaScript dentro das chaves
        // a segunda chave é um objeto JavaScript 
        <button 
            type="button"
            style={{ backgroundColor: props.color}}
            onClick={increment}
        >
            {   //uso de chaves dentro do HTML  significa que quero incluir código JS dentro do HTML
                props.children
            }
            <strong>{counter}</strong>
        </button>
    )
}