import React, { useRef, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' // Quan trọng!
import useStyles from '../../hooks/useStyles'
import styles from './Editor.module.scss'
import { Form, Input } from 'antd'
import { CgLaptop } from 'react-icons/cg'

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

function Editor({ content, setContent }) {
  const cs = useStyles(styles)
    const [form] = Form.useForm()

  const containerRef = useRef(null)
  const editorRef = useRef(null)
  const outputContentRef = useRef(null)
 
  // console.log('Content', content)

  useEffect(() => {
    Quill.debug(false)
    if (containerRef.current && !editorRef.current) {
      editorRef.current = new Quill(containerRef.current, options)
    }
    editorRef.current.on('text-change', () => {
      const html = editorRef.current.root.innerHTML
      setContent(html) // cập nhật state
      form.setFieldsValue({content: html})
      console.log('Nội dung HTML:', html)
      // outputContentRef.current.innerHTML = html
    })

    return () => {
      if (editorRef.current) {
        editorRef.current.off('text-change')
      }
    }
  }, [setContent, form])

  return (
    <div className={cs('editor')}>
      <Form.Item>
        <div ref={containerRef} style={{ height: '300px', width: '100%' }} />
      </Form.Item>
      <Form.Item name="content" hidden>
        <Input />
      </Form.Item> 
      {/* <div ref={outputContentRef}></div> */}
    </div>
  )
}

export default Editor
