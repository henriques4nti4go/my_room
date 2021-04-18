function setFieldsPerson(dispach, values) {
    dispach({
        type:'set_fields_person',
        payload: values
    });
}

export { setFieldsPerson };