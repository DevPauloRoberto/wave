<template>
    <div class="w-full h-[550px] sm:h-[630px] bg-[url('/img/hero.png')] bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center" style="background-size: 100% 100%;">
        <div class="flex flex-col items-center justify-center transition-all duration-700 opacity-0 translate-y-8 animate-on-scroll w-full h-full transition-transform duration-300 hover:scale-105">
            <h1 class="text-5xl md:text-7xl text-white md:max-w-5xl text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
            <h2 class="text-3xl md:text-4xl text-white md:max-w-3xl text-center mt-8">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</h2>
            <NuxtLink to="/sobre" class="mt-8 py-3 px-5 bg-white hover:bg-gray-200 rounded-b-xl text-xl font-medium">Saiba mais</NuxtLink>
        </div>
    </div>
</template>