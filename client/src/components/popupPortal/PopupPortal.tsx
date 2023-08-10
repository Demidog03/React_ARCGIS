import {useEffect, FC} from "react";
import { createPortal } from "react-dom";

interface IPopupPortalProps{
    mountNode: any; //TODO fix mountNode type
    children: any
}
const PopupPortal: FC<IPopupPortalProps> = ({ mountNode, children }) => {
    const el = document.createElement("div");

    useEffect(() => {
        mountNode.appendChild(el);
        return () => mountNode.removeChild(el);
    }, [el, mountNode]);

    return createPortal(children, el);
};

export default PopupPortal;
