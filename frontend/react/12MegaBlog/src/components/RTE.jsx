import React from 'react'
import config from "../configs/config"
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types';

function RTE({ name, control, label, defaultValue = 'default' }) {
    console.log("RTE component start");

    return (
        <div className='w-full'>
            {label && <label>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={config.tinymceKEY}
                        initialValue={defaultValue}
                        init={
                            {
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: [
                                    'image advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

                            }}
                        onEditorChange={onChange}
                    />
                )}
            />
            {console.log("RTE component end")}
        </div>
    )
}

RTE.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    label: PropTypes.string,
    defaultValue: PropTypes.string,
};

export default RTE
