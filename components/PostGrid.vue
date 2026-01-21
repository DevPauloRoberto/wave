<template>
    <div class="flex flex-col items-center">
        <!-- Grid de Posts -->
        <div class="grid grid-cols-12 justify-center gap-8 m-5">
            <div 
                v-for="noticia in posts" 
                :key="noticia.id" 
                class="col-span-12 md:col-span-6 lg:col-span-4 w-full flex justify-center opacity-0 translate-y-8 animate-on-scroll"
            >
                <NuxtLink 
                    :to="`/noticia/${noticia.id}`" 
                    class="flex flex-col items-center justify-between h-full w-full max-w-xl px-4 border-black text-center transition-transform duration-300 hover:scale-105"
                >
                    <div :class="noticia.tipo === 1 ? 'text-red-600' : 'text-blue-600'">
                        <h2 class="text-3xl font-bold sm:mx-8 mt-5" v-html="noticia.titulo"></h2>
                        
                        <h3 
                            v-if="noticia.subtitulo" 
                            class="text-xl font-medium mt-5 sm:mx-8 line-clamp-3"
                            v-html="noticia.subtitulo"
                        ></h3>
                        
                        <p class="text-lg mt-5 font-medium">{{ noticia.autor }}</p>
                    </div>

                    <img 
                        :src="noticia.img || '/img/hero.png'" 
                        alt="Capa" 
                        class="max-h-[250px] w-full object-cover rounded-b-[40px] mt-5 shadow-sm" 
                        loading="lazy"
                    >
                </NuxtLink>
            </div>
        </div>

        <!-- Botão Ver Mais -->
        <div v-if="hasMore" class="mt-8">
            <Button 
                label="Ver Mais" 
                icon="pi pi-arrow-down" 
                iconPos="right"
                class="bg-black text-white border-none hover:bg-slate-800 px-8 py-3 rounded-full text-lg font-medium transition-colors"
                :loading="loading"
                @click="$emit('loadMore')"
            />
        </div>

        <!-- Mensagem de Fim -->
        <p v-else-if="posts.length > 0" class="text-slate-400 my-8 italic">
            Você chegou ao fim das publicações.
        </p>

        <!-- Loading Inicial / Vazio -->
        <div v-if="loading && posts.length === 0" class="mt-10">
            <i class="pi pi-spin pi-spinner text-4xl text-slate-400"></i>
        </div>
        <p v-if="!loading && posts.length === 0" class="text-slate-500 mt-10">
            Nenhuma publicação encontrada.
        </p>
    </div>
</template>

<script setup lang="ts">
    import type { NoticiaLista } from '~/server/interface/Noticia';

    const props = defineProps({
        posts: {
            type: Array as PropType<NoticiaLista[]>,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        hasMore: {
            type: Boolean,
            default: false
        }
    });

    defineEmits(['loadMore']);

    watch(() => props.posts, () => {
        nextTick(() => {
            initScrollObserver();
        });
    }, { deep: true });
</script>