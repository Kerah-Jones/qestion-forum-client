import React from 'react'
// import axios from 'axios'
// import apiUrl from '/../../apiConfig'

const Question = (props) => {
  const questionStyles = {
    border: '3px solid black',
    margin: '30px 20px',
    padding: '5px',
    background: 'white'
  }

  const addButtonStyles = {
    color: 'black',
    background: '#A6D0E4'
  }

  return (
    <div style={questionStyles}>
      <h2>{props.name}</h2>
      <p>Description: {props.description}</p>
      <p>Category: {props.category}</p>
      <button style={addButtonStyles}>Open Question</button>
    </div>
  )
}
export default Question
