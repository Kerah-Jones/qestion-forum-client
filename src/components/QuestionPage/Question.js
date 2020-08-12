import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from '../AutoDismissAlert/messages'
// import answerQuestion from './Answer'

const Question = (props) => {
  const questionStyles = {
    border: '4px solid white',
    borderRadius: '15px',
    margin: '30px 20px',
    padding: '5px',
    backgroundColor: '#8fbbaf',
    color: 'white'
  }

  const linkStyles = {
    padding: '10px'
  }
  const deleteQuestion = (event) => {
    console.log('This is ', props)
    axios({
      method: 'DELETE',
      url: apiUrl + `/questions/${props.questionId}`,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => props.msgAlert({
        heading: 'Deleted Question',
        message: messages.deleteQuestionSuccess,
        variant: 'success'
      }))
      .catch(() => {
        props.msgAlert({
          heading: 'Failed to Delete',
          message: messages.deleteQuestionFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <div className="box" style={questionStyles}>
      <h2>{props.name}</h2>
      <p>Description: {props.description}</p>
      <p>Category: {props.category}</p>
      <button onClick={deleteQuestion}>Delete</button>
      <Link style={linkStyles} to={`/edit-question/${props.questionId}/edit`}>Edit</Link>
    </div>
  )
}

export default Question
