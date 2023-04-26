import points from "points";
import pointsSite from "points.site";
import axiosConfig from "services/api";
import InAddressSelectType from "types/addres-select-type";
import SelectDataType from "types/select";

async function fetchCategoryList(): Promise<SelectDataType[]> {
    let res = await (
        await axiosConfig().post(pointsSite.custumerSite_getUserLocation, {
            pageSize: 50,
            currentPage: 1,
        })
    ).data;
    return res.data.map((props: InAddressSelectType) => ({
        ...props
    }));
}


export default fetchCategoryList;