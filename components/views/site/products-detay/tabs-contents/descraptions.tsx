import ContentType from "types/products";

const DescraptionTab = ({ data }: { data: ContentType }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: data.body ?? "" }} />
    );
};

export default DescraptionTab;
