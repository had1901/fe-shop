import React, { useState } from 'react'
import styles from './ShowDropZone.module.scss'
import useStyles from '../../../hooks/useStyles'

function ShowDropZone({ index, setDoingList, doingList, setTodoList, onDrop, onDragOver}) {
  const cs = useStyles(styles)
  const [show, setShow] = useState(false)

    const handleEnterDrag = e => {
        console.log('Đang trong vùng thả', e.target)
        setTimeout(() => {
          setShow(true)
        }, 0)
    }

    const handleLeaveDrag = e => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          console.log('Rời vùng thả', e.target)
          setShow(false)
        }
    }
    
    const handleOverDrag = e => {
      e.preventDefault()
    }

    const handleDrop = e => {
        e.preventDefault()
        const id = parseInt(e.dataTransfer.getData('text/plain'),10)
        const status = e.target.parentElement.parentElement.dataset.status || e.target.parentElement.dataset.status
        const element = document.getElementById(id)

        const updateDoingTask = doingList.filter(item => item.id !== Number(element.id))
        setDoingList(updateDoingTask)
        setTodoList(prev => {
            const newList = [...prev]
            newList.splice(index, 0, { ...element, label: element.textContent, id: element.id, status })
            return newList
        })
        setShow(false)
    }
    
  return (
    <div 
      className={cs(`${show ? 'drop-zone' : 'hidden'}`)}
      // className={cs('drop-zone')}
      onDragEnter={handleEnterDrag}
      onDragLeave={handleLeaveDrag}
      onDrop={handleDrop}
      onDragOver={handleOverDrag}
    >
      Thả ở đây
    </div>
  )
}

export default ShowDropZone