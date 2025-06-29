import React, { useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' // Quan trọng!
import useStyles from '../../hooks/useStyles'
import styles from './Editor.module.scss'
import { Form } from 'antd'

const options = {
  debug: 'info',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],       
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  },

  placeholder: 'Thêm mô tả nội dung tại đây!',
  theme: 'snow' // Đừng quên
}

function Editor() {
  const cs = useStyles(styles)

  const containerRef = useRef(null)
  const editorRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = new Quill(containerRef.current, options)
    }
    

  }, [])

  return (
    <div className={cs('editor')}>
      <Form.Item name='content' >
        <div ref={containerRef} style={{ height: '300px', width: '100%' }} />
      </Form.Item>
    </div>
  )
}

export default Editor
