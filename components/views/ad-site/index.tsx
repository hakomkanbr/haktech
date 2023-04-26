import CoBanner from "components/ads-container/banner";
import CoNavbar from "components/ads-container/navbar";
import CoQuestions from "components/ads-container/questions";
import CoOfferCard from "components/ads-container/what-we-offer";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";

export default function AHomeView() {
    return (
        <>
            <CoNavbar />
            <CoBanner />
        </>
    );
}
