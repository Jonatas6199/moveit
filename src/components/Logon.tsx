import styles from "../styles/components/Logon.module.css";
import { useRouter } from "next/router";
export function Logon(){

    const router = useRouter();
    function homePage(){
       router.push("/");
    }
    return (
        <div className={styles.container}>
            <img src="icons/moveit-logo.svg" alt="logo"></img>
            <p>
                Bem-vindo
            </p>
            <div className={styles.github}>
                <img src="icons/github.svg" alt="twitter"></img>
                <p>Faça seu login com seu Github <br></br> para começar
                </p>
            </div>
            
            <div className={styles.logar}>
                <input type="text" placeholder="Digite seu username"></input>
                <button onClick={homePage}>
                    <img src="icons/arrow.svg" alt="Logar"></img>
                </button>
            </div>
           
           
        </div>
    )
}