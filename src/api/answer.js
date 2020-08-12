import apiUrl from '../apiConfig'
import axios from 'axios'

export const answerQuestion = (answer, user) => {
  console.log(answer)
  return axios({
    method: 'POST',
    url: apiUrl + '/answers',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      answer: {
        content: answer.content
      }
    }
  })
}
