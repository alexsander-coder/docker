/***** inicio das definições dos tipos *****/

import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";

//define as propriedades necessarias para criar uma instancia de Category.Algumas propriedades sao opcionais(category_id, description, is_active, created_at)
export type CategoryConstructorProps = {
    category_id?: Uuid;
    name: string;
    description?: string | null;
    is_active?: boolean;
    created_at?: Date;
}

//define o comando necessario para criar uma categoria, focando nas propriedades essenciais(name, description, is_active). não inclui category_id ou created_at porque estes são geralmente gerenciados internamente
export type CategoryCreateCommand = {
    name: String;
    description?: string | null;
    is_active?: boolean;
}
/***** fim das definições de tipos *****/


export class Category {
    category_id: Uuid;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;

    //inicializa as propriedades da entidade usando o objeto 
    constructor(props: CategoryConstructorProps) {
        this.category_id = props.category_id ?? new Uuid();
        this.name = props.name;
        this.description = props.description ?? null;
        this.is_active = props.is_active ?? true;
        this.created_at = props.created_at ?? new Date();
    }

    //metodo estatico para criar uma nova instancia de Category. Encapsula a logica de criacao, oferecendo um ponto unico para instanciar objetos da entidade
    static create(props: CategoryConstructorProps): Category {
        const category = new Category(props);
        Category.validate(category);
        return category;
    }

    /***** inicio dos metodos para modificar o estado da entidade *****/
    //encapsulando a lógica de negócios
    changeName(name: string): void {
        this.name = name;
        Category.validate(this);
    }

    changeDescription(description: string): void {
        this.description = description;
        Category.validate(this)
    }

    activate() {
        this.is_active = true;
    }

    desactivate() {
        this.is_active = false;
    }
    /***** fim dos metodos para modificar o estado da entidade *****/

    static validate(entity: Category) {
        const validator = CategoryValidatorFactory.create();
        return validator.validate(entity);
    }

    //converte a entidade em um objeto literal, facilitando a conversao para JSON
    toJSON() {
        return {
            category_id: this.category_id,
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            created_at: this.created_at
        };
    }
}