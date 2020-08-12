import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { answerQuestion } from '../../api/answer'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import apiUrl from './../../apiConfig'
class AnswerQuestion extends Component {
  constructor () {
    super()

    this.state = {
      content: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onAnswerQuestion = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    answerQuestion(this.state, user)
      // .then(res => user(res.data.user))
      .then(() => msgAlert({
        heading: 'Answer Posted Sucessfully',
        message: messages.answerQuestionSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ content: '' })
        msgAlert({
          heading: 'Answer Question Failed with error: ' + error.message,
          message: messages.answerQuestionFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { content } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Answer Question</h3>
          <Form onSubmit={this.onAnswerQuestion}>
            <Form.Group controlId="answer">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="5"
                name="answer"
                placeholder= "Type Answer Here!"
                value={content}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
        Answer Question!
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(AnswerQuestion)
