import React, { useEffect, useRef } from 'react'

const AutoResizeTextarea = ({value,onChange,placeholder}) => {
    const textareaRef = useRef();
    useEffect(() =>{
        if(textareaRef.current){
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight,200)}px`
        }
    },[value])
  return (
    <textarea name="" id=""
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full textarea textarea-bordered flex-row resize-none overflow-hidden overflow-y-auto'
        rows={1}
        style={{maxHeight:"200px"}}
    />
  )
}

export default AutoResizeTextarea
