import ContentType from "./products";

interface categoriesType {
    id: number,
    name: string,
    description: string,
    slug: string,
    products: ContentType[],
    sorting: number,
    companySlug: string,
    companyType: number,
}

export default categoriesType;