import Paragraph from '@tiptap/extension-paragraph'
import { Mark, mergeAttributes } from '@tiptap/core'

/**
 * Declaração de tipos para comandos customizados do TipTap.
 * Garante type safety em toda a aplicação.
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

/**
 * CustomParagraph - Parágrafo com suporte a classes CSS customizadas.
 */
export const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => {
                    return attributes.class ? { class: attributes.class } : {}
                }
            }
        }
    },

    addCommands() {
        return {
            ...this.parent?.(),
            setParagraphClass: (classNames: string) => ({ commands }: any) => {
                return commands.updateAttributes('paragraph', { class: classNames })
            },
            removeParagraphClass: () => ({ commands }: any) => {
                return commands.updateAttributes('paragraph', { class: null })
            }
        }
    }
})

/**
 * TextHighlight - Mark inline para texto colorido (texto-vermelho / texto-azul).
 * Envolve o texto selecionado em <span class="texto-vermelho"> ou <span class="texto-azul">.
 */
export const TextHighlight = Mark.create({
    name: 'textHighlight',

    addAttributes() {
        return {
            color: {
                default: 'vermelho',
                parseHTML: element => {
                    if (element.classList.contains('texto-azul')) return 'azul'
                    return 'vermelho'
                },
                renderHTML: () => ({})
            }
        }
    },

    parseHTML() {
        return [
            { tag: 'span.texto-vermelho' },
            { tag: 'span.texto-azul' },
        ]
    },

    renderHTML({ HTMLAttributes, mark }) {
        const color = mark.attrs.color || 'vermelho'
        return ['span', mergeAttributes(HTMLAttributes, {
            class: `texto-${color}`,
        }), 0]
    },

    addCommands() {
        return {
            setTextHighlight: (color: 'vermelho' | 'azul') => ({ commands }: any) => {
                return commands.setMark('textHighlight', { color })
            },
            unsetTextHighlight: () => ({ commands }: any) => {
                return commands.unsetMark('textHighlight')
            }
        }
    }
})

/**
 * Footnote Mark - Cria um link clicável em uma palavra que navega até a referência.
 * Renderiza: <a data-note-id="xxx" href="#note-xxx" class="nota-azul/nota-vermelha">palavra</a>
 * 
 * Uso: Selecione UMA palavra, aplique a nota com um ID.
 * Essa palavra se torna clicável e leva até a referência (FootnoteRef) com o mesmo ID.
 */
export const Footnote = Mark.create({
    name: 'footnote',

    addAttributes() {
        return {
            noteId: {
                default: null,
                parseHTML: element => element.getAttribute('data-note-id'),
                renderHTML: attributes => {
                    return attributes.noteId ? { 'data-note-id': attributes.noteId } : {}
                }
            },
            color: {
                default: 'azul',
                parseHTML: element => {
                    if (element.classList.contains('nota-vermelha')) return 'vermelho'
                    return 'azul'
                },
                renderHTML: () => ({})
            }
        }
    },

    parseHTML() {
        return [{ tag: 'a[data-note-id]' }]
    },

    renderHTML({ HTMLAttributes, mark }) {
        const color = mark.attrs.color || 'azul'
        const noteId = mark.attrs.noteId
        const colorClass = color === 'vermelho' ? 'nota-vermelha' : 'nota-azul'

        return ['a', mergeAttributes(HTMLAttributes, {
            class: colorClass,
            href: `#note-${noteId}`,
        }), 0]
    },

    addCommands() {
        return {
            setFootnote: (options: { noteId: string; color?: 'vermelho' | 'azul' }) => ({ commands }: any) => {
                return commands.setMark('footnote', { noteId: options.noteId, color: options.color || 'azul' })
            },
            unsetFootnote: () => ({ commands }: any) => {
                return commands.unsetMark('footnote')
            }
        }
    }
})

/**
 * FootnoteRef Mark - Destino/referência de uma nota.
 * Renderiza: <span data-note-ref="xxx" id="note-xxx" class="ref-azul/ref-vermelha">palavra</span>
 * 
 * Uso: Selecione UMA palavra, aplique a referência com o MESMO ID usado na nota.
 * Quando o usuário clicar na nota (Footnote), será levado até esta referência.
 */
export const FootnoteRef = Mark.create({
    name: 'footnoteRef',

    addAttributes() {
        return {
            noteId: {
                default: null,
                parseHTML: element => element.getAttribute('data-note-ref'),
                renderHTML: attributes => {
                    return attributes.noteId ? { 'data-note-ref': attributes.noteId } : {}
                }
            },
            color: {
                default: 'azul',
                parseHTML: element => {
                    if (element.classList.contains('ref-vermelha')) return 'vermelho'
                    return 'azul'
                },
                renderHTML: () => ({})
            }
        }
    },

    parseHTML() {
        return [{ tag: 'span[data-note-ref]' }]
    },

    renderHTML({ HTMLAttributes, mark }) {
        const color = mark.attrs.color || 'azul'
        const noteId = mark.attrs.noteId
        const colorClass = color === 'vermelho' ? 'ref-vermelha' : 'ref-azul'

        return ['span', mergeAttributes(HTMLAttributes, {
            class: colorClass,
            id: `note-${noteId}`,
        }), 0]
    },

    addCommands() {
        return {
            setFootnoteRef: (options: { noteId: string; color?: 'vermelho' | 'azul' }) => ({ commands }: any) => {
                return commands.setMark('footnoteRef', { noteId: options.noteId, color: options.color || 'azul' })
            },
            unsetFootnoteRef: () => ({ commands }: any) => {
                return commands.unsetMark('footnoteRef')
            }
        }
    }
})
