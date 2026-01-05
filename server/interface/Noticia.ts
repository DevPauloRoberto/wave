import { CategoriaItem } from './Categoria';
import { TagItem } from './Tag';

export interface NoticiaListaAdmin {
    id: number
    titulo: string
    dataPublicacao: Date
    categoria: CategoriaItem
}

export interface NoticiaItem {
    id: number
    titulo: string
    subtitulo: string
    autorId: number
    conteudo: string
    img: string
    dataPublicacao: Date
    categoriaId: number
    categoria: CategoriaItem
    tags: TagItem[]
}

export interface INoticia {
    id: number
    titulo: string
    subtitulo: string
    autorId: number
    conteudo: string
    img: string
    dataPublicacao: Date
    categoriaId: number
    categoria: CategoriaItem
    tags: TagItem[]
}