import React from 'react';
import styles from './formFields.css'
const FormFields = ({ id, formdata, change }) => {

    const showError=()=>{
        let errorMessage=null;
        if(formdata.validation && !formdata.valid){
            errorMessage =(
                <div className={styles.labelError}> 
                    {formdata.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }

    const RenderTemplate = () => {
        let formTemplate = null;
        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div>
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id, blur: false })}
                        ></input>
                        {showError()}
                    </div>
                )
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }

    return (
        <div>
            {RenderTemplate()}
        </div>
    );
};

export default FormFields;