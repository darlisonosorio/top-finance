import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectConnection } from "nest-knexjs";
import { lastValueFrom } from "rxjs";
import { User } from "src/model/dto/user";

@Injectable()
export class UserRepository {

  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy
  ) {}
  
  async findById(id: number): Promise<User>{
    try {
        return await lastValueFrom(
            this.usersClient.send({ cmd: 'find-user' }, { id }),
        );
    } catch (error) {
        throw new RpcException({
          statusCode: 400,
          message: `User owner not found with id ${id}`
        });
    }
  }

}