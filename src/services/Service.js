import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
})

instance.getWithDelay = (path) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            instance.get(path)
                .then(response => resolve(response))
                .catch(error => reject(error))
        }, 3000)
    })
}

instance.deleteWithDelay = (path) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            instance.delete(path)
                .then(response => resolve(response))
                .catch(error => reject(error))
        }, 3000)
    })
}

instance.postWithDelay = (path, body) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            instance.post(path, body)
                .then(response => resolve(response))
                .catch(error => reject(error))
        }, 3000)
    })
}

export default instance 

export class BaseService {

    listAll() {}

    delete(id) {}

}