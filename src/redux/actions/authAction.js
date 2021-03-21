function setFieldsAuth(dispach, values) {
    dispach({
        type:'set_fields_auth',
        payload:{
            ...values
        }
    });
}

export {
    setFieldsAuth
};