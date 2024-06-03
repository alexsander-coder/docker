import { MaxLength, IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";
import { Category } from "./category.entity";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  constructor({ name, description, is_active }: Partial<Category>) {
    Object.assign(this, { name, description, is_active });
  }
}
