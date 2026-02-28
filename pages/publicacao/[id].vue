<template>
    <div class="grid grid-cols-12 h-fit">
        <Lateral />
        <div class="col-span-12 lg:col-span-9 h-fit">
            <!-- HeaderDesktop -->
            <HeaderDesktop />
            <div class="border border-black border-l-4 w-full h-full">
                <div class="mx-8 mt-5 h-full opacity-0 translate-y-8 animate-on-scroll">
                    <h1 
                        v-if="noticiaData?.titulo"
                        v-html="noticiaData.titulo"
                        :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                        class="rubik text-5xl sm:text-6xl my-10 font-bold"
                    ></h1>
                    <h2 
                        v-if="noticiaData?.subtitulo"
                        v-html="noticiaData.subtitulo"
                        class="noto-serif text-4xl sm:text-5xl mb-10"
                    ></h2>
                    <p 
                        v-if="noticiaData?.autor?.nome"
                        class="text-2xl sm:text-3xl mb-5 underline noto-serif"
                        :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                    >{{ noticiaData.autor.nome }}</p>
                    <p 
                        v-if="noticiaData?.dataPublicacao"
                        class="text-xl sm:text-2xl noto-serif"
                        :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                    >{{ formatDate(noticiaData.dataPublicacao) }}</p>
                    <img
                        v-if="noticiaData?.img"
                        :src="noticiaData.img"
                        alt="Capa"
                        class="max-h-[43rem] w-full object-cover rounded-b-[40px] mt-5 shadow-sm"
                        loading="lazy"
                    >
                    <div class="opacity-0 translate-y-8 animate-on-scroll">
                        <div
                            v-if="noticiaData?.conteudo"
                            v-html="noticiaData.conteudo"
                            class="barlow sm:text-xl text-lg space-y-4 mt-10"
                            @click="handleNoteClick"
                        ></div>
                    </div>
                </div>

                <!-- Notas -->
                <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                    <div class="h-1 bg-black flex-1 md:flex-none md:w-32 mx-4 rounded-full"></div>
                    <h1 class="text-center text-4xl font-medium zilla-slab italic">
                        Notas
                    </h1>
                    <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                </div>
                <div   v-if="noticiaData?.notas" 
                    v-html="noticiaData.notas"
                    class="mx-4 text-lg mt-8 space-y-2 opacity-0 translate-y-8 animate-on-scroll"
                    @click="handleNoteClick"
                ></div>



                <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                    <div class="h-1 bg-black flex-1 md:flex-none md:w-32 mx-4 rounded-full"></div>
                    <h1 class="text-center text-4xl font-medium zilla-slab italic">
                        Referências
                    </h1>
                    <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                </div>
                <div   
                    v-if="noticiaData?.referencias" 
                    v-html="noticiaData.referencias"
                    class="mx-4 text-lg mt-8 space-y-2 opacity-0 translate-y-8 animate-on-scroll"
                ></div>

                <!-- Expediente -->
                <div>
                    <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                        <div class="h-1 bg-black flex-1 md:flex-none md:w-32 mx-4 rounded-full"></div>
                        <h1 class="text-center text-4xl font-medium zilla-slab italic">
                            Expediente
                        </h1>
                        <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                    </div>
                    <div class="mx-4 text-2xl mt-8 opacity-0 translate-y-8 animate-on-scroll">
                        <h3 class="font-bold py-2">Texto e pesquisa</h3>
                        <p 
                            v-if="noticiaData?.autor?.nome"
                            class="underline"
                            :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                        >{{ noticiaData.autor.nome }}</p>
                        <h3 class="font-bold py-2">Design e Ilustração</h3>
                        <p 
                            v-if="noticiaData?.autor?.nome"
                            class="underline"
                            :class="noticiaData?.tags[0]?.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                        >{{ noticiaData.autor.nome }}</p>
                    </div>
                </div>

                <!-- Tags -->
                <div v-if="noticiaData?.tags?.length">
                    <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                        <div class="h-1 bg-black flex-1 md:flex-none md:w-32 mx-4 rounded-full"></div>
                        <h1 class="text-center text-4xl font-medium zilla-slab italic">
                            Tags
                        </h1>
                        <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                    </div>
                    <ul class="ml-1 mt-10 flex flex-row flex-wrap font-medium zilla-slab opacity-0 translate-y-8 animate-on-scroll">
                        <li 
                            v-for="tag in noticiaData.tags" 
                            :key="tag.id" 
                            :class="tag.tipo === 1 ? 'texto-vermelho' : 'texto-azul'"
                            class="flex items-center text-xl"
                        >
                            <span
                                :class="tag.tipo === 1 ? 'fundo-vermelho' : 'fundo-azul'"
                                class="w-1.5 h-1.5 mx-3 rounded-full"
                            ></span>
                            <NuxtLink 
                                :class="tag.tipo === 1 ? 'hover:text-red-800' : 'hover:text-blue-800'"
                                class="underline uppercase" 
                                :to="`/tags/${tag.tipo === 1 ? 'kpop' : 'kdrama'}/${tag.id}`"
                            >
                                <span v-html="tag.nome"></span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div class="opacity-0 translate-y-8 animate-on-scroll">
                    <div class="flex items-center justify-center mt-10">
                        <div class="h-1 bg-black flex-1 md:flex-none md:w-32 mx-4 rounded-full"></div>
                        <h1 class="text-center text-4xl font-medium zilla-slab italic">
                            Compartilhe essa publicação
                        </h1>
                        <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                    </div>
                </div>
                <div class="pb-48"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NoticiaPublicItem } from '~/server/interface/Noticia';

const noticiaId = useRoute().params.id;

const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = months[d.getUTCMonth()];
    const year = d.getUTCFullYear();
    return `${day} de ${month} de ${year}`;
};

const { data: noticiaData, error: fetchError, pending } = await useFetch<NoticiaPublicItem>(
  `/api/noticias/${noticiaId}`,
  { key: `noticia-${noticiaId}` }
);

const handleNoteClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor) return;
    e.preventDefault();
    const id = anchor.getAttribute('href')?.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

onMounted(async () => {
    await nextTick()
    initScrollObserver()
})
</script>