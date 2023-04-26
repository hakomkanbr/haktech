const checkNumber = (_: any, value: { number: number }) => {
    if (value.number > 0) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('رجاء أدخل رقم هاتف صحيح'));
};

export default checkNumber;