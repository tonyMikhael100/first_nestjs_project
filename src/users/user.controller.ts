import { Controller, Get } from "@nestjs/common";


@Controller('/api/users')
export class UserController {
    @Get('/')
    getAllUsers() {
        return {
            users: ['tony', 'mikel ', 'malak ', 'mina', 'bassant'],
        };
    }

    @Get('/single')
    getSingleUser(): String {
        return 'this single only one  users ';
    }
}