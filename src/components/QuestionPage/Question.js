import React from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const Question = (props) => {
  const questionStyles = {
    border: '1px solid black',
    margin: '30px 20px',
    padding: '5px',
    width: '700px',
    background: 'white'
  }

  const addButtonStyles = {
    color: 'black',
    background: 'green'
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
    <div style={questionStyles}>
      <h2>{props.name}</h2>
      <p>Description: {props.description}</p>
      <p>Category: {props.category}</p>
      <button style={addButtonStyles}>Open Question</button>
      <button onClick={deleteQuestion}>Delete</button>
    </div>
  )
}

export default Question