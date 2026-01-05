import { TipoConteudo } from "../utils/enum";

export interface TagItem {
    id: number;
    nome: string;
    tipo: TipoConteudo;
}

export interface ITag {
    id: number;
    nome: string;
    tipo: TipoConteudo;
}