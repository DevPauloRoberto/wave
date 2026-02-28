<template>
    <div class="grid grid-cols-12 h-fit">
        <Lateral />
        <div class="col-span-12 lg:col-span-9 h-fit">
            <!-- HeaderDesktop -->
            <HeaderDesktop />
            <div class="border-black border-t-4 w-full">
                <!-- Hero Section -->
                <Hero />
                <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                    <div class="h-1 bg-black flex-1 md:flex-none md:w-32 mx-4 rounded-full"></div>
                    <h1 class="text-center text-4xl font-medium zilla-slab italic">
                        Sobre
                    </h1>
                    <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                </div>
                <div>
                    <div class="mt-4 text-3xl mx-12 opacity-0 translate-y-8 animate-on-scroll barlow">
                        <p>
                            <span class="font-semibold italic">A Onda Zine</span> é um <span class="font-semibold underline">projeto acadêmico</span> dentro do campo de Design e Ciências Humanas e Sociais. Ela iniciou com a <span class="font-semibold italic">MOA Diary Zine</span>, uma <span class="font-semibold underline">fanzine</span> digital dedicada ao grupo TOMORROW X TOGETHER em 2021, durante a pandemia de COVID-19.
                        </p>
                        <p class="mt-3">
                            Não se trata de uma fanzine comercial e por isso, não segue o modelo de outr as Zines reconhecidas nas mídias sociais como portais de notícias. Do mesmo modo, também não se assemelha às fanzines de K pop focadas em produções de fãs como fanarts, fanfics, contos ou poemas. A Onda Zine se coloca mais próxima às propostas das zines do movimento Punk dos anos 1980 que incluiam a disseminação do conhecimento e cultura do movimento através dessa mídia impressa amadora e efêmera. Para saber mais sobre as fanzines Punks, acesse a pesquisa completa no projeto.
                        </p>
                    </div>
                    <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                        <div class="h-1 bg-black flex-1 md:flex-none md:w-32 mx-4 rounded-full"></div>
                        <h1 class="text-center text-4xl font-medium zilla-slab italic">
                            Equipe
                        </h1>
                        <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                    </div>
                    <div class="opacity-0 translate-y-8 animate-on-scroll mx-12 barlow">
                        <div class="mt-3 text-3xl">
                           <p>
                                <span class="font-bold">Amanda Paccanaro</span> é bacharelada em Design Gráfico pela Universidade Federal de Pelotas (UFPel), ilustradora, educadora e pesquisadora no campo de cultura, design e comunicação social. É K-popper (MOA de carteirinha) e fã da cultura pop sul-coreana e geral.
                           </p>
                        </div>
                        <nav class="mt-4 flex flex-col text-3xl underline">
                            <NuxtLink to="">Instagram</NuxtLink>
                            <NuxtLink to="">Behance</NuxtLink>
                            <NuxtLink to="">LinkedIn</NuxtLink>
                            <NuxtLink to="">Lattes</NuxtLink>
                        </nav>
                    </div>
                    <div class="opacity-0 translate-y-8 animate-on-scroll mx-12 barlow">
                        <div class="mt-5 text-3xl">
                            <p>
                                <span class="font-bold">Paulo Baccaro Jr.</span> é desenvolvedor Full Stack júnior  com formação na área e experiência de mais de 2 anos de mercado. Fã da cultura japonesa e gamer de jogos digitais ou não.
                            </p>
                        </div>
                        <nav class="mt-3 flex flex-col text-3xl underline">
                            <NuxtLink to="">Instagram</NuxtLink>
                            <NuxtLink to="">LinkedIn</NuxtLink>
                        </nav>
                    </div>
                </div>
                <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                    <div class="h-1 bg-black flex-1 md:flex-none md:w-32 mx-4 rounded-full"></div>
                    <h1 class="text-center text-4xl font-medium zilla-slab italic">
                        Colaborações
                    </h1>
                    <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                </div>
                <div class="opacity-0 translate-y-8 animate-on-scroll mx-12 pt-4 text-3xl barlow">
                    <p>
                        Em 2024, a <span class="font-semibold italic">MOA Diary Zine</span> foi aprofundada para um Trabalho de Conclusão de Curso que teve a colaboração de professores da UFPel que integraram a sua banca, são eles: Guilherme da Rosa, Ana Bandeira, Ana Margarites (IFSul - Pelotas) e Rebeca Recuero Rebs.
                    </p>
                    <p class="mt-3">
                        Entre outras colaborações para a produção de pesquisa, texto, traduções, imagens, ilustrações e edições, estão: 
                    </p>
                    <nav class="flex flex-col mb-20">
                        <NuxtLink to="">Instagram</NuxtLink>
                        <NuxtLink to="">LinkedIn</NuxtLink>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
onMounted(() => {
    initScrollObserver()
})
</script>