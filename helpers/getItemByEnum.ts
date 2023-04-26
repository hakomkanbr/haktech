import TypesEnum from 'enums/types.enum';

const getTypeByEnum = (typeId: number) => {
    if (typeId === TypesEnum.Resturant) {
        return "resturant";
    } else if (typeId === TypesEnum.Baker) {
        return "baker"
    } else {
        return "getTypeByEnum-else";
    }
}

export default getTypeByEnum;