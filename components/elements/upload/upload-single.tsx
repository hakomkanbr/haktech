import { Upload, Progress, UploadProps, UploadFile, Form, message } from "antd";
import { useState, useEffect } from "react";
import axiosConfig from "services/api";
import points from "points";
import PlacesEnum from "../../../enums/file.enum";

type Props = {
  module: PlacesEnum;
  multiple?: boolean;
  form?: any;
};

const UploadImage = (props: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const form = Form.useFormInstance();
  const [progress, setProgress] = useState(0);
  const { module, multiple } = props;

  useEffect(() => {
    if (form) {
      setTimeout(() => {
        if (multiple) {
          const oldImages = form.getFieldValue("imageNames");
          if (Array.isArray(oldImages)) {
            let arr: any[] = [];
            oldImages.map((item: any, index: number) => {
              arr.push({
                name: item,
                url: process.env.NEXT_PUBLIC_BASE_DOMIN + item,
                status: "done",
              });
            });
            setFileList(arr);
          }
        } else {
          const oldImage = form.getFieldValue("mainImageName");
          if (oldImage) {
            setFileList([
              {
                uid: "-1",
                name: oldImage,
                url: process.env.NEXT_PUBLIC_BASE_DOMIN + oldImage,
                status: "done",
              },
            ]);
          }
        }
      }, 100);
    }
  }, [form]);

  const uploadImage: UploadProps["customRequest"] = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    fmData.append("file", file);
    try {
      const res = await axiosConfig().post(
        points.sendPhoto + "?folder=" + module,
        fmData,
        config
      );
      onSuccess && onSuccess({ name: res.data });
      // if (multiple) {
      //   const oldImageName = form.getFieldValue("imageNames");
      //   console.info("oldImageNames : ", oldImageName);
      //   let images =
      //     oldImageName &&
      //     oldImageName.fileList?.map((item: any, index: number) => {
      //       console.info("images: ", item);
      //       return item.response?.name;
      //     });
      //   form.setFieldValue("imageNames", images);
      // } else {
      //   form.setFieldValue("mainImageName", res.data);
      // }
    } catch (err: any) {
      onError && onError(err);
    }
  };
  const handleChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    if (!multiple) {
      if (!(newFileList.length > 0)) {
        form.setFieldValue("mainImageName", "");
      } else {
        form.setFieldValue(
          "mainImageName",
          newFileList[0]?.response?.name ?? newFileList[0]?.name
        );
      }
    } else {
      let arr: string[] = [];

      newFileList?.map((item: any, index: number) => {
        const isJpgOrPng =
          item.type === "image/jpeg" || item.type === "image/png";

        if (!isJpgOrPng) {
          newFileList[index].status = "error";
        }

        const isLt1M = item.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          newFileList[index].status = "error";
        }
        arr.push(newFileList[index]?.response?.name ?? newFileList[index]?.name);
      });
      console.info("arr : ", arr);
      form.setFieldValue("imageNames", arr);
    }
    setFileList(newFileList);
  };
  return (
    <>
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        fileList={fileList}
        multiple
        // customRequest={uploadImage}
        beforeUpload={(file) => {
          const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";

          if (!isJpgOrPng) {
            message.error("يمكنك فقط تحميل ملفات JPG أو PNG!");
          }

          const isLt1M = file.size / 1024 / 1024 < 1;
          if (!isLt1M) {
            message.error("يجب أن يكون حجم الصورة أقل من 1 ميغا بايت!");
          }

          return isJpgOrPng && isLt1M;
        }}
        onChange={handleChange}
        listType="picture-card"
        className="image-upload-grid"
        maxCount={multiple ? 4 : 1}
      // onProgress={({ percent }) => {
      //   console.log("progre...", percent);
      //   if (percent === 100) {
      //     setTimeout(() => setProgress(0), 1000);
      //   }
      //   return setProgress(Math.floor(percent));
      // }}
      >
        {multiple ? (
          fileList.length >= 4 ? (
            ""
          ) : (
            <div>تحميل الصورة</div>
          )
        ) : fileList.length > 0 ? (
          ""
        ) : (
          <div>تحميل الصورة</div>
        )}
      </Upload>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </>
  );
};

export default UploadImage;
