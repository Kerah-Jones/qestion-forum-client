import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

import apiUrl from './../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import { updateQuestion } from '../../api/questions'

const UpdateQuestion = (props) => {
  const [question, setQuestion] = useState({ question: '', description: '', category: '' })
  const [updated] = useState(false)

  useEffect(() => {
    console.log(props)
    axios(`${apiUrl}/questions/${props.match.params.id}`)
      .then(res => {
        console.log(res)
        setQuestion(res.data.question)
      })
      .catch(error => {
        setQuestion({ question: '', description: '', category: '' })
        props.msgAlert({
          heading: 'Create Post Failed with error: ' + error.message,
          message: messages.updateQuestionFailure,
          variant: 'danger'
        })
      })
  }, [])

  const onUpdateQuestion = event => {
    event.preventDefault()

    const { msgAlert, history, user } = props
    console.log(question)
    updateQuestion(question._id, user, question)
      // .then(res => user(res.data.user))
      .then(() => msgAlert({
        heading: 'Question Updated Sucessfully',
        message: messages.updateQuestionSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        setQuestion({ question: '', description: '', category: '' })
        msgAlert({
          heading: 'Update Failed with error: ' + error.message,
          message: messages.updateQuestionFailure,
          variant: 'danger'
        })
      })
  }

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedQuestion = Object.assign({}, question, updatedField)

    setQuestion(editedQuestion)
  }

  if (updated) {
    console.log('updated')
    // return <Redirect to={`/questions/${props.match.params.id}`} />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Edit Question</h3>
        <Form onSubmit={onUpdateQuestion}>
          <Form.Group>
            <Form.Control
              required
              size="lg"
              type="text"
              name="question"
              value={question.question}
              placeholder="Ask Your Question!"
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows="5"
              name="description"
              placeholder= "Type Description Here!"
              value={question.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="category" value={question.category} onChange={handleChange}>
              <option>Coding</option>
              <option>Random</option>
              <option>Animals</option>
              <option>Science</option>
              <option>Sports</option>
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
          Ask Question!
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default UpdateQuestion
