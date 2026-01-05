<template>
    <div>
        <div class="grid grid-cols-12 gap-4 mb-6">
            <div class="col-span-12 md:col-start-2 md:col-span-8">
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">Editar Autor</h1>
                <p class="text-slate-500 text-sm md:text-base">Edite as informações do autor existente.</p>
            </div>
        </div>

       <div class="grid grid-cols-12">
            <div class="col-span-12 md:col-start-2 md:col-span-10">
                <div v-if="pending" class="flex justify-center p-10 w-full">
                        <i class="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
                </div>
                <div class="card bg-white p-4 md:p-6 rounded-xl shadow-sm flex justify-center">
                    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" 
                        class="flex flex-col gap-4 bg-gray-200 rounded-lg border border-blue-600 p-6 md:px-20 md:py-10"
                    >
                        <div class="flex flex-col gap-2">
                            <label for="nome" class="font-bold text-gray-600">Nome do Autor</label>
                            <InputText 
                                name="nome" 
                                type="text" 
                                placeholder="Ex: Amanda" 
                                fluid 
                                class="border border-gray-400 p-3 text-lg font-bold"
                            />
                            <Message v-if="$form.nome?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.nome.error?.message }}
                            </Message>
                        </div>

                        <div class="flex flex-col md:flex-row justify-center gap-4 mt-4">
                            <Button 
                                type="submit" 
                                label="Salvar Tag" 
                                icon="pi pi-check" 
                                class="bg-blue-600 border-none hover:bg-blue-700 p-3 text-white"
                                :loading="loading" 
                            />
                            <Button 
                                label="Cancelar" 
                                class="bg-red-400 border-none hover:bg-red-500 p-3 text-white"
                                text 
                                @click="navigateTo('/admin/autores')" 
                            />
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <Toast />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';
import type { AutorItem } from '~/server/interface/Autor';

const route = useRoute();
const toast = useToast();
const saving = ref(false);
const autorId = route.params.id;
const loading = ref(false);

const { data: autor, pending, error } = await useFetch<AutorItem>(`/api/admin/autores/${autorId}`);

if (error.value) {
    if (import.meta.client) {
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Tag não encontrada', life: 3000 });
        setTimeout(() => navigateTo('/admin/autores'), 2000);
    }
}

const initialValues = ref({
    nome: autor.value?.nome || ''
});

const zodSchema = z.object({
    nome: z.string().min(1, { message: 'O nome do autor é obrigatório.' })
});

const resolver = ref(zodResolver(zodSchema));

const onFormSubmit = async (event: any) => {
    const { valid, values } = event;
    if (valid) {
        saving.value = true;
        try {
            await $fetch(`/api/admin/autores/${autorId}`, {
                method: 'PUT',
                body: {
                    nome: values.nome
                }
            });
            
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Autor atualizado com sucesso!', life: 3000 });
            
            setTimeout(() => {
                navigateTo('/admin/autores');
            }, 1000);

        } catch (error: any) {
            toast.add({ 
                severity: 'error', 
                summary: 'Erro', 
                detail: error.message || 'Erro ao salvar alterações.', 
                life: 3000 
            });
        } finally {
            saving.value = false;
        }
    }
};

</script>