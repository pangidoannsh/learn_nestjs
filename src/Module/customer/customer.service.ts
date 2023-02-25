import { Injectable } from "@nestjs/common";
import { CreateCustomerDTO } from "./customer.dto";

@Injectable()
export class CustomerService {
    customers = [
        {
            id: 1,
            email: "edo@gmail.com",
            name: "edo",
            created_at: new Date(),
        },
        {
            id: 2,
            email: "reno@gmail.com",
            name: "reno",
            created_at: new Date(),
        },
        {
            id: 3,
            email: "farhan@gmail.com",
            name: "farhan",
            created_at: new Date(),
        },
        {
            id: 4,
            email: "putra@gmail.com",
            name: "putra",
            created_at: new Date(),
        },
    ]

    all() {
        return this.customers;
    }

    findId(id: any) {
        return this.customers.find(customer => customer.id == id);
    }

    create(data: CreateCustomerDTO) {
        this.customers.push({
            id: this.customers.length + 1,
            email: data.email,
            name: data.name,
            created_at: new Date()
        });
    }
}