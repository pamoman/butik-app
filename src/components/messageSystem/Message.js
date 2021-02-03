/*
 * Message
 */

import { createContext, useContext } from 'react';

export const MessageContext = createContext();

export const MessageProvider = MessageContext.Provider;

export const useMessage = () => {
    return useContext(MessageContext);
}