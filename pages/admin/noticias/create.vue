<template>
    <div>
        <div class="grid grid-cols-12 gap-3 md:gap-4 my-4 md:mb-6 items-end">
            <div class="col-span-12 md:col-start-2 md:col-span-8 col-start-2">
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">Nova Notícia</h1>
                <p class="text-slate-500">Publique um novo conteúdo no portal.</p>
            </div>
        </div>

        <div class="grid grid-cols-12">
            <div class="col-span-12 md:col-start-2 md:col-span-10">
                <div class="card bg-white p-4 md:p-6 rounded-xl shadow-sm flex justify-center">
                    
                    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" 
                        class="flex flex-col gap-4 bg-gray-200 rounded-lg border border-blue-600 p-6 md:px-10 md:py-10 w-full"
                    >

                        <div class="flex flex-col gap-2">
                            <label for="titulo" class="font-bold text-gray-600">Título da Notícia</label>
                            <InputText 
                                name="titulo" 
                                type="text" 
                                placeholder="Ex: Lançamento do novo iPhone" 
                                fluid 
                                class="border border-gray-400 p-3 text-lg text-gray-600 font-bold"
                            />
                            <Message v-if="$form.titulo?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.titulo.error?.message }}
                            </Message>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="subtitulo" class="font-bold text-gray-600">Subtítulo (Opcional)</label>
                            <InputText 
                                name="subtitulo" 
                                type="text" 
                                placeholder="Um resumo curto..." 
                                fluid 
                                class="border border-gray-400 p-3 text-gray-600"
                            />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex flex-col gap-2">
                                <label for="categoriaId" class="font-bold text-gray-600">Categoria</label>
                                <Select 
                                    name="categoriaId" 
                                    :options="categorias" 
                                    optionLabel="nome" 
                                    optionValue="id" 
                                    placeholder="Selecione a categoria..." 
                                    fluid
                                    class="border border-gray-400 text-gray-600"
                                    :pt="{ root: { class: 'p-1' } }"
                                />
                                <Message v-if="$form.categoriaId?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.categoriaId.error?.message }}
                                </Message>
                            </div>

                            <div class="flex flex-col gap-2">
                                <label for="tags" class="font-bold text-gray-600">Tags</label>
                                <MultiSelect 
                                    name="tags" 
                                    :options="tagsOptions" 
                                    optionLabel="nome" 
                                    optionValue="id" 
                                    placeholder="Selecione as tags..." 
                                    fluid
                                    display="chip"
                                    class="border border-gray-400 text-gray-600"
                                    :pt="{ root: { class: 'p-1' } }"
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex flex-col gap-2">
                                    <label for="autor" class="font-bold text-gray-600">Autor</label>
                                    <Select 
                                        name="autor" 
                                        :options="autorOptions" 
                                        optionLabel="nome" 
                                        optionValue="value" 
                                        placeholder="Selecione o autor..." 
                                        fluid
                                        display="chip"
                                        class="border border-gray-400 text-gray-600"
                                        :pt="{ root: { class: 'p-1' } }"
                                    />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label for="img" class="font-bold text-gray-600">URL da Imagem</label>
                                <InputText 
                                    name="img" 
                                    type="text" 
                                    placeholder="https://..." 
                                    fluid 
                                    class="border border-gray-400 p-3 text-gray-600"
                                />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="conteudo" class="font-bold text-gray-600">Conteúdo</label>
                            <Textarea 
                                name="conteudo" 
                                rows="8" 
                                placeholder="Escreva o texto da notícia aqui..." 
                                fluid 
                                class="border border-gray-400 p-3 text-gray-600"
                            />
                            <Message v-if="$form.conteudo?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.conteudo.error?.message }}
                            </Message>
                        </div>

                        <div class="flex flex-col md:flex-row justify-center gap-4 mt-6">
                            <Button 
                                type="submit" 
                                label="Publicar Notícia" 
                                icon="pi pi-check" 
                                class="bg-blue-600 border-none hover:bg-blue-700 p-3 text-white"
                                :loading="loading" 
                            />
                            <Button 
                                label="Cancelar" 
                                class="bg-red-400 border-none hover:bg-red-500 p-3 text-white" 
                                @click="navigateTo('/admin/noticias')" 
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
import { ref, computed } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';

const toast = useToast();
const loading = ref(false);

const [{ data: categoriasResponse }, { data: tagsResponse }] = await Promise.all([
    useFetch<any>('/api/admin/categorias', { query: { limit: 100 } }),
    useFetch<any>('/api/admin/tags', { query: { limit: 100 } })
]);

const categorias = computed(() => categoriasResponse.value?.data || []);
const tagsOptions = computed(() => tagsResponse.value?.data || []);

const autorOptions = ref([
    { nome: 'Amanda', value: 'Amanda' }
]);

const initialValues = ref({
    titulo: '',
    subtitulo: '',
    conteudo: '',
    autor: [],
    img: '',
    categoriaId: null,
    tags: []
});

const zodSchema = z.object({
    titulo: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
    conteudo: z.string().min(10, 'O conteúdo é muito curto.'),
    autor: z.string().min(2, 'Autor é obrigatório'),
    categoriaId: z.union([z.number(), z.null()]).refine((val) => val !== null, { 
        message: 'Selecione uma categoria.' 
    }),
    tags: z.array(z.number()).optional(),
    subtitulo: z.string().optional(),
    img: z.string().url('Insira uma URL válida').optional().or(z.literal(''))
});

const resolver = ref(zodResolver(zodSchema));

const onFormSubmit = async (event: any) => {
    const { valid, values, errors } = event;

    if (valid) {
        loading.value = true;
        try {
            await $fetch('/api/admin/noticias', {
                method: 'POST',
                body: values
            });

            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Notícia publicada!', life: 3000 });
            
            setTimeout(() => {
                navigateTo('/admin/noticias');
            }, 1000);

        } catch (error: any) {
            toast.add({ 
                severity: 'error', 
                summary: 'Erro', 
                detail: error.data?.message || 'Erro ao publicar.', 
                life: 3000 
            });
        } finally {
            loading.value = false;
        }
    }
     else {
        console.warn('Validação falhou! Campos com erro:', errors);

        toast.add({ 
            severity: 'warn', 
            summary: 'Atenção', 
            detail: 'Verifique os campos obrigatórios em vermelho.', 
            life: 3000 
        });
    }
};

</script>