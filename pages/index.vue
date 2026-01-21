<template>
    <div class="grid grid-cols-12 h-fit">
        <Lateral />
        <div class="col-span-12 lg:col-span-9 h-fit">
            <!-- HeaderDesktop -->
            <HeaderDesktop />
            <div class="border-black border-t-4 w-full">
                <!-- Hero Section -->
                <Hero />
                <!-- Ultimas Publicações -->
                <UltimasPubli />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
onMounted(() => {
    initScrollObserver()
})
</script>