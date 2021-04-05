import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from 'js-cookie';
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

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
    closeLevelUpModal: ()=> void;
}

interface ChallengesProviderProps{
    children : ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

//dentro desse ...rest tem o resto das propriedades, ficam dentro desse objeto
export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [level,setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [isLevelUpModalOpened,setIsLevelUpModalOpened] = useState(false);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(()=>{
        Notification.requestPermission();
    },[])//quando tem essas chaves de vetor vazias, significa que a função ali 
        //na primeira chave {function} vai ser executada apenas uma vez, assim que o 
        //componente for exibido em tela
    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level +1);
        setIsLevelUpModalOpened(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpened(false);
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
            completeChallenge,
            closeLevelUpModal
            }}
        >
            {children}
            
            {isLevelUpModalOpened && <LevelUpModal/> 
                //verifica se é true
            }
            
        </ChallengesContext.Provider>
    )
}