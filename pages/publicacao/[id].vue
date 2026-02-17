<template>
    <div class="grid grid-cols-12 h-fit">
        <Lateral />
        <div class="col-span-12 lg:col-span-9 h-fit">
            <!-- HeaderDesktop -->
            <HeaderDesktop />
            <div class="border border-black border-l-4 w-full h-full">
                <div class="mx-8 mt-5 h-full opacity-0 translate-y-8 animate-on-scroll">
                    <h1 
                    :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                    class="rubik text-5xl sm:text-6xl my-10 font-bold">
                        {{ noticiaData?.titulo }}
                    </h1>
                    <h2 class="noto-serif text-4xl sm:text-5xl mb-10">
                        {{ noticiaData?.subtitulo }}
                    </h2>
                    <p 
                    class="text-2xl sm:text-3xl mb-5 underline noto-serif"
                    :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                    >
                        {{ noticiaData?.autor?.nome }}
                    </p>
                    <p 
                    class="text-xl sm:text-2xl noto-serif"
                    :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                    >
                        {{ noticiaData?.dataPublicacao }}
                    </p>
                    <img
                        :src="noticiaData?.img"
                        alt="Capa"
                        class="max-h-[43rem] w-full object-cover rounded-b-[40px] mt-5 shadow-sm"
                        loading="lazy"
                    >
                    <div class="w-full flex justify-center">
                        <p class="max-w-lg mt-10 pb-20 text-xl sm:text-2xl text-center">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias facilis ab ad tempore ducimus saepe commodi atque, suscipit, ratione numquam laborum qui voluptatem animi quas.
                        </p>
                    </div>

                    <div 
                    v-html="noticiaData?.conteudo" 
                    class="barlow sm:text-xl text-lg space-y-4 opacity-0 translate-y-8 animate-on-scroll"></div>
                </div>
                <div >
                    <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                        <div class="h-1 bg-black sm:w-32 mx-4 rounded-full"></div>
                        <h1 class="text-center text-4xl font-medium zilla-slab italic">
                            Expediente
                        </h1>
                        <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                    </div>
                    <div class="mx-4 text-2xl mt-8 opacity-0 translate-y-8 animate-on-scroll">
                        <h3 class="font-bold py-2">Texto e pesquisa</h3>
                        <p 
                        class="underline"
                        :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                        >
                            {{ noticiaData?.autor?.nome }}
                        </p>
                        <h3 class="font-bold py-2">Design e Ilustração</h3>
                        <p 
                        class="underline"
                        :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'">
                            {{ noticiaData?.autor?.nome }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                    <div class="h-1 bg-black sm:w-32 mx-4 rounded-full"></div>
                    <h1 class="text-center text-4xl font-medium zilla-slab italic">
                        Tags
                    </h1>
                    <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                </div>
                <ul class="ml-1 mt-10 flex flex-row flex-wrap texto-vermelho font-medium zilla-slab opacity-0 translate-y-8 animate-on-scroll">
                    <li 
                    v-for="tag in noticiaData?.tags" 
                    :key="tag.id" 
                    :class="tag.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                    class="flex items-center text-xl">
                        <span
                        :class="tag.tipo === 1 ? 'fundo-vermelho' : 'fundo-azul'"
                        class="w-1.5 h-1.5 mx-3 rounded-full">
                        </span>
                        <NuxtLink 
                        :class="tag.tipo === 1 ? 'hover:text-red-800' : 'hover:text-blue-800'"
                        class="underline uppercase" 
                        :to="`/tags/kpop/${tag.id}`">
                            <span v-html="tag.nome"></span>
                        </NuxtLink>
                    </li>
                </ul>
                <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                    <div class="h-1 bg-black sm:w-32 mx-4 rounded-full"></div>
                    <h1 class="text-center text-4xl font-medium zilla-slab italic">
                        Compartilhe essa publicação
                    </h1>
                    <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                </div>
                <div class="pb-48"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NoticiaPublicItem } from '~/server/interface/Noticia';

const noticiaId = useRoute().params.id;

const { data: noticiaData, error: fetchError, pending } = await useFetch<NoticiaPublicItem>(
  `/api/noticias/${noticiaId}`,
  { key: `noticia-${noticiaId}` }
);

onMounted(() => {
    initScrollObserver()
})
</script>