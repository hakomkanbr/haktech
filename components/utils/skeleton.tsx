import { DotChartOutlined } from "@ant-design/icons";
import { Skeleton, Space } from "antd";

export default function SkeletonElement() {
  return (
    <Space>
      <Skeleton.Image active={true} />
    </Space>
  );
}
