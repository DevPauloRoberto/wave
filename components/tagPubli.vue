<template>
    <div 
    :class="tagTipo === 1 ? 'text-red-600' : 'text-blue-600'"
    class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
        <div 
        :class="tagTipo === 1 ? 'bg-red-600' : 'bg-blue-600'"
        class="h-1 bg-black flex-1 mx-4 rounded-full"></div>

        <h2 class="text-center text-3xl font-medium uppercase">
            {{ tagName }}
        </h2>
        
        <div 
        :class="tagTipo === 1 ? 'bg-red-600' : 'bg-blue-600'"
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
const tagId = route.params.id; 

const noticias = ref<NoticiaLista[]>([]);
const tagName = ref('');
const tagTipo = ref();
const page = ref(1);
const limit = 6;
const loading = ref(false);
const hasMore = ref(true);

const fetchNoticias = async () => {
    if (!tagId) return;

    loading.value = true;
    try {
        const response = await $fetch<{ data: NoticiaLista[], total: number, tagName: string, tagTipo: number }>(`/api/noticias/tags/${tagId}`, {
            params: {
                page: page.value,
                limit: limit
            }
        });

        // Define o nome da tag
        if (response.tagName) {
            tagName.value = response.tagName;
        }
         if (response.tagTipo) {
            tagTipo.value = response.tagTipo;
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