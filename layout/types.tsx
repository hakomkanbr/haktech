import React from 'react';
interface ItemsTypes {
    label?  : string
    icon?   : React.ReactNode
    key    : string,
    children? : Array<ItemsTypes>
}

interface OptionsTypes {
    ar?: Array<ItemsTypes>
    en?: Array<ItemsTypes>
    tr?: Array<ItemsTypes>
}

export default OptionsTypes;