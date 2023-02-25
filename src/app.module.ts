import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppMiddleWare } from './Module/app.middleware';
import { CustomerController } from './Module/customer/customer.controller';
import { CustomerModule } from './Module/customer/customer.module';
import { UserModule } from './Module/user/user.module';
import { AuthModule } from './Module/auth/auth.module'
import entities from './TypeOrm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "student_db",
    entities,
    synchronize: true
  }),
    CustomerModule,
    UserModule,
    AuthModule
  ]

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleWare)
      .exclude(
        {
          path: "/auth/login",
          method: RequestMethod.POST
        },
        {
          path: "/register",
          method: RequestMethod.POST
        }
      )
      .forRoutes(
        CustomerController
      )
  }
}
