import axios from 'axios'
import Snackbar from '../components/Snackbar'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
})

const delay = 2000

instance.getWithDelay = (path) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            instance.get(path)
                .then(response => resolve(response))
                .catch(error => {
                    if (error.response)
                        Snackbar.show(error.response.data.message)
                    else
                        Snackbar.show('Sem internet! Verifique sua conexão e tente novamente')
                    resolve(undefined)
                })
        }, delay)
    })
}

instance.deleteWithDelay = (path) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            instance.delete(path)
                .then(response => resolve(response))
                .catch(error => {
                    if (error.response)
                        Snackbar.show(error.response.data.message)
                    else
                        Snackbar.show('Sem internet! Verifique sua conexão e tente novamente')
                    resolve(undefined)
                })
        }, delay)
    })
}

instance.postWithDelay = (path, body) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            instance.post(path, body)
                .then(response => resolve(response))
                .catch(error => {
                    if (error.response)
                        Snackbar.show(error.response.data.message)
                    else
                        Snackbar.show('Sem internet! Verifique sua conexão e tente novamente')
                    resolve(undefined)
                })
        }, delay)
    })
}

export default instance 

export class BaseService {

    listAll() {}

    delete(id) {}

}