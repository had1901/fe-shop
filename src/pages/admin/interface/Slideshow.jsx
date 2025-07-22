import React, { useState } from 'react'
import styles from './Slideshow.module.scss'
import useStyles from '../../../hooks/useStyles'
import ShowDropZone from './ShowDropZone';

// const list1 = 
// const list2 = [
//   {
//     id: 4,
//     label: 'Item 4'
//   },
//   {
//     id: 5,
//     label: 'Item 5'
//   },
//   {
//     id: 6,
//     label: 'Item 6'
//   },
// ]
function Slideshow() {
  const cs = useStyles(styles)
  const [todoList, setTodoList] = useState([
    { id: 1, label: 'Item 1', status: 'todo' },
    { id: 2, label: 'Item 2', status: 'todo' },
    { id: 3, label: 'Item 3', status: 'todo' },
  ])
  const [doingList, setDoingList] = useState([
    { id: 4, label: 'Item 4', status: 'doing' },
    { id: 5, label: 'Item 5', status: 'doing' },
    { id: 6, label: 'Item 6', status: 'doing' },
  ])


  const handleStartDrag = e => {
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log('Bắt đầu kéo', )
  }




    
  // }
  return (
    <div className={cs('container')}>
      <div className={cs('box-1')} data-status='todo'>
        <ShowDropZone index={0} setTodoList={setDoingList} doingList={doingList} setDoingList={setTodoList} />
        {todoList.map((item, index) => (
          <div className={cs('wrap-item')}>
            <div className={cs('item-1')}
              key={item.id}
              id={item.id}
              draggable="true"
              onDragStart={handleStartDrag}
              // onDragEnd={handleEndDrag}
            >{item.label}</div>
            <ShowDropZone index={index + 1} setTodoList={setTodoList} doingList={doingList} setDoingList={setDoingList}/>
          </div>

        ))}
      </div>
      <div className={cs('box-2')} data-status='doing'>
        <ShowDropZone index={0} setTodoList={setTodoList} doingList={todoList} setDoingList={setDoingList}/>
        {doingList.map((item, index) => (
          <div className={cs('wrap-item')}>
            <div className={cs('item-2')}
              key={item.id}
              id={item.id}
              draggable="true"
              onDragStart={handleStartDrag}
              // onDragEnd={handleEndDrag}
            >{item.label}</div>
            <ShowDropZone index={index + 1} setTodoList={setDoingList} doingList={todoList} setDoingList={setTodoList}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slideshow