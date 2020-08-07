import React, { Component } from 'react'
import CreateQuestion from '../CreateQuestion/CreateQuestion'
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
    axios({
      method: 'GET',
      url: apiUrl + '/questions'
    })
      .then(response => {
        this.setState({ questionList: response.data.questions })
      })
      .catch(console.error) // change this later to include a failure message
  }
  render () {
    return (

      <div className='container'>
        <div className='column' style={{ display: 'flex', justifyContent: 'space-around' }}>
          {this.state.questionList.map((question, questionIndex) => (
            <CreateQuestion key={questionIndex} name={question.question} description={question.description} category={question.category}
              questionId={question._id} token={this.props.token} msgAlert={this.props.msgAlert}/>
          ))}
        </div>
      </div>
    )
  }
}

export default QuestionPage
