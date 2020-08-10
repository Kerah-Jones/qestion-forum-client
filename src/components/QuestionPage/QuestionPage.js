import React, { Component } from 'react'
import Question from './Question'
import axios from 'axios'

import apiUrl from './../../apiConfig'

class QuestionPage extends Component {
  constructor () {
    super()

    this.state = {
      questionList: []
    }
  }
  componentDidMount () {
    console.log('This is ', this.props.user.token)
    axios({
      method: 'GET',
      url: apiUrl + '/questions',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({ questionList: response.data.questions })
      })
      .catch(console.error) // change this later to include a failure message
  }
  render () {
    return (
      <div className='container'>
        <div className='column' >
          {this.state.questionList.map((question, questionIndex) => (
            <Question key={questionIndex} name={question.question} description={question.description} category={question.category}
              questionId={question._id} user={this.props.user} msgAlert={this.props.msgAlert}/>
          ))}
        </div>
      </div>
    )
  }
}

export default QuestionPage
