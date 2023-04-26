import { Avatar, Col, Input, Row, Table, TableProps } from "antd";
import { useQuery } from "react-query";
import axiosConfig from "services/api";
import { useSelector, useDispatch } from "react-redux";
import { AppReducers } from "../../../redux/types";
import Columns from "antd/lib/table/Column";
import TableActions from "./table.actions";
import TableSwitch from "./table.switch";
import ColumnEnum from "enums/columns.enum";
import { updateDatatableSetting } from "../../../redux/app/reducer";
import { useCallback, useEffect, useState } from "react";
import TableSearch from "./table.search";

interface Props {
  columns: object[];
  url: string;
}

const TableBasic = ({ columns, url }: Props) => {
  const dispatch = useDispatch();
  const { datatableSetting } = useSelector((state: any) => state.admin);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [surl, setSurl] = useState<string>("");

  const dtUpdate = useCallback(async () => {
    setIsLoading(true);
    let values = {
      pageSize: 10,
      currentPage: 1,
      ...datatableSetting,
    };
    if (url != surl) {
      values = {
        search: "",
        pageSize: 10,
        currentPage: 1,
      }
    }
    const response = await (await axiosConfig().post(url, values)).data;
    setIsLoading(false);
    setData(response);
  }, [datatableSetting, url]);

  useEffect(() => {
    dtUpdate();
    setSurl(url);
  }, [datatableSetting]);

  // sayfa arasında geçiş olduğnda store bilgiler sıfırlansı
  // useEffect(() => {
  //   if (firstUpdate) {
  //     dispatch(updateDatatableSetting({
  //       search: ""
  //     }));
  //     setFirstUpdate(false);
  //     dtUpdate();
  //   }
  // }, [url]);

  const onChange: TableProps<{}>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // pagination change yaparken önce gelmiyordu
    pagination.showTotal = (total, range) => {
      return ` يعرض ${range[0]} من ${total} قيود .`;
    };
    dispatch(
      updateDatatableSetting({
        ...filters,
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      })
    );
  };

  return (
    <div>
      <TableSearch />
      <Table
        loading={isLoading}
        onChange={onChange}
        dataSource={data?.data}
        pagination={{
          total: data?.total ?? 1,
          ...data?.pagination,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        size="middle"
      >
        {columns.map((item: any, index: number) => {
          if (item?.type === ColumnEnum.switch) {
            return (
              <Columns
                key={index}
                width={20}
                {...item}
                render={(data, full) => (
                  <TableSwitch full={full} data={data} url={item.url} />
                )}
              />
            );
          }
          if (item?.type === ColumnEnum.image) {
            return (
              <Columns
                key={index}
                {...item}
                render={(data, full) =>
                  data ? (
                    <Avatar
                      size="large"
                      src={process.env.NEXT_PUBLIC_BASE_DOMIN + data}
                    // src={"http://" + data}
                    />
                  ) : (
                    ""
                  )
                }
              />
            );
          }
          if (item?.type === ColumnEnum.groupImage) {
            return (
              <Columns
                key={index}
                {...item}
                render={(data, full) => (
                  <Avatar.Group>
                    {data?.map((item: any, index: number) => {
                      <Avatar
                        size="large"
                        // src={process.env.NEXT_PUBLIC_BASE_URL + points.getPhoto}
                        src={data}
                      />;
                    })}
                  </Avatar.Group>
                )}
              />
            );
          }
          if (item?.type === ColumnEnum.actions) {
            return (
              <Columns
                key={index}
                align="left"
                width={50}
                {...item}
                render={(data, full: object) => {
                  return (
                    <TableActions
                      full={full}
                      component={item.Component}
                      modalTitle={item.modalTitle}
                      detayPath={item.detayPath}
                      editInModal={item.editInModal}
                      editPath={item.editpath}
                      deleteItemUrl={item.deleteItemUrl}
                      id={data}
                    />
                  );
                }}
              />
            );
          }
          return <Columns key={index} {...item} />;
        })}
      </Table>
    </div>
  );
};

export default TableBasic;
