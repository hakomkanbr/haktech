import { Alert } from "antd";
import { AxiosError } from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AlertStyle = styled(Alert)`
padding: 8px 15px;
  .ant - alert - message {
    font - weight: 600;
    text - align: left;
    margin: 4px 0px;
    color: rgb(21 20 20);
}
  .ant - alert - description {
    text - align: left;
}`
    ;

const MySwal = withReactContent(Swal);

export enum RenderMethod {
    content = "content",
    alert = "alert",
    message = "message",
}
export enum ErrorType {
    success = "success",
    error = "error",
    info = "info",
    warning = "warning",
}
export enum ErrorInstance {
    axiosError = "AxiosError",
    custumError = "custumError",
}
export interface MyErrors {
    key: ErrorType;
    title: string;
    description: string;
    code: string;
}

class ErrorProvider extends Error {
    public static NotAuth: MyErrors = {
        title: "...يرجى تسجيل الدخول",
        code: "client_01",
        description: "يرجى تسجيل الدخول..",
        key: ErrorType.error,
    };
    public static NotFound: MyErrors = {
        title: "Sayfa bulunmadı",
        code: "au-log-01",
        description: "Sayfa bulunmadı",
        key: ErrorType.error,
    };
    public static Unknow: MyErrors = {
        title: "Bilinmeyen bir hata",
        code: "au-log-01",
        description: "Bilinmeyen bir hata",
        key: ErrorType.error,
    };
    public static hundleError(errors: AxiosError | MyErrors[]) {
        console.info("hundleError : ", errors);
        if (errors instanceof AxiosError) {
            return JSON.stringify(errors);
        } else if (errors instanceof Error) {
            return JSON.stringify(errors);
        }
        return JSON.stringify(errors);
    }
    static hundle401(renderMethod: RenderMethod, error: MyErrors) {
        return this.hundleToNotCodeAgain(renderMethod, error, this.NotAuth);
    }
    static hundle400(renderMethod: RenderMethod, error: MyErrors) {
        return this.hundleToNotCodeAgain(renderMethod, error, this.Unknow);
    }
    static hundle404(renderMethod: RenderMethod, error: MyErrors) {
        return this.hundleToNotCodeAgain(renderMethod, error, this.NotFound);
    }
    static hundleToNotCodeAgain(
        renderMethod: RenderMethod = RenderMethod.alert,
        error: any,
        defaultError: MyErrors
    ) {
        if (renderMethod === RenderMethod.content) {
            if (Array.isArray(error)) {
                return (
                    <>
                        {error.map((err: MyErrors, index) => (
                            <AlertStyle
                                description={err.description}
                                type={err.key}
                                message={err.title}
                            />
                        ))}
                    </>
                );
            } else if (typeof error === "object") {
                return (
                    <AlertStyle
                        description={error.description}
                        type={error.key}
                        message={error.title}
                    />
                );
            } else {
                return (
                    <AlertStyle
                        description={defaultError.description}
                        type={defaultError.key}
                        message={defaultError.title}
                    />
                );
            }
        } else if (renderMethod === RenderMethod.alert) {
            if (Array.isArray(error)) {
                MySwal.fire({
                    html: (
                        <div>
                            {error.map((err: MyErrors, index: number) => (
                                <AlertStyle
                                    key={index}
                                    description={err.description}
                                    type={err.key}
                                    message={err.title}
                                />
                            ))}
                        </div>
                    ),
                    icon: ErrorType.error,
                });
            } else if (typeof error === "object") {
                MySwal.fire({
                    title: error.title,
                    html: error.description,
                    icon: error.key,
                });
            } else {
                MySwal.fire({
                    title: defaultError.title,
                    html: `${defaultError.description} code: (${defaultError.key})`,
                    icon: defaultError.key,
                });
            }
            return "";
        }
    }
    public static init(renderMethod: RenderMethod, errors: AxiosError<{ errors: MyErrors | MyErrors[] }>) {
        if (typeof errors === "string") {
            errors = JSON.parse(errors);
        }
        console.info("ErrorProvider init...", errors, renderMethod);

        if ("status" in errors) {
            if (errors.status === 400) {
                return this.hundle400(renderMethod, this.Unknow);
            }
            if (errors.status === 401) {
                return this.hundle401(renderMethod, this.NotAuth);
            }
            if (errors.status === 500 || errors.status === 405) {
                return this.hundle400(renderMethod, this.Unknow);
            }
            if (errors.status === 404) {
                return this.hundle404(renderMethod, this.NotFound);
            }
        } else if ("response" in errors) {
            let data = errors.response?.data?.errors;
            if (errors.response?.status === 400) {
                return this.hundle400(renderMethod, data as any);
            }
            if (errors.response?.status === 401) {
                return this.hundle401(renderMethod, data as any);
            }
            if (errors.response?.status === 500 || errors.response?.status === 405) {
                return this.hundle400(renderMethod, data as any)
            }
            if (errors.response?.status === 404) {
                return this.hundle400(renderMethod, data as any)
            }
        } else {
            return this.hundleToNotCodeAgain(renderMethod, errors, this.Unknow);
        }
    }
}

export default ErrorProvider;