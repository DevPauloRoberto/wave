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
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { watch, onBeforeUnmount } from 'vue';

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

const editor = useEditor({
    content: props.modelValue,
    extensions: [StarterKit],
    editorProps: {
        attributes: {
            class: 'focus:outline-none min-h-[300px] p-4 prose max-w-none text-slate-700', 
        },
    },
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.isEmpty ? '' : editor.getHTML());
    },
});

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
</style>