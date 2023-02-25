import { Controller, Get, HttpException, HttpStatus, Req, Res, UsePipes, ValidationPipe, Body, Post, Query } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateCustomerDTO } from "./customer.dto";
import { CustomerService } from "./customer.service";

@Controller('customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService
    ) { }
    @Get()
    index(
        @Req() req: Request,
        @Res() res: Response
    ) {
        res.send({ data: this.customerService.all(), meta: req.query });
    }
    @Get(':id')
    getCustomer(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const customer = this.customerService.findId(req.params.id);
        if (customer) {
            res.send({ message: "testing", data: customer });
        }
        else throw new HttpException('Customer Not Found!', HttpStatus.BAD_REQUEST);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCustomer(
        @Body() body: CreateCustomerDTO
    ) {
        this.customerService.create(body);
    }
}