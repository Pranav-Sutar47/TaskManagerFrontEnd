import React, { useEffect, useState } from 'react'
import TaskContext from './TaskContext'
import { showToast } from '../components/ToastComponent';

export default function TaskFetch(props) {

    const s1 = []
    const [tasks,setTasks] = useState(s1)

    const getTask = async() =>{
        const myheaders = new Headers();
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Authorization",`Bearer ${localStorage.getItem('token')}`);
        let url = String(import.meta.env.VITE_TASK_URL);
        url+='/allTask';
        const response = await fetch(url,{
          method:'GET',
          headers:myheaders
        })

        const json = await response.json();
        //console.log(json)
        setTasks(json);
    }

    const addTask = async(title,description)=>{
      const myheaders = new Headers();
      //console.log(title,description)
      myheaders.append("Content-Type", "application/json");
      myheaders.append("Authorization",`Bearer ${localStorage.getItem('token')}`);
      let url = import.meta.env.VITE_TASK_URL;
      url +='/addtask';
      let obj={title: title,status: false};
      if(description)
        obj.description = description
      const response = await fetch(url,{
        method:'POST',
        headers: myheaders,
        body : JSON.stringify(obj)
      })
      const json = await response.json();
      setTasks(tasks.concat(json.addValue));
      showToast(json.message,'light');
    }

    const deleteTask = async(id)=>{
      const myheaders = new Headers();
      myheaders.append("Content-Type", "application/json");
      myheaders.append("Authorization",`Bearer ${localStorage.getItem('token')}`);
      let url = import.meta.env.VITE_TASK_URL;
      url +=`/deletetask/${id}`;
      const response = await fetch(url,{
        headers:myheaders,
        method:'DELETE'
      })
      const json = await response.json();
      const newTask = tasks.filter((task)=>{
        return task._id !== json.deleteVal._id;
      })
      setTasks(newTask);
      showToast(json.message,'light');
    }

    const updateTaskStatus = async(id,status)=>{
      const myheaders = new Headers();
      myheaders.append("Content-Type", "application/json");
      myheaders.append("Authorization",`Bearer ${localStorage.getItem('token')}`);
      let url = import.meta.env.VITE_TASK_URL;
      url+=`/updatestatus/${id}`;
      let obj = {status:!status};
      const response = await fetch(url,{
        headers:myheaders,
        method:'PUT',
        body: JSON.stringify(obj)
      })
      const json = await response.json();
      const updatedTask = tasks.map((task)=>{
        return(
        task._id === json.updateStatusVal._id ? json.updateStatusVal : task
        )
      });
      setTasks(updatedTask);
      showToast(json.message,'light');
    }

    const updateTask =async({title,description,_id})=>{
      //console.log(title," ",description," ",_id)
      const myheaders = new Headers();
      myheaders.append("Content-Type", "application/json");
      myheaders.append("Authorization",`Bearer ${localStorage.getItem('token')}`);
      let url = import.meta.env.VITE_TASK_URL;
      url+=`/updatetask/${_id}`;
      let obj = {title:title};
      if(description)
          obj.description = description;
      const response = await fetch(url,{
        headers:myheaders,
        method:'PUT',
        body: JSON.stringify(obj)
      })
      const json = await response.json();
      const updatedTask = tasks.map(task=>{
        return(
          task._id ===json.updateVal._id ? json.updateVal : task
        )
      })
      setTasks(updatedTask);
      showToast(json.message,'light');
      //console.log(json.updateVal);
    }

  return (
    <TaskContext.Provider value={{tasks,setTasks,getTask,addTask,deleteTask,updateTaskStatus,updateTask}}>
        {props.children}
    </TaskContext.Provider>
  )
}
