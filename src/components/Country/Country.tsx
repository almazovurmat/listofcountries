import React from "react";

interface IProps {
    countryName: string;
    onClick: React.MouseEventHandler;
}

const Country:React.FC <IProps> = ({countryName, onClick}) => {
    return (
        <li onClick={onClick}>
            {countryName}
        </li>
    );
};

export default Country;