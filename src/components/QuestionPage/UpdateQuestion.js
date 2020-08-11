import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'

import apiUrl from './../../apiConfig'
import CreateQuestion from '../CreateQuestion/CreateQuestion'

const UpdateQuestion = (props) => {
  const [question, setQuestion] = useState({ question: '', description: '', category: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/questions/${props.match.params.id}`)
      .then(res => {
        console.log(res)
        setQuestion(res.data.question)
      })
      .catch(console.error)
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedQuestion = Object.assign({}, question, updatedField)

    setQuestion(editedQuestion)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/questions/${props.match.params.id}`,
      method: 'PATCH',
      data: { question }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    console.log('updated')
    // return <Redirect to={`/questions/${props.match.params.id}`} />
  }
  console.log('Hello world')
  return (
    <CreateQuestion
      question={question}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`/questions/${props.match.params.id}`}
    />
  )
}
export default UpdateQuestion
