<template>
    <div class="grid grid-cols-12">
        <Lateral />
        <div class="col-span-12 lg:col-span-9">
            <!-- HeaderDesktop -->
            <HeaderDesktop />
            <div class="border-black border-x-4 border-t-4 h-full w-full">
                <!-- Hero Section -->
                <Hero />
                <!-- Separador (Animado) -->
                <div class="flex items-center justify-center mt-10 transition-all duration-700 opacity-0 translate-y-8 animate-on-scroll">
                    <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                    <h2 class="text-center text-3xl font-medium">
                        Ultimas publicações
                    </h2>
                    <div class="h-1 bg-black flex-1 mx-4 rounded-full"></div>
                </div>
                <!-- Lista de Cards -->
                <div class="grid grid-cols-12 justify-center gap-2 md:gap-8 m-5">
                    <div class="col-span-12 md:col-span-6 lg:col-span-4 w-full lg:max-w-xl transition-all duration-700 opacity-0 translate-y-8 animate-on-scroll">
                        <NuxtLink 
                            to="/oi" 
                            class="flex flex-col items-center justify-center border-black text-center transition-transform duration-300 hover:scale-105"
                        >
                            <h2 class="text-3xl font-bold sm:mx-12 mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                            <h3 class="text-xl font-medium mt-5 sm:mx-12">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</h3>
                            <p class="text-lg mt-5 font-medium">Paulo Roberto</p>
                            <!-- Adicionado loading="lazy" para performance -->
                            <img src="/img/hero.png" alt="" class="max-h-[250px] w-full rounded-b-[40px] mt-5" loading="lazy">
                        </NuxtLink>
                    </div>
                    <div class="col-span-12 md:col-span-6 lg:col-span-4 w-full lg:max-w-xl transition-all duration-700 opacity-0 translate-y-8 animate-on-scroll">
                        <NuxtLink 
                            to="/oi" 
                            class="flex flex-col items-center justify-center border-black text-center transition-transform duration-300 hover:scale-105"
                        >
                            <h2 class="text-3xl font-bold sm:mx-12 mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                            <h3 class="text-xl font-medium mt-5 sm:mx-12">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</h3>
                            <p class="text-lg mt-5 font-medium">Paulo Roberto</p>
                            <!-- Adicionado loading="lazy" para performance -->
                            <img src="/img/hero.png" alt="" class="max-h-[250px] w-full rounded-b-[40px] mt-5" loading="lazy">
                        </NuxtLink>
                    </div>
                    <div class="col-span-12 md:col-span-6 lg:col-span-4 w-full lg:max-w-xl transition-all duration-700 opacity-0 translate-y-8 animate-on-scroll">
                        <NuxtLink 
                            to="/oi" 
                            class="flex flex-col items-center justify-center border-black text-center transition-transform duration-300 hover:scale-105"
                        >
                            <h2 class="text-3xl font-bold sm:mx-12 mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                            <h3 class="text-xl font-medium mt-5 sm:mx-12">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</h3>
                            <p class="text-lg mt-5 font-medium">Paulo Roberto</p>
                            <!-- Adicionado loading="lazy" para performance -->
                            <img src="/img/hero.png" alt="" class="max-h-[250px] w-full rounded-b-[40px] mt-5" loading="lazy">
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

onMounted(() => {
    // Cria o observador de interseção
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Se o elemento entrou na tela
            if (entry.isIntersecting) {
                // Remove as classes que deixam ele invisível/deslocado
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                // Para de observar este elemento (anima só a primeira vez)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
});
</script>