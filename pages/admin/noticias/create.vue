<template>
    <div>
        <div class="grid grid-cols-12 my-4 gap-3 md:gap-4 mb-4 md:mb-6 items-end">
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
                        <!-- Título -->
                        <div class="flex flex-col gap-2">
                            <label for="titulo" class="font-bold text-blue-400">Título da Notícia</label>
                            <InputText 
                                name="titulo" 
                                type="text" 
                                placeholder="Ex: Lançamento do novo iPhone" 
                                fluid 
                                class="border border-blue-400 p-3 text-lg text-gray-600 font-bold"
                            />
                            <Message v-if="$form.titulo?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.titulo.error?.message }}
                            </Message>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="subtitulo" class="font-bold text-blue-400">Subtítulo (Opcional)</label>
                            <InputText 
                                name="subtitulo" 
                                type="text" 
                                placeholder="Um resumo curto..." 
                                fluid 
                                class="border border-blue-400 p-3 text-gray-600"
                            />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Categoria -->
                            <div class="flex flex-col gap-2">
                                <label for="categoriaId" class="font-bold text-blue-400">Categoria</label>
                                <Select 
                                    name="categoriaId" 
                                    :options="categorias" 
                                    optionLabel="nome" 
                                    optionValue="id" 
                                    placeholder="Selecione..." 
                                    fluid
                                    class="border border-blue-400 text-gray-600"
                                    :pt="{ root: { class: 'p-1' } }"
                                />
                                <Message v-if="$form.categoriaId?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.categoriaId.error?.message }}
                                </Message>
                            </div>

                            <!-- Tags (MultiSelect) -->
                            <div class="flex flex-col gap-2">
                                <label for="tags" class="font-bold text-blue-400">Tags</label>
                                <MultiSelect 
                                    name="tags" 
                                    :options="tagsOptions" 
                                    optionLabel="nome" 
                                    optionValue="id" 
                                    placeholder="Selecione as tags..." 
                                    fluid
                                    display="chip"
                                    class="border border-blue-400 text-gray-600"
                                    :pt="{ root: { class: 'p-1' } }"
                                />
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="img" class="font-bold text-blue-400">Imagem</label>
                            <AdminUpload
                                v-model="img" :errorMessage="$form.img?.error?.message"
                            />
                            <Message v-if="$form.img?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.img.error?.message }}
                            </Message>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="autor" class="font-bold text-blue-400">Autor</label>
                            <Select 
                                name="autorId" 
                                :options="autorOptions" 
                                optionLabel="nome" 
                                optionValue="id" 
                                placeholder="Selecione o autor" 
                                fluid 
                                class="border border-blue-400 text-gray-600"
                                :pt="{ root: { class: 'p-1' } }"
                            />
                            <Message v-if="$form.autor?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.autor.error?.message }}
                            </Message>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="font-bold text-blue-400">Conteúdo</label>
                            <AdminTiptap 
                                v-model="conteudo" 
                                :errorMessage="editorError" 
                            />
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
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';
import type { CategoriaItem } from '~/server/interface/Categoria';
import type { TagItem } from '~/server/interface/Tag';
import type { AutorItem } from '~/server/interface/Autor';

interface ApiError {
    data?: {
        message?: string;
    };
}

interface FormSubmitEvent {
    valid: boolean;
    values: Record<string, unknown>; 
    errors: unknown;
}

const toast = useToast();
const loading = ref(false);
const conteudo = ref(''); 
const editorError = ref('');
const img = ref('');
const imgError = ref('');

const [{ data: categoriasResponse }, { data: tagsResponse }, { data: autorResponse }] = await Promise.all([
    useFetch<CategoriaItem[]>('/api/admin/categorias/list-all', { 
        key: 'categorias-list-all' 
    }),
    useFetch<TagItem[]>('/api/admin/tags/list-all', { 
        key: 'tags-list-all'
    }),
    useFetch<AutorItem[]>('/api/admin/autores/list-all', { 
        key: 'autores-list-all'
    })
]);

const categorias = computed(() => categoriasResponse.value || []);
const tagsOptions = computed(() => tagsResponse.value || []);
const autorOptions = computed(() => autorResponse.value)

const initialValues = ref({
    titulo: '',
    subtitulo: '',
    autorId: null, 
    categoriaId: null,
    tags: []
});

const zodSchema = z.object({
    titulo: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
    autorId: z.union([z.number(), z.null()]).refine((val) => val !== null, { 
        message: 'Selecione um autor.' 
    }),
    categoriaId: z.union([z.number(), z.null()]).refine((val) => val !== null, { 
        message: 'Selecione uma categoria.' 
    }),
    tags: z.array(z.number()).optional(),
    subtitulo: z.string().optional(),
});

type NoticiaFormSchema = z.infer<typeof zodSchema>;

const resolver = ref(zodResolver(zodSchema));

const onFormSubmit = async ({ valid, values, errors }: FormSubmitEvent) => {

    let isExtraValid = true;
    editorError.value = '';
    imgError.value = '';

    if (!conteudo.value || conteudo.value === '<p></p>') {
        editorError.value = 'O conteúdo é obrigatório.';
        isExtraValid = false;
    } else if (conteudo.value.replace(/<[^>]*>/g, '').length < 10) {
        editorError.value = 'O conteúdo é muito curto.';
        isExtraValid = false;
    }

    if (!img.value) {
        imgError.value = 'A imagem de capa é obrigatória.';
        isExtraValid = false;
    }

    if (valid && isExtraValid) {
        loading.value = true;

        const formValues = values as NoticiaFormSchema;

        const payload = {
            ...formValues,
            conteudo: conteudo.value,
            img: img.value
        };

        try {
            await $fetch('/api/admin/noticias', {
                method: 'POST',
                body: payload
            });

            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Notícia publicada!', life: 3000 });
            setTimeout(() => navigateTo('/admin/noticias'), 1000);

        } catch (err: unknown) {
            console.error('Erro na API:', err);
            const error = err as ApiError;
            toast.add({ severity: 'error', summary: 'Erro', detail: error.data?.message || 'Erro ao publicar.', life: 3000 });
        } finally {
            loading.value = false;
        }
    } else {
        console.warn('Validação falhou:', errors);
        toast.add({ severity: 'warn', summary: 'Atenção', detail: 'Verifique os campos obrigatórios.', life: 3000 });
    }
};
</script>