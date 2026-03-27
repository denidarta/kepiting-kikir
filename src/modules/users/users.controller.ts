import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    schema: {
      example: {
        id: 4,
        name: 'Rina Kartika',
        email: 'rina@example.com',
        createdAt: '2024-07-01T00:00:00.000Z',
        updatedAt: '2024-07-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed — invalid or missing fields' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    schema: {
      example: [
        {
          id: 1,
          name: 'Budi Santoso',
          email: 'budi@example.com',
          createdAt: '2024-01-05T00:00:00.000Z',
          updatedAt: '2024-01-05T00:00:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    schema: {
      example: {
        id: 1,
        name: 'Budi Santoso',
        email: 'budi@example.com',
        createdAt: '2024-01-05T00:00:00.000Z',
        updatedAt: '2024-01-05T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'ID must be a number' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user name or email' })
  @ApiParam({ name: 'id', example: 1, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    schema: {
      example: {
        id: 1,
        name: 'Budi Updated',
        email: 'budi.updated@example.com',
        createdAt: '2024-01-05T00:00:00.000Z',
        updatedAt: '2024-07-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', example: 1, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
    schema: { example: { message: 'User with id 1 successfully deleted' } },
  })
  @ApiResponse({ status: 400, description: 'ID must be a number' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
