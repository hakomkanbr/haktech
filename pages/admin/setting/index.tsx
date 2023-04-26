import SettingView from 'components/views/admin/setting';
import type { NextPageWithLayout } from '../../_app';

const SettingPage: NextPageWithLayout = () => {
  return <SettingView />
}

SettingPage.layout = "Admin";
export default SettingPage