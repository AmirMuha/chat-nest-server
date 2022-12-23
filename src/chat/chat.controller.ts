import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { ReqUser } from 'src/common/decorators/req-user.decorator';
import { ChatService } from './chat.service';
import { FilterChatDto } from './dto/filter-chat.dto';

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @Get()
  async getMany(@Query() filters: FilterChatDto, @ReqUser() user: IUserPayload) {
    return await this.service.findAll(filters, user);
  }
}
