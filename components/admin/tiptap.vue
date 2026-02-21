<template>
    <div class="flex flex-col gap-1">
        <!-- Wrapper do Editor com borda condicional de erro -->
        <div 
            class="border rounded-lg overflow-hidden bg-white text-gray-700 transition-colors"
            :class="errorMessage ? 'border-red-500' : 'border-blue-400 focus-within:border-blue-600'"
        >
            <!-- Toolbar -->
            <div class="bg-gray-50 border-b border-gray-200 p-2 flex gap-2 flex-wrap items-center">
                
                <!-- Histórico (Undo/Redo) -->
                <button 
                    type="button" 
                    @click="editor?.chain().focus().undo().run()" 
                    :disabled="!editor?.can().chain().focus().undo().run()"
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Desfazer"
                >
                    <Icon name="material-symbols:undo" size="1.2em" />
                </button>
                <button 
                    type="button" 
                    @click="editor?.chain().focus().redo().run()" 
                    :disabled="!editor?.can().chain().focus().redo().run()"
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Refazer"
                >
                    <Icon name="material-symbols:redo" size="1.2em" />
                </button>

                <!-- Divisor -->
                <div class="w-px h-5 bg-gray-300 mx-1"></div>

                <!-- Formatação Básica -->
                <button 
                    type="button" 
                    @click="editor?.chain().focus().toggleBold().run()" 
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('bold') }" 
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                    title="Negrito"
                >
                    <Icon name="material-symbols:format-bold" size="1.2em" />
                </button>
                
                <button 
                    type="button" 
                    @click="editor?.chain().focus().toggleItalic().run()" 
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('italic') }" 
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                    title="Itálico"
                >
                    <Icon name="material-symbols:format-italic" size="1.2em" />
                </button>

                <button 
                    type="button" 
                    @click="editor?.chain().focus().toggleStrike().run()" 
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('strike') }" 
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                    title="Tachado"
                >
                    <Icon name="material-symbols:format-strikethrough" size="1.2em" />
                </button>

                <button 
                    type="button" 
                    @click="editor?.chain().focus().toggleCode().run()" 
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('code') }" 
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                    title="Código"
                >
                    <Icon name="material-symbols:code" size="1.2em" />
                </button>

                <!-- Divisor -->
                <div class="w-px h-5 bg-gray-300 mx-1"></div>

                <!-- Cabeçalhos -->
                <button 
                    type="button" 
                    @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" 
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('heading', { level: 2 }) }" 
                    class="p-1.5 rounded hover:bg-gray-200 font-bold text-sm transition-colors text-slate-700"
                    title="Título 2"
                >
                    H2
                </button>
                
                <button 
                    type="button" 
                    @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" 
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('heading', { level: 3 }) }" 
                    class="p-1.5 rounded hover:bg-gray-200 font-bold text-xs transition-colors text-slate-700"
                    title="Título 3"
                >
                    H3
                </button>

                <!-- Divisor -->
                <div class="w-px h-5 bg-gray-300 mx-1"></div>

                <!-- Nota (Footnote) -->
                <button 
                    type="button" 
                    @click="openFootnoteDialog"
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('footnote') }"
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                    title="Adicionar Nota (clique numa palavra primeiro)"
                >
                    <Icon name="material-symbols:note-add" size="1.2em" />
                </button>

                <button 
                    v-if="editor?.isActive('footnote')"
                    type="button" 
                    @click="removeFootnote"
                    class="p-1.5 rounded hover:bg-red-200 transition-colors text-red-600"
                    title="Remover Nota"
                >
                    <Icon name="material-symbols:close" size="1.2em" />
                </button>

                <!-- Divisor -->
                <div class="w-px h-5 bg-gray-300 mx-1"></div>
                <div class="relative">
                    <button 
                        type="button" 
                        @click="showClassMenu = !showClassMenu"
                        class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                        title="Estilo de Parágrafo"
                    >
                        <Icon name="material-symbols:palette" size="1.2em" />
                    </button>
                    <div 
                        v-if="showClassMenu"
                        class="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-48"
                    >
                        <button 
                            v-for="cls in paragraphClasses"
                            :key="cls.label"
                            type="button"
                            @click="applyParagraphClass(cls.value)"
                            class="w-full text-left px-3 py-2 hover:bg-blue-100 text-slate-700 text-sm transition-colors"
                        >
                            {{ cls.label }}
                        </button>
                    </div>
                </div>

                <!-- Divisor -->
                <div class="w-px h-5 bg-gray-300 mx-1"></div>

                <!-- Listas e Blocos -->
                <button 
                    type="button" 
                    @click="editor?.chain().focus().toggleBulletList().run()" 
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('bulletList') }" 
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                    title="Lista com marcadores"
                >
                    <Icon name="material-symbols:format-list-bulleted" size="1.2em" />
                </button>
                
                <button 
                    type="button" 
                    @click="editor?.chain().focus().toggleOrderedList().run()" 
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('orderedList') }" 
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                    title="Lista numerada"
                >
                    <Icon name="material-symbols:format-list-numbered" size="1.2em" />
                </button>

                <button 
                    type="button" 
                    @click="editor?.chain().focus().toggleBlockquote().run()" 
                    :class="{ 'bg-blue-200 text-blue-800': editor?.isActive('blockquote') }" 
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                    title="Citação"
                >
                    <Icon name="material-symbols:format-quote" size="1.2em" />
                </button>

                <button 
                    type="button" 
                    @click="editor?.chain().focus().setHorizontalRule().run()" 
                    class="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-700"
                    title="Linha Horizontal"
                >
                    <Icon name="material-symbols:horizontal-rule" size="1.2em" />
                </button>
            </div>

            <!-- Área de Edição -->
            <editor-content :editor="editor" />
        </div>
        
        <!-- Mensagem de Erro -->
        <small v-if="errorMessage" class="text-red-500 text-sm ml-1">{{ errorMessage }}</small>
    </div>

    <!-- Modal: Adicionar Nota -->
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="showFootnoteDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
                    <h3 class="text-lg font-bold mb-4 text-slate-800">Adicionar Nota</h3>
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-slate-700 mb-2">
                            ID da Nota (ex: "nota1", "explicacao-termos")
                        </label>
                        <input 
                            v-model="footnoteId"
                            type="text" 
                            placeholder="nota1"
                            @keyup.enter="applyFootnote"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autofocus
                        />
                        <p class="text-xs text-gray-500 mt-2">
                            Use este mesmo ID na sua nota de explicação (ex: &lt;p id="nota1"&gt;Explicação...&lt;/p&gt;)
                        </p>
                    </div>

                    <div class="flex gap-3 justify-end">
                        <button 
                            type="button"
                            @click="showFootnoteDialog = false"
                            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="button"
                            @click="applyFootnote"
                            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { watch, onBeforeUnmount, ref } from 'vue';
import { CustomParagraph, Footnote } from '~/server/utils/tiptap-extensions';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    errorMessage: {
        type: String,
        default: '',
    }
});

const emit = defineEmits(['update:modelValue']);

// UI state
const showClassMenu = ref(false);
const showFootnoteDialog = ref(false);
const footnoteId = ref('');

const paragraphClasses = [
    { label: 'Padrão', value: null },
    { label: 'Destaque vermelho (max-w-lg)', value: 'max-w-lg mx-auto texto-vermelho' },
    { label: 'Destaque azul (max-w-lg)', value: 'max-w-lg mx-auto texto-azul' },
    { label: 'Centralizado grande', value: 'text-2xl sm:text-3xl text-center' },
    { label: 'Citação', value: 'italic text-gray-600 border-l-4 border-gray-400 pl-4' },
];

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit.configure({
            paragraph: false,
        }),
        CustomParagraph,
        Footnote
    ],
    editorProps: {
        attributes: {
            class: 'focus:outline-none min-h-[300px] p-4 prose max-w-none text-slate-700', 
        },
    },
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.isEmpty ? '' : editor.getHTML());
    },
});

const applyParagraphClass = (classValue: string | null) => {
    if (!editor.value) return;
    if (classValue) {
        editor.value.chain().focus().setParagraphClass(classValue).run();
    } else {
        editor.value.chain().focus().removeParagraphClass().run();
    }
    showClassMenu.value = false;
};

const openFootnoteDialog = () => {
    footnoteId.value = '';
    showFootnoteDialog.value = true;
};

const applyFootnote = () => {
    if (!editor.value || !footnoteId.value.trim()) return;
    editor.value.chain().focus().setFootnote(footnoteId.value.trim()).run();
    showFootnoteDialog.value = false;
    footnoteId.value = '';
};

const removeFootnote = () => {
    if (!editor.value) return;
    editor.value.chain().focus().unsetFootnote().run();
};

watch(() => props.modelValue, (newValue) => {
    if (editor.value && newValue !== editor.value.getHTML()) {
        editor.value.commands.setContent(newValue, false as any);
    }
});

onBeforeUnmount(() => {
    editor.value?.destroy();
});
</script>

<style>
/* Estilos globais para o conteúdo dentro do editor */
.ProseMirror p {
    margin-bottom: 0.75em;
    line-height: 1.6;
}
.ProseMirror ul, .ProseMirror ol {
    padding-left: 1.5em;
    margin-bottom: 0.75em;
}
.ProseMirror ul {
    list-style-type: disc;
}
.ProseMirror ol {
    list-style-type: decimal;
}
.ProseMirror h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 1em;
    margin-bottom: 0.5em;
    color: #1e293b;
}
.ProseMirror h3 {
    font-size: 1.25em;
    font-weight: bold;
    margin-top: 1em;
    margin-bottom: 0.5em;
    color: #334155;
}
.ProseMirror blockquote {
    border-left: 4px solid #cbd5e1;
    padding-left: 1em;
    font-style: italic;
    color: #64748b;
}
/* Estilo para Código Inline */
.ProseMirror code {
    background-color: #f1f5f9;
    padding: 0.2em 0.4em;
    border-radius: 0.25em;
    color: #ef4444; /* vermelho */
    font-family: monospace;
    font-size: 0.9em;
}
/* Estilo para Linha Horizontal */
.ProseMirror hr {
    border: none;
    border-top: 2px solid #e2e8f0;
    margin: 2em 0;
}

/* Transição para o Modal */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>