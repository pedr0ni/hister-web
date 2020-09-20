import Service, { BaseService } from './Service'

class BooksService extends BaseService {

    listAll(page = 0) {
        return Service.getWithDelay(`/book?page=${page}`)
    }

    delete(id) {
        return Service.deleteWithDelay(`/book/${id}`)
    }

}

export default new BooksService()