import ReactDOM from "react-dom/client";
import {ReactNode} from "react";

const buildPopup = (component: ReactNode): ReactDOM.Root => {
    let popupNode = document.createElement('div')
    const popup = ReactDOM.createRoot(popupNode);
    popup.render(component)
    return popup
}

export default buildPopup
