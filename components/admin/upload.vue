<template>
    <div class="flex flex-col gap-3">
        <div v-if="modelValue" class="relative w-full h-64 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden group">
            <img :src="modelValue" alt="Preview" class="max-w-full max-h-full object-contain" />
            <button 
                type="button"
                @click="removeImage"
                class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remover Imagem"
            >
                <Icon name="material-symbols:close" size="1.2em" />
            </button>
        </div>
        <div v-else>
            <FileUpload 
                mode="advanced" 
                name="file" 
                url="/api/admin/upload" 
                accept="image/*" 
                :maxFileSize="2000000" 
                :auto="true" 
                chooseLabel="Escolher Imagem"
                @upload="onUpload"
                @error="onError"
                :pt="{
                    root: { class: 'border border-blue-400 rounded-lg bg-white' },
                    content: { class: 'p-4 flex flex-col items-center justify-center border-none' },
                    chooseButton: { class: 'w-full md:w-auto bg-blue-600' }
                }"
            >
            </FileUpload>
        </div>
        <small v-if="errorMessage" class="text-red-500">{{ errorMessage }}</small>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";

const props = defineProps({
    modelValue: { type: String, default: '' },
    errorMessage: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);
const toast = useToast();

const onUpload = (event: any) => {
    try {
        const response = JSON.parse(event.xhr.response);
        
        if (response.url) {
            emit('update:modelValue', response.url);
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Upload concluído!', life: 3000 });
        }
    } catch (e) {
        console.error(e);
        onError();
    }
};

const onError = () => {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao enviar imagem.', life: 3000 });
};

const removeImage = () => {
    emit('update:modelValue', '');
};
</script>