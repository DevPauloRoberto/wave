import { AutorItem } from './Autor';
import { CategoriaItem } from './Categoria';
import { TagItem } from './Tag';

export interface NoticiaListaAdmin {
    id: number
    titulo: string
    dataPublicacao: Date
    categoria: CategoriaItem
}

export interface NoticiaLista {
    id: number;
    titulo: string;
    subtitulo: string;
    img: string;
    autor: string;
    categoria?: string;
    tags?: TagItem;
    tipo: number;
}

export interface NoticiaItem {
    id: number
    titulo: string
    subtitulo: string
    autorId: number
    conteudo: string
    notas: string
    referencias: string
    img: string
    dataPublicacao: Date
    categoriaId: number
    categoria: CategoriaItem
    tags: TagItem[]
}

export interface NoticiaPublicItem {
    id: number
    titulo: string
    subtitulo: string
    autorId: number
    autor: AutorItem
    conteudo: string
    notas: string
    referencias: string
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
    notas: string
    referencias: string
    img: string
    dataPublicacao: Date
    categoriaId: number
    categoria: CategoriaItem
    tags: TagItem[]
}