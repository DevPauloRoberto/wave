/**
 * Declaração de tipos globais para extensões customizadas do TipTap.
 * Este arquivo é necessário para que os comandos customizados
 * sejam reconhecidos pelo TypeScript no contexto do cliente (Vue).
 */
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        textHighlight: {
            setTextHighlight: (color: 'vermelho' | 'azul') => ReturnType
            unsetTextHighlight: () => ReturnType
        }
        footnote: {
            setFootnote: (options: { noteId: string; color?: 'vermelho' | 'azul' }) => ReturnType
            unsetFootnote: () => ReturnType
        }
        footnoteRef: {
            setFootnoteRef: (options: { noteId: string; color?: 'vermelho' | 'azul' }) => ReturnType
            unsetFootnoteRef: () => ReturnType
        }
    }
}

export { }
