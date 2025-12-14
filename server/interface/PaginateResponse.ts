import { TagItem } from "./Tag";
import { CategoriaItem } from "./Categoria";
import { NoticiaListaAdmin } from "./Noticia";

export interface ApiResponse {
    total: number;
    data: TagItem[] | CategoriaItem[] | NoticiaListaAdmin[];
    page: number;
    limit: number;
}