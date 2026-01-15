<template>
    <div>
        <div class="grid grid-cols-12 gap-3 md:gap-4 mb-4 md:mb-6 items-end">
            <div class="col-span-12 md:col-start-2 md:col-span-8 col-start-2">
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">Editar Notícia</h1>
                <p class="text-slate-500">Edite as informações da notícia existente.</p>
            </div>
        </div>

        <div class="grid grid-cols-12">
            <div class="col-span-12 md:col-start-2 md:col-span-10">
                <div class="card bg-white p-4 md:p-6 rounded-xl shadow-sm flex justify-center relative">
                    
                    <!-- Loading State -->
                    <div v-if="pending" class="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                        <i class="pi pi-spin pi-spinner text-4xl text-blue-600"></i>
                    </div>

                    <Form v-else v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" 
                        class="flex flex-col gap-4 bg-gray-200 rounded-lg border border-blue-600 p-6 md:px-10 md:py-10 w-full"
                    >
                        <!-- Título -->
                        <div class="flex flex-col gap-2">
                            <label for="titulo" class="font-bold text-blue-400">Título da Notícia</label>
                            <InputText name="titulo" type="text" fluid class="border border-blue-400 p-3 text-lg text-gray-600 font-bold" />
                            <Message v-if="$form.titulo?.invalid" severity="error" size="small" variant="simple">{{ $form.titulo.error?.message }}</Message>
                        </div>

                        <!-- Subtítulo -->
                        <div class="flex flex-col gap-2">
                            <label for="subtitulo" class="font-bold text-blue-400">Subtítulo</label>
                            <InputText name="subtitulo" type="text" fluid class="border border-blue-400 p-3 text-gray-600" />
                        </div>

                        <!-- FILTRO DE TIPO (Filtra Categoria e Tags) -->
                        <div class="flex flex-col gap-2">
                            <label class="font-bold text-blue-400">Tipo de Conteúdo</label>
                            <Select 
                                v-model="filtroTipo"
                                :options="TipoConteudoOptions"
                                optionLabel="nome"
                                optionValue="id"
                                placeholder="Selecione o tipo (Filtra categorias e tags)"
                                fluid
                                class="border border-blue-400 text-gray-600"
                                :pt="{ root: { class: 'p-1' } }"
                            />
                            <small class="text-gray-500">Selecione para filtrar as opções abaixo.</small>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Categoria -->
                            <div class="flex flex-col gap-2">
                                <label for="categoriaId" class="font-bold text-blue-400">Categoria</label>
                                <Select 
                                    name="categoriaId" 
                                    :options="categoriasFiltradas" 
                                    optionLabel="nome" 
                                    optionValue="id" 
                                    placeholder="Selecione..." 
                                    :disabled="!filtroTipo"
                                    fluid class="border border-blue-400 text-gray-600" :pt="{ root: { class: 'p-1' } }"
                                />
                                <Message v-if="$form.categoriaId?.invalid" severity="error" size="small" variant="simple">{{ $form.categoriaId.error?.message }}</Message>
                            </div>

                            <!-- Tags -->
                            <div class="flex flex-col gap-2">
                                <label for="tags" class="font-bold text-blue-400">Tags</label>
                                <MultiSelect 
                                    name="tags" 
                                    :options="tagsFiltradas" 
                                    optionLabel="nome" 
                                    optionValue="id" 
                                    placeholder="Selecione as tags..." 
                                    :disabled="!filtroTipo"
                                    fluid display="chip" class="border border-blue-400 text-gray-600" :pt="{ root: { class: 'p-1' } }"
                                />
                            </div>
                        </div>

                        <!-- Imagem -->
                        <div class="flex flex-col gap-2">
                            <label for="img" class="font-bold text-blue-400">Imagem</label>
                            <AdminUpload

                                v-model="img" :errorMessage="$form.img?.error?.message"

                            />
                            <Message v-if="$form.img?.invalid" severity="error" size="small" variant="simple">

                                {{ $form.img.error?.message }}

                            </Message>
                        </div>


                        <!-- Autor -->
                        <div class="flex flex-col gap-2">
                            <label for="autorId" class="font-bold text-blue-400">Autor</label>
                            <Select 
                                name="autorId" 
                                :options="autorOptions" 
                                optionLabel="nome" 
                                optionValue="id" 
                                placeholder="Selecione..." 
                                fluid class="border border-blue-400 text-gray-600" :pt="{ root: { class: 'p-1' } }"
                            />
                            <Message v-if="$form.autorId?.invalid" severity="error" size="small" variant="simple">{{ $form.autorId.error?.message }}</Message>
                        </div>

                        <!-- Conteúdo (TipTap) -->
                        <div class="flex flex-col gap-2">
                            <label class="font-bold text-blue-400">Conteúdo</label>
                            <AdminTiptap v-model="conteudo" :errorMessage="editorError" />
                        </div>

                        <!-- Botões -->
                        <div class="flex flex-col md:flex-row justify-center gap-4 mt-6">
                            <Button type="submit" label="Salvar Alterações" icon="pi pi-check" class="bg-blue-600 border-none hover:bg-blue-700 p-3 text-white" :loading="saving" />
                            <Button label="Cancelar" class="bg-red-400 border-none hover:bg-red-500 p-3 text-white" @click="navigateTo('/admin/noticias')" />
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';
import { TipoConteudoOptions } from '~/utils/enum'; // Importa as opções de tipo
import type { CategoriaItem } from '~/server/interface/Categoria';
import type { TagItem } from '~/server/interface/Tag';
import type { NoticiaItem } from '~/server/interface/Noticia';
import type { AutorItem } from '~/server/interface/Autor';


