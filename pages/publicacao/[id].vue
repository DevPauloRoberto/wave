<template>
    <div class="grid grid-cols-12 h-fit">
        <Lateral />
        <div class="col-span-12 lg:col-span-9 h-fit">
            <!-- HeaderDesktop -->
            <HeaderDesktop />
            <div class="border-black border-l-4 border-t-4 w-full h-full zilla-slab">
                <div class="mx-8 mt-5 h-full">
                    <h1 class="text-6xl mb-10">
                        TITULO DA PUBLICAÇÃO {{ id }} aaaaaaaaaa
                    </h1>
                    <h2 class="text-5xl mb-10">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione inventore nihil neque, iusto adipisci assumenda, accusamus sunt blanditiis facilis similique quidem cupiditate architecto itaque aliquid odio quibusdam esse quam numquam?
                    </h2>
                    <p class="text-3xl mb-5 underline">Amanda</p>
                    <p class="text-2xl">2022/11/11</p>
                    <img
                        src="/img/hero.png"
                        alt="Capa"
                        class="max-h-[43rem] w-full object-cover rounded-b-[40px] mt-5 shadow-sm"
                        loading="lazy"
                    >
                    <p class="mx-96 mt-10 pb-20 text-2xl text-center">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias facilis ab ad tempore ducimus saepe commodi atque, suscipit, ratione numquam laborum qui voluptatem animi quas.
                    </p>

                    <div class="opacity-0 translate-y-8 animate-on-scroll">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias facilis ab ad tempore ducimus saepe commodi atque, suscipit, ratione numquam laborum qui voluptatem animi quas.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam facilis corporis in, magni quisquam possimus dolorum vitae quod voluptatum quam id asperiores natus nostrum, ea ut sed eaque beatae veritatis.
                        </p>
                    </div>
                </div>
                <div class="mx-4">
                    <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                        <div class="h-1 bg-black w-32 mx-4 rounded-full"></div>
                        <h1 class="text-center text-4xl font-medium zilla-slab italic">
                            Expediente
                        </h1>
                        <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                    </div>
                    <div class="mx-4 text-2xl mt-8">
                        <h3 class="font-bold py-2">Texto e pesquisa</h3>
                        <p class="underline">Amanda Paccanaro</p>
                        <h3 class="font-bold py-2">Design e Ilustração</h3>
                        <p class="underline">Amanda Paccanaro</p>
                    </div>
                </div>
                <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                    <div class="h-1 bg-black w-32 mx-4 rounded-full"></div>
                    <h1 class="text-center text-4xl font-medium zilla-slab italic">
                        Tags
                    </h1>
                    <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                </div>
                <div class="flex items-center justify-center mt-10 opacity-0 translate-y-8 animate-on-scroll">
                    <div class="h-1 bg-black w-32 mx-4 rounded-full"></div>
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
onMounted(() => {
    initScrollObserver()
})

const id = useRoute().params.id

</script>