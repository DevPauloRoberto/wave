<template>
    <div>
        <div class="grid grid-cols-12 gap-3 md:gap-4 my-4 md:mb-6 items-end">
            <div class="col-span-12 md:col-start-2 md:col-span-8 col-start-2">
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">Nova Categoria</h1>
                <p class="text-slate-500">Crie uma nova categoria para organizar suas notícias.</p>
            </div>
        </div>

       <div class="grid grid-cols-12">
            <div class="col-span-12 md:col-start-2 md:col-span-10">
                <div class="card bg-white p-4 md:p-6 rounded-xl shadow-sm flex justify-center">
                    <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit" 
                        class="flex flex-col gap-4 bg-gray-200 rounded-lg border border-blue-600 p-6 md:px-20 md:py-10"
                    >
                        <div class="flex flex-col gap-2">
                            <label for="nome" class="font-bold text-grey-600">Nome da Categoria</label>
                            <InputText 
                                name="nome" 
                                type="text" 
                                placeholder="Ex: Noticias" 
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
                                label="Salvar Categoria" 
                                icon="pi pi-check" 
                                class="bg-blue-600 border-none hover:bg-blue-700 p-3 text-white"
                                :loading="loading" 
                            />
                            <Button 
                                label="Cancelar" 
                                class="bg-red-400 border-none hover:bg-red-500 p-3 text-white"
                                text 
                                @click="navigateTo('/admin/categorias')" 
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

const toast = useToast();
const loading = ref(false);


const zodSchema = z.object({
    nome: z.string().min(1, { message: 'O nome da categoria é obrigatório.' })
});

const resolver = ref(zodResolver(zodSchema));

const onFormSubmit = async (event: any) => {
    const { valid, values } = event;

    if (valid) {
        loading.value = true;
        try {
            await $fetch('/api/admin/categorias/', {
                method: 'POST',
                body: {
                    nome: values.nome
                }
            });
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria criada com sucesso!', life: 3000 });
            setTimeout(() => {
                navigateTo('/admin/categorias');
            }, 1000);

        } catch (error: any) {
            toast.add({ 
                severity: 'error', 
                summary: 'Erro', 
                detail: error.data?.message || 'Erro ao criar categoria.', 
                life: 3000 
            });
        } finally {
            loading.value = false;
        }
    }
};
</script>