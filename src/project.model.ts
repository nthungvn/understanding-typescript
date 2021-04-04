import { IsNotEmpty, IsPositive, IsNumber } from 'class-validator';

export class Project {
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