interface FormSubmitEvent {
    valid: boolean;
    values: Record<string, unknown>; 
    errors: unknown;
}

interface ApiError { data?: { message?: string; }; }

const route = useRoute();
const toast = useToast();
const saving = ref(false);
const noticiaId = route.params.id;
const conteudo = ref(''); 
const editorError = ref('');
const img = ref('');
const imgError = ref('');

// Variável para controlar o filtro visual
const filtroTipo = ref<number | null>(null);

const [{ data: categoriasResponse }, { data: tagsResponse }, { data: autorResponse }, { data: noticiaData, error: fetchError, pending }] = await Promise.all([
    useFetch<CategoriaItem[]>('/api/admin/categorias/list-all', { key: 'cat-opts' }),
    useFetch<TagItem[]>('/api/admin/tags/list-all', { key: 'tag-opts' }),
    useFetch<AutorItem[]>('/api/admin/autores/list-all', { key: 'autores-list-all'}),
    useFetch<NoticiaItem>(`/api/admin/noticias/${noticiaId}`, { key: `noticia-${noticiaId}` })
]);

if (fetchError.value) {
    if (import.meta.client) {
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Notícia não encontrada', life: 3000 });
        setTimeout(() => navigateTo('/admin/noticias'), 1000);
    }
}

if (!noticiaData.value && !pending.value) {
     if (import.meta.client) {
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Notícia não encontrada', life: 3000 });
        setTimeout(() => navigateTo('/admin/noticias'), 1000);
    }
}

const todasCategorias = computed(() => categoriasResponse.value || []);
const todasTags = computed(() => tagsResponse.value || []);
const autorOptions = computed(() => autorResponse.value || []);

// COMPUTEDS PARA FILTRAGEM
// Se filtroTipo tiver valor, retorna só os itens daquele tipo.
const categoriasFiltradas = computed(() => {
    if (!filtroTipo.value) return []; // Retorna vazio se não selecionou tipo (para forçar seleção)
    return todasCategorias.value.filter(c => c.tipo === filtroTipo.value);
});

const tagsFiltradas = computed(() => {
    if (!filtroTipo.value) return [];
    return todasTags.value.filter(t => t.tipo === filtroTipo.value);
});

// Limpa seleções se mudar o tipo para evitar inconsistência
// Mas APENAS se o usuário mudar manualmente, não no carregamento inicial
const isInitialLoad = ref(true);

watch(filtroTipo, (newVal, oldVal) => {
    if (isInitialLoad.value) {
        isInitialLoad.value = false;
        return;
    }
    
    // Se o usuário mudou o tipo, limpa a seleção anterior
    if (newVal !== oldVal) {
        initialValues.value.categoriaId = null;
        initialValues.value.tags = [];
    }
});

const initialValues = ref({
    titulo: '',
    subtitulo: '',
    autorId: 0, 
    categoriaId: 0 as number | null,
    tags: [] as number[]
});

if (noticiaData.value) {
    conteudo.value = noticiaData.value.conteudo;
    img.value = noticiaData.value.img || '';
    
    // Tenta descobrir o tipo baseado na categoria da notícia
    if (noticiaData.value.categoriaId) {
        const categoriaDaNoticia = todasCategorias.value.find(c => c.id === noticiaData.value.categoriaId);
        if (categoriaDaNoticia) {
            filtroTipo.value = categoriaDaNoticia.tipo;
        }
    }
    
    initialValues.value = {
        titulo: noticiaData.value.titulo,
        subtitulo: noticiaData.value.subtitulo || '',
        autorId: noticiaData.value.autorId,
        categoriaId: noticiaData.value.categoriaId,
        tags: noticiaData.value.tags ? noticiaData.value.tags.map(t => t.id) : []
    };
}

const zodSchema = z.object({
    titulo: z.string().min(3, 'Mínimo 3 caracteres.'),
    autorId: z.union([z.number(), z.null()]).refine((val) => val !== null, { message: 'Selecione um autor.' }),
    categoriaId: z.union([z.number(), z.null()]).refine((val) => val !== null, { message: 'Selecione uma categoria.' }),
    tags: z.array(z.number()).optional(),
    subtitulo: z.string().optional(),
});

type NoticiaFormSchema = z.infer<typeof zodSchema>;

const resolver = ref(zodResolver(zodSchema));

const onFormSubmit = async ({ valid, values }: FormSubmitEvent) => {
    let isContentValid = true;
    let isExtraValid = true;
    editorError.value = '';
    imgError.value = '';

    if (!conteudo.value || conteudo.value === '<p></p>' || conteudo.value.replace(/<[^>]*>/g, '').length < 10) {
        editorError.value = 'Conteúdo muito curto ou vazio.';
        isContentValid = false;
    }

    if (!img.value) {
        imgError.value = 'A imagem de capa é obrigatória.';
        isExtraValid = false;
    }

    if (valid && isContentValid && isExtraValid) {
        saving.value = true;
        const formValues = values as NoticiaFormSchema;

        const payload = {
            ...formValues,
            conteudo: conteudo.value,
            img: img.value
        };

        try {
            await $fetch(`/api/admin/noticias/${noticiaId}`, {
                method: 'PUT',
                body: payload
            });

            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Notícia atualizada!', life: 3000 });
            setTimeout(() => navigateTo('/admin/noticias'), 1000);
        } catch (err: unknown) {
            const error = err as ApiError;
            toast.add({ severity: 'error', summary: 'Erro', detail: error.data?.message || 'Erro ao atualizar.', life: 3000 });
        } finally {
            saving.value = false;
        }
    } else {
        toast.add({ severity: 'warn', summary: 'Atenção', detail: 'Verifique os campos obrigatórios.', life: 3000 });
    }
};
</script>