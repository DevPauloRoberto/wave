import Paragraph from '@tiptap/extension-paragraph'
import { Mark } from '@tiptap/core'

/**
 * Extension: Paragraph com suporte a atributos 'class' customizados.
 * Permite usar classes Tailwind e custom em párrafos do editor.
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
            setParagraphClass: (classNames: string) => ({ commands }) => {
                return commands.updateAttributes('paragraph', { class: classNames })
            },
            removeParagraphClass: () => ({ commands }) => {
                return commands.updateAttributes('paragraph', { class: null })
            }
        }
    }
})

/**
 * Extension: Footnote Mark
 * Permite criar notas numeradas com links bidirecionais.
 * Sintaxe: clique no texto, aplique a marca "nota" com um ID único.
 * 
 * Quando renderizado, o HTML inclui:
 * - Links clicáveis para ir até a nota de explicação
 * - Âncoras com IDs para anchor navigation
 */
export const Footnote = Mark.create({
    name: 'footnote',

    addAttributes() {
        return {
            noteId: {
                default: null,
                parseHTML: element => element.getAttribute('data-note-id'),
                renderHTML: attributes => {
                    return attributes.noteId
                        ? { 'data-note-id': attributes.noteId }
                        : {}
                }
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'a[data-note-id]',
            }
        ]
    },

    renderHTML({ attributes }) {
        return [
            'a',
            {
                'data-note-id': attributes.noteId,
                class: 'font-semibold underline text-blue-600 hover:text-blue-800 cursor-pointer transition-colors',
                href: `#note-${attributes.noteId}`,
            },
            0,
        ]
    },

    addCommands() {
        return {
            setFootnote: (noteId: string) => ({ commands }) => {
                return commands.setMark(this.name, { noteId })
            },
            toggleFootnote: (noteId: string) => ({ commands }) => {
                return commands.toggleMark(this.name, { noteId })
            },
            unsetFootnote: () => ({ commands }) => {
                return commands.unsetMark(this.name)
            }
        }
    }
})
