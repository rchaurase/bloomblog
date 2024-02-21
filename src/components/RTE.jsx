import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({name,control,label,defaultValue=''}) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>
        {label}
      </label>}
      <Controller
        name={name||'content'}
        control={control}
        render={({field:{onChange}})=>(
          <Editor
            initialValue={defaultValue}
            init={
              {
                branding:false,
                height:500,
                menubar:true,
                plugins:[
                  'advlist autolink list link image charmap print preview anchor',
                  'searchplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:'undo redo | formateselect | bold italic backdor |\
                alignleft aligncenter alignright alignjustify|\
                bullist nullist outdent indent | removeformate | help',
                content_style :"body{font-family:Helvetica,Arial,sans-serif; font-size:14px}"
              }
            }
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}

export default RTE
