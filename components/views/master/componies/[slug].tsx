import { Form } from "antd";
import axiosConfig from "../../../../services/api";
import points from "points";
import { useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import TabsCompanies from "./create-company-sections";

export default function CreateEditCompanyView() {
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      const getCompany = async () => {
        const { data } = await axiosConfig().get(
          points.getCompany + "?id=" + router.query?.id
        );
        form.setFieldsValue({ ...data.data, date: moment(data.data.date) });
      };
      getCompany();
    } else {
      form.setFieldsValue({ date: moment(new Date()) });
    }
  }, []);

  return (<TabsCompanies />);
}
