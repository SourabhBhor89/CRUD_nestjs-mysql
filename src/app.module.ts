import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule , ConfigService} from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todos.entity';
import { join } from 'path';
//import {User} from './users/user.entity';
//import {UsersModule} from './users/user.module';




@Module({
  imports: [
    ConfigModule.forRoot(),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
      }),
      inject: [ConfigService],
     }), 
     TodosModule  ,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}












// TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'password',
//   database: 'admindb',
//   entities: [],
//   synchronize: true,
// }),






// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync({
//      imports : [ConfigModule],
//      useFactory :  (configService: ConfigService)=>({
//       type: 'mysql',
//       host: configService.get(localhost),
//       port: +configService.get(5000),
//       username: configService.get(root),
//       password: configService.get(password),
//       database: configService.get(admindb),
//       entities: [],
//       synchronize: true,
    
//     }),
//     inject: [ConfigService],
// }),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}















