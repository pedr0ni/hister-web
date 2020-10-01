import Service, {BaseService} from './Service'

class CategoryService extends BaseService {

    listAll() {
        return Service.get('/category')
    }

}

export default new CategoryService()