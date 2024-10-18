import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import TaskContext from '../context/TaskContext';

export default function TaskItem(props) {
    const {description,status,title,userId,_id} = props.task;
    
    const context = useContext(TaskContext);    
    const {deleteTask,updateTaskStatus} = context;

    const handleDelete = ()=>{
        deleteTask(_id);
    }

    const handleChange = ()=>{
        updateTaskStatus(_id,status);
    }

    const handleEdit = ()=>{
        if(props.show === true)
            props.handleClose()
        else{
            props.handleShow(); 
            props.onSendData({title,description,_id});
        }
    }
    
    return (
        <div className='col-12 col-sm-6 col-md-4 col-xl-3 mt-2'>
            <Card>
                <Card.Body>
                    <div className='d-flex align-items-center'>
                        <Card.Title style={{textDecoration: status === true ? 'line-through' : 'none'}}>{title}</Card.Title>
                        <div className='ms-auto d-flex align-items-center'>
                            <span className='text-center' onClick={handleDelete}>
                                <img src='delete.png' alt='Delete' className='icon rounded img-fluid' data-tooltip-id='my-tooltip' data-tooltip-content='Delete' />
                            </span>
                            <span className='text-center' onClick={handleEdit}>
                                <img src='write.png' alt='Edit' className='icon rounded img-fluid' data-tooltip-id='my-tooltip' data-tooltip-content={'Update'} />
                            </span>
                            <span className='text-center' onClick={handleChange}>
                                <img src='mark.png' alt='Mark' className='icon rounded img-fluid' data-tooltip-id='my-tooltip' data-tooltip-content={'Complete'} />
                            </span>

                        </div>
                        <Tooltip id="my-tooltip" />
                    </div>
                    <Card.Text style={{textDecoration: status === true ? 'line-through' : 'none'}}>
                       {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
