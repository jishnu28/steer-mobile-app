import React, { createContext, useReducer } from "react";
import { firebaseAuth } from "../../firebaseConfig";

type Action = { type: "GET_CHAT_ID"; payload: any };

type State = {
    chatId: string | null;
    userInfo: any;
};

const auth = firebaseAuth;

export const ChatContext = createContext<any>(null);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const currentUser = { 
        displayName: "John Doe",
        email: auth?.currentUser?.email,
        uid: auth?.currentUser?.uid,
    };

    const initialState: State = {
        chatId: "null",
        userInfo: {}
    };

    const chatReducer = (state: State, action: Action, currentUser: any): State => {
        switch (action.type) {
        case "GET_CHAT_ID":
            console.log(action)
            return {
                userInfo: action.payload,  //other parties' info
                chatId: currentUser.uid < action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,    
            };
        default:
        return state;
        }
        
    };

    const [state, dispatch] = useReducer(
        (state: State, action: Action) => chatReducer(state, action, currentUser),
        initialState
    );
    
    return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
    </ChatContext.Provider>
    );
};
