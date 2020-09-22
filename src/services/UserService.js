import Service, { BaseService } from './Service'
import jwt from 'jsonwebtoken'
import authenticationConfig from '../config/authentication.json'

class UserService extends BaseService {

    constructor() {
        super()
        this.isLogged().then(result => {
            if (result) {
                Service.defaults.headers = {
                    Authorization: `Bearer ${this.getToken()}`
                }
            }
        })
    }

    authenticate(params = {}) {
        return Service.postWithDelay('/user/authenticate', params)
    }

    register(params = {}) {
        return Service.postWithDelay('/user/register', params)
    }

    setToken(token) {
        sessionStorage.setItem('token', token)
        Service.defaults.headers = {
            Authorization: `Bearer ${token}`
        }
    }

    logout() {
        sessionStorage.removeItem('token')
    }

    getToken() {
        return sessionStorage.getItem('token')
    }

    isLogged() {
        return new Promise((resolve) => {
            jwt.verify(this.getToken(), authenticationConfig.secret, (err, decoded) => {
                resolve(!err && decoded ? true : false)
            })
        })
        
    }

}

export default new UserService()