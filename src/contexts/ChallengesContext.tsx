import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from "../../challenges.json";

interface Challenge{
    type: 'body' | 'eye';//sempre vai ser um ou outro
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp:() => void;
    startNewChallenge: () => void;
    resetChallenge:()=> void;
    completeChallenge: ()=> void;
}

interface ChallengesProviderProps{
    children : ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}: ChallengesProviderProps){
    const [level,setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(()=>{
        Notification.requestPermission();
    },[])//quando tem essas chaves de vetor vazias, significa que a função ali 
        //na primeira chave {function} vai ser executada apenas uma vez, assim que o 
        //componente for exibido em tela


    function levelUp(){
        setLevel(level +1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        
        if(Notification.permission === 'granted'){
            new Notification("Novo desafio 🎉",{
                body: `Valendo ${challenge.amount}xp!`,
                silent: true
            });
            new Audio("/notification2.mp3").play();
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;// let it change, não é const

        if(finalExperience >= experienceToNextLevel){
            levelUp();
            finalExperience = finalExperience - experienceToNextLevel;
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted +1);
        
    }
    return(
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            activeChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}