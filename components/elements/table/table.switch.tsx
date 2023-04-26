import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { useCallback } from "react";
import axiosConfig from "../../../services/api";

interface Props {
  data: boolean;
  full: any;
  url: string;
}

const TableSwitch = ({ data, url, full }: Props) => {
  const onChange = useCallback(async (e: any) => {
    await axiosConfig().post(url, { status: e, id: full["id"] });
  }, []);
  return (
    <Switch
      onChange={onChange}
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      defaultChecked={data}
    />
  );
};

export default TableSwitch;
