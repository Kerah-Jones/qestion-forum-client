import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createQuestion } from '../../api/questions'
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

    const { msgAlert, history, user } = this.props

    createQuestion(this.state, user)
      // .then(res => user(res.data.user))
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
            <Form.Group>
              <Form.Control
                required
                size="lg"
                type="text"
                name="question"
                value={question}
                placeholder="Ask Your Question!"
                onChange={this.handleChange}
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
                value={description}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" value={category} onChange={this.handleChange}>
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
}

export default withRouter(CreateQuestion)
