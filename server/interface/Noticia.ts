import { ICategoria } from './Categoria';
import { ITag } from './Tag';

export interface NoticiaListaAdmin {
    id: number
    titulo: string
    dataPublicacao: Date
    categoria: ICategoria
}

export interface NoticiaItem {
    id: number
    titulo: string
    subtitulo: string
    autor: string
    conteudo: string
    img: string
    dataPublicacao: Date
    categoriaId: number
    categoria: ICategoria
    tags?: ITag[]
}

export interface INoticia {
    id: number
    titulo: string
    subtitulo: string
    autor: string
    conteudo: string
    img: string
    dataPublicacao: Date
    categoriaId: number
    categoria: ICategoria
    tags?: ITag[]
}