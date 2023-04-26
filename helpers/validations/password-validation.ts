const passwordValidations = (value: string) => {
    var upperval = /(?=.*[A-Z])/;
    var lowerval = /(?=.*[a-z])/;

    if (value === undefined || value === "") {
        return Promise.reject("رجاء أدخل كلمة المرور");
    }

    if (value.length < 8) {
        return Promise.reject("كلمة المرور يجب أن تكون اكثر من 8");
    }
    if (value.length > 50) {
        return Promise.reject("كلمة المرور يجب أن تكون أقل من 50");
    }
    if (upperval.test(value) === false || lowerval.test(value) === false) {
        return Promise.reject("يجب أن تتضمن أحرف كبيرة");
    }
    if (value.search(/\d/) == -1) {
        return Promise.reject("يجب أن تتضمن الأرقام");
    }
    if (value.search(/[\!\@\#\$\½\.]/) == -1) {
        return Promise.reject("يجب أن تتضمن (!,@,#,$..)");
    }
    return Promise.resolve();
}

export default passwordValidations;