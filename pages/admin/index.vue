<template>
    <div class="min-h-screen bg-slate-50">
        <main class="p-8 max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <!-- Notícias -->
                <NuxtLink to="/admin/noticias" class="group">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-500 transition-all duration-300 flex flex-col items-center text-center h-full cursor-pointer">
                        <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                            <i class="pi pi-file text-blue-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-slate-800 mb-2">Notícias</h3>
                        <p class="text-slate-500 text-sm">Gerenciar publicações.</p>
                    </div>
                </NuxtLink>

                <!-- Categorias -->
                <NuxtLink to="/admin/categorias" class="group">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-500 transition-all duration-300 flex flex-col items-center text-center h-full cursor-pointer">
                        <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                            <i class="pi pi-list text-emerald-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-slate-800 mb-2">Categorias</h3>
                        <p class="text-slate-500 text-sm">Gerenciar categorias.</p>
                    </div>
                </NuxtLink>

                <!-- Tags -->
                <NuxtLink to="/admin/tags" class="group">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-500 transition-all duration-300 flex flex-col items-center text-center h-full cursor-pointer">
                        <div class="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                            <i class="pi pi-tags text-purple-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-slate-800 mb-2">Tags</h3>
                        <p class="text-slate-500 text-sm">Gerenciar tags.</p>
                    </div>
                </NuxtLink>

                <!-- Autores (NOVO) -->
                <NuxtLink to="/admin/autores" class="group">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-500 transition-all duration-300 flex flex-col items-center text-center h-full cursor-pointer">
                        <div class="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                            <i class="pi pi-user text-orange-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-slate-800 mb-2">Autores</h3>
                        <p class="text-slate-500 text-sm">Gerenciar autores e perfis.</p>
                    </div>
                </NuxtLink>

            </div>
        </main>
    </div>
</template>