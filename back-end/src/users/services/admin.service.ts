import { Injectable, Get} from '@nestjs/common';

@Injectable()
export class AdminService {

    async getHelloAdmin() {
        return "You are in the admin panel"
    }
    
}
