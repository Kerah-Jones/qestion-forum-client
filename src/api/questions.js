import apiUrl from '../apiConfig'
import axios from 'axios'

export const createQuestion = (question, user) => {
  console.log(question, user)
  return axios({
    method: 'POST',
    url: apiUrl + '/questions',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      question: {
        question: question.question,
        description: question.description,
        category: question.category
      }
    }
  })
}

export const updateQuestionIndex = (question, user, data) => {
  return axios({
    url: apiUrl + '/questions/' + data.question.id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      question: {
        question: question.question,
        description: question.description,
        category: question.category
      }
    }
  })
}

export const deleteQuestion = (questionId, user) => {
  console.log(questionId)
  return axios({
    method: 'DELETE',
    url: apiUrl + '/questions/' + questionId.question.id,
    headers: {
      Authorization: `Token token= ${user.token}`
    }
  })
}
