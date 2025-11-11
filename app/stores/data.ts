// stores/useStore.ts
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { create } from "zustand";

interface StoreState {
    heightFactor: Float;
    setHeightFactor: (data: Float) => void;
    isConnected: boolean;
    setIsConnected: (data: boolean) => void;
    ws: WebSocket | null;
    setWs: (data: WebSocket | null) => void;
}

export const useStore = create<StoreState>((set) => ({
    heightFactor: 1.0,
    setHeightFactor: (data) => set({ heightFactor: data }),
    isConnected: false,
    setIsConnected: (data) => set({ isConnected: data }),
    ws: null,
    setWs: (data) => set({ ws: data }),
}));

export default () => {};
