import CoBanner from "components/containers/banner";
import SlidePhoto from "components/containers/slider/slider";
import Container from "components/utils/container";
import categoriesType from "types/categories";

const HomeDynaimcPageView = ({ data }: any) => {
  return (
    <Container>
      <CoBanner />
      {data.map((item: categoriesType, index: number) => {
        return (
          <SlidePhoto key={index} data={item} />
        )
      })}
    </Container>
  );
};

export default HomeDynaimcPageView;
