import { FC, PropsWithChildren } from 'react';
declare type NewWindowProps = PropsWithChildren<{
    url?: string;
    name?: string;
    title?: string;
    features?: Record<string, any>;
    center?: 'parent' | 'screen';
    copyStyles?: boolean;
    closeOnUnmount?: boolean;
    onOpen?: (window: Window) => void;
    onUnload?: () => void;
    onBlock?: () => void;
}>;
declare const NewWindow: FC<NewWindowProps>;
export default NewWindow;
