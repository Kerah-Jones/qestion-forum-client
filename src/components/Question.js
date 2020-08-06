import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createQuestion } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateQuestion extends Component {
  constructor () {
    super()

    this.state = {
      question: '',
      description: '',
      category: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  onCreateQuestion = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    createQuestion(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Question Posted Sucessfully',
        message: messages.createQuestionSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ question: '', description: '', category: '' })
        msgAlert({
          heading: 'Create Post Failed with error: ' + error.message,
          message: messages.createQuestionFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { question, description, category } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create Question</h3>
          <Form onSubmit={this.onCreateQuestion}>
            <Form.Group controlId="Question">
              <Form.Label>Question</Form.Label>
              <Form.Control
                required
                type="text"
                name="text"
                value={question}
                placeholder="Enter Question Here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Password</Form.Label>
              <Form.Input
                required
                name="description"
                value={description}
                type="textarea"
                placeholder="Desciption"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Input
                required
                name="category"
                value={category}
                type="textarea"
                placeholder="Category"
                onChange={this.handleChange}
              />
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
}

export default withRouter(CreateQuestion)
