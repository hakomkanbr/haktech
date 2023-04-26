import points from "points";
import axiosConfig from "services/api";
import SelectDataType from "types/select";

async function fetchCategoryList(): Promise<SelectDataType[]> {
    let res = await (
        await axiosConfig().post(points.getCategorySelect, {
            pageSize: 50,
            currentPage: 1,
        })
    ).data;
    return res.data.map(({ text, id }: { text: string; id: number }) => ({
        label: text,
        value: id,
    }));
}


export default fetchCategoryList;