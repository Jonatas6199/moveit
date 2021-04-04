import Head from "next/head"
import styles from "../../styles/pages/Login.module.css";
import { Logon } from "../../components/Logon";

export default function Home(){
    return(
        <div className={styles.rootContainer}>
            <div className={styles.loginContainer}>
                <Head>
                    <title>
                        Login | move.it
                    </title>
                </Head>
                <section>
                    <div>
                        <img src = "icons/moveit-simbol.svg" alt="moveit"></img>
                    </div>
                    <div>
                        <Logon/>
                    </div>
                </section>
              
            </div>
        </div>
    )
}