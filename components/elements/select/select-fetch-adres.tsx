import { useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import InAddressSelectType from "types/addres-select-type";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function AdresSelect<
  ValueType extends InAddressSelectType = any
>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>();
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return loadOptions;
  }, [fetchOptions]);


  return (
    <Select
      filterOption={false}
      onClick={(e: any) => debounceFetcher(e.target?.value)}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      placeholder={"أختر العنوان"}
      {...props}
      fieldNames={{ label: "addressName", value: "id" }}
      options={options}
    />
  );
}

export default AdresSelect;
