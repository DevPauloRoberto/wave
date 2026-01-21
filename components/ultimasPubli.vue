<template>
    <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
        <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
        <h2 class="text-center text-3xl font-medium">
            Ultimas publicações
        </h2>
        <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
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

    const noticias = ref<NoticiaLista[]>([]);
    const page = ref(1);
    const limit = 6;
    const loading = ref(false);
    const hasMore = ref(true);

    const fetchNoticias = async () => {
        loading.value = true;
        try {
            const response = await $fetch<{ data: NoticiaLista[], total: number }>('/api/noticias', {
                params: { page: page.value, limit }
            });

            const novos = response.data || [];
            if (novos.length > 0) noticias.value.push(...novos);
            if (novos.length < limit) hasMore.value = false;

        } catch (error) {
            console.error(error);
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