import {FC} from 'react';

interface IPopupInfoProps{
    data: IData;
}

interface IData{
    title: any;
    description: any;
}
const PopupInfo: FC<IPopupInfoProps> = ({ data }) => (
    <div className='popup-container'>
        <div className='my-popup'>
            <h1>{data.title}</h1>
            <p>
                {data.description}
            </p>
        </div>
    </div>
);

export default PopupInfo;
