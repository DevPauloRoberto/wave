<template>
    <div 
    :class="catTipo === 1 ? 'text-red-600' : 'text-blue-600'"
    class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
        <div 
        :class="catTipo === 1 ? 'bg-red-600' : 'bg-blue-600'"
        class="h-1 bg-black flex-1 mx-4 rounded-full"></div>

        <h2 class="text-center text-3xl font-medium uppercase">
            {{ catName }}
        </h2>
        
        <div 
        :class="catTipo === 1 ? 'bg-red-600' : 'bg-blue-600'"
        class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
    </div>
    
    <PostGrid 
        :posts="noticias" 
        :loading="loading" 
        :hasMore="hasMore" 
        @loadMore="loadMore" 
    />
</template>

<script setup lang="ts">
import type { NoticiaLista } from '~/server/interface/Noticia';

const route = useRoute();
const catId = route.params.id; 

const noticias = ref<NoticiaLista[]>([]);
const catName = ref('');
const catTipo = ref();
const page = ref(1);
const limit = 6;
const loading = ref(false);
const hasMore = ref(true);

const fetchNoticias = async () => {
    if (!catId) return;

    loading.value = true;
    try {
        const response = await $fetch<{ data: NoticiaLista[], total: number, catName: string, catTipo: number }>(`/api/noticias/categorias/${catId}`, {
            params: {
                page: page.value,
                limit: limit
            }
        });
        console.log(response)

        // Define o nome da cat
        if (response.catName) {
            catName.value = response.catName;
        }
         if (response.catTipo) {
            catTipo.value = response.catTipo;
        }

        const novosPosts = response.data || [];
        
        if (novosPosts.length > 0) {
            noticias.value.push(...novosPosts);
        }

        if (novosPosts.length < limit) {
            hasMore.value = false;
        }

    } catch (error) {
        console.error('Erro ao carregar notícias da tag:', error);
        hasMore.value = false;
    } finally {
        loading.value = false;
    }
};

const loadMore = () => {
    page.value++;
    fetchNoticias();
};

onMounted(() => {
    fetchNoticias();
});
</script>