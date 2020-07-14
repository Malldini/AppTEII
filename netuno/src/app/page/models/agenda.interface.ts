import { Funcionario } from './funcionario.Interface';
import { Cliente } from './cliente.Interface';
import { Automovel } from './automovel.Interface';

export interface Agenda {
    id?: number;
    funcionarios: Funcionario[];
    clientes: Cliente[];
    automoveis: Automovel[];
    data?: Date;
}