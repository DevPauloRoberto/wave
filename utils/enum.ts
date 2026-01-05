// Define os IDs fixos para salvar no banco (INT)
export enum TipoConteudo {
    KPOP = 1,
    KDRAMA = 2
}

// Mapa de Labels para exibir na tela
export const TipoConteudoLabel: Record<number, string> = {
    [TipoConteudo.KPOP]: 'K-Pop',
    [TipoConteudo.KDRAMA]: 'K-Drama'
};

// Array pronto para usar em <Select> ou <Dropdown> do PrimeVue
// Ex: :options="TipoConteudoOptions" optionLabel="nome" optionValue="id"
export const TipoConteudoOptions = [
    { id: TipoConteudo.KPOP, nome: TipoConteudoLabel[TipoConteudo.KPOP] },
    { id: TipoConteudo.KDRAMA, nome: TipoConteudoLabel[TipoConteudo.KDRAMA] }
];