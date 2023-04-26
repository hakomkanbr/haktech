import HelpView from "components/views/pages/help";
import { NextPageWithLayout } from "pages/_app";

const HelpPage: NextPageWithLayout = () => {
    return <>
        <HelpView />
    </>;
};

HelpPage.layout = "WebLayout";

export default HelpPage;
