import apiUrl from '../apiConfig'
import axios from 'axios'

export const createQuestion = (question, user) => {
  console.log(question)
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

export const updateQuestion = (id, user, data) => {
  return axios({
    url: apiUrl + '/questions/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      question: {
        question: data.question,
        description: data.description,
        category: data.category
      }
    }
  })
}
