import { SearchOutlined } from "@ant-design/icons"
import { Col, Input, Row } from "antd"
import { debounce } from "lodash";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateDatatableSetting } from "redux/app/reducer";

const TableSearch = () => {
    const dispatch = useDispatch();
    const searchTable = (e: any) => {
        dispatch(updateDatatableSetting({ search: e.target?.value ?? "" }))
    };
    const debouncedChangeHandler = useCallback(debounce(searchTable, 300), []);

    return (
        <Row gutter={16} style={{ padding: 15 }}>
            <Col className="gutter-row" span={16}>
                {/* <div className="text-left">
            {Ids?.length != 0 ? (
              <>
                <span className="text-black m-r-10">
                  <span
                    style={{
                      "background-color": "#d0bfbf",
                      color: "rgb(255, 255, 255)",
                      "border-radius": "50%",
                      padding: "2px 7px 2px",
                      "font-size": "10px",
                      position: "relative",
                      top: "-1px",
                    }}
                  >
                    {rowSelection.selectedRowKeys.length}
                  </span>{" "}
                  veri seçildi
                </span>
                <ButtonCustum type="error">
                  <DeleteOutlined />
                </ButtonCustum>
              </>
            ) : (
              ""
            )}

            {props.filtere && !isFilterOpen ? (
              <ButtonCustum onClick={isFilter} className="m-l-5" type="primary">
                <FilterOutlined /> Filtere
              </ButtonCustum>
            ) : (
              ""
            )}

            {props.indir ? (
              <Dropdown overlay={downloadItem} placement="bottomCenter" arrow>
                <ButtonCustum className="m-l-5" type="primary">
                  <DownloadOutlined /> İndir
                </ButtonCustum>
              </Dropdown>
            ) : (
              ""
            )}

            <Dropdown
              overlay={colvisItem}
              placement="bottom"
              onVisibleChange={handleVisibleChange}
              visible={colvisSetting.visibleMenuSettings}
            >
              <ButtonCustum className="m-l-5" type="primary">
                <BsToggles /> Sütünler
              </ButtonCustum>
            </Dropdown>
          </div> */}
            </Col>
            <Col className="gutter-row" span={8}>
                <Input
                    prefix={<SearchOutlined />}
                    onChange={debouncedChangeHandler}
                    placeholder="أبحث"
                />
            </Col>
        </Row>
    )
}

export default TableSearch;