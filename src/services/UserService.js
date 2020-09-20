import Service, { BaseService } from './Service'
import jwt from 'jsonwebtoken'
import authenticationConfig from '../config/authentication.json'

class UserService extends BaseService {

    authenticate(params = {}) {
        return Service.postWithDelay('/user/authenticate', params)
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

    async isLogged() {
        return await new Promise((resolve) => {
            jwt.verify(this.getToken(), authenticationConfig.secret, (err, decoded) => {
                resolve(!err && decoded ? true : false)
            })
        })
        
    }

}

export default new UserService()