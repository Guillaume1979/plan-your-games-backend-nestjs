import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../../decorators/public.decorator';
import { User } from './entities/user.entity';
import { ConnectedUser } from '../../decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public() //todo à enlever après les tests
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('me')
  findConnectedUser(@ConnectedUser() user: User): Promise<User> {
    return this.userService.findOne(user.uuid);
  }

  @Public() //todo à enlever après les tests
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.findOne(uuid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
