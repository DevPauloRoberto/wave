<template>
    <div class="bg-slate-50">
        <header class="bg-white shadow-sm border-b border-gray-200 py-4 relative z-50">
            <div class="flex justify-between items-center md:grid md:grid-cols-12 w-full">
                <div class="md:col-start-2 md:col-span-4 px-2 md:px-0">
                    <h1 class="text-xl md:text-2xl font-bold text-slate-800">Painel Administrativo</h1>
                    <p class="text-slate-500 md:text-sm">Bem-vindo de volta, Amanda!</p>
                </div>
                <div class="hidden md:flex items-center justify-end gap-6 md:col-span-6">
                    <nav class="flex gap-4 text-sm font-medium text-slate-600">
                        <NuxtLink 
                            to="/admin/noticias" 
                            class="hover:text-blue-600 transition-colors flex items-center gap-1"
                            active-class="text-blue-600 font-bold"
                        >
                            <Icon name="fluent:news-24-regular" size="1.2em" /> Notícias
                        </NuxtLink>

                        <NuxtLink 
                            to="/admin/categorias" 
                            class="hover:text-emerald-600 transition-colors flex items-center gap-1"
                            active-class="text-emerald-600 font-bold"
                        >
                            <Icon name="carbon:category" size="1.2em" /> Categorias
                        </NuxtLink>

                        <NuxtLink 
                            to="/admin/tags" 
                            class="hover:text-purple-600 transition-colors flex items-center gap-1"
                            active-class="text-purple-600 font-bold"
                        >
                            <Icon name="mdi:tag-outline" size="1.2em" /> Tags
                        </NuxtLink>
                    </nav>

                    <div class="h-6 w-px bg-gray-200"></div>

                    <Button 
                        class="bg-red-600 py-1 px-3 text-white hover:text-white hover:bg-red-700 border-none text-sm" 
                        label="Sair" 
                        @click="logout" 
                    />
                </div>
                <div class="md:hidden cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors" @click="toggleMenu">
                    <Icon v-if="!isMenuOpen" name="material-symbols:menu" size="2.3em" class="text-slate-700" />
                    <Icon v-else name="material-symbols:close" size="2.3em" class="text-red-500" />
                </div>
            </div>
        </header>
        <div 
            v-if="isMenuOpen" 
            class="md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
            @click="closeMenu"
        ></div>
        <aside 
            class="md:hidden fixed top-0 right-0 h-full w-3/4 sm:w-2/4 bg-white shadow-2xl z-40 transform transition-transform duration-300 pt-24 px-6"
            :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
        >
            <nav class="flex flex-col gap-6">
                <h3 class="text-xl font-bold text-slate-800 border-b pb-4">Menu</h3>
                
                <NuxtLink to="/admin/noticias" class="text-lg text-slate-600 hover:text-blue-600 flex items-center gap-3" @click="closeMenu">
                    <Icon name="fluent:news-24-regular" size="1.5em" /> Notícias
                </NuxtLink>
                
                <NuxtLink to="/admin/categorias" class="text-lg text-slate-600 hover:text-emerald-600 flex items-center gap-3" @click="closeMenu">
                    <Icon name="carbon:category" size="1.5em" /> Categorias
                </NuxtLink>
                
                <NuxtLink to="/admin/tags" class="text-lg text-slate-600 hover:text-purple-600 flex items-center gap-3" @click="closeMenu">
                    <Icon name="mdi:tag-outline" size="1.5em" /> Tags
                </NuxtLink>

                <button class="text-lg text-red-600 hover:text-red-800 flex items-center gap-3 mt-4 mx-2 md:mx-0" @click="logout">
                    <Icon name="material-symbols:logout" size="1.5em" /> Sair
                </button>
            </nav>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}

const logout = () => {
    const flagCookie = useCookie('is_logged_in')
    const tokenCookie = useCookie('auth_token')
    
    flagCookie.value = null
    tokenCookie.value = null
    
    return navigateTo('/admLogin')
}
</script>