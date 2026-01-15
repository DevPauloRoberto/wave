import { TipoConteudo } from "../utils/enum";

export interface CategoriaItem {
    id: number;
    nome: string;
    tipo: TipoConteudo;
}
export interface ICategoria {
    id: number;
    nome: string;
    tipo: TipoConteudo;
}
