import React, { createContext, useState } from 'react';

interface GlobalContextProps {
    verifierAddress: string;
    setVerifierAddress: React.Dispatch<React.SetStateAction<string>>;
    strategyAddress: string;
    setStrategyAddress: React.Dispatch<React.SetStateAction<string>>;
    selectModel: number;
    setSelectModel: React.Dispatch<React.SetStateAction<number>>;
    instances: string[];
    setInstances: React.Dispatch<React.SetStateAction<string[]>>;
    proof: string;
    setProof: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
    verifierAddress: '',
    setVerifierAddress: () => {},
    strategyAddress: '',
    setStrategyAddress: () => {},
    selectModel: 0,
    setSelectModel: () => {},
    instances: [],
    setInstances: () => {},
    proof: '',
    setProof: () => {},
});

export const GlobalProvider = ({ children }:{children:any}) => {
    const [verifierAddress, setVerifierAddress] = useState('');
    const [strategyAddress, setStrategyAddress] = useState('');
    const [globalSelectedModel, setGlobalSelectedModel] = useState(0);
    const [instances, setInstances] = useState<string[]>([]);
    const [proof, setProof] = useState('');

    return (
        <GlobalContext.Provider value={{ verifierAddress, setVerifierAddress, strategyAddress, 
            setStrategyAddress, selectModel: globalSelectedModel, setSelectModel: setGlobalSelectedModel, instances,
            setInstances, proof, setProof  }}>
            {children}
        </GlobalContext.Provider>
    );
};