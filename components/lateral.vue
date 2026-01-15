<template>
    <div class="col-span-3 bg-gray-300 flex items-center flex-col h-full">
        <img class="pt-4 mb-16" src="/img/wave-logo.png" alt="logo com os dizeres: A onda. Onde a letra O é uma onda do mar">
        <nav class="text-left w-3/4">
            <div>
                <NuxtLink to="/noticias" class="underline text-2xl font-medium hover:text-blue-600 transition-colors">
                    Últimas publicações
                </NuxtLink>
            </div>
            <div class="text-red-600">
                <p class="mt-5 text-2xl font-medium">K-Pop</p>
                <ul>
                    <li class="ml-3">
                        <NuxtLink to="/noticias" class="text-2xl font-medium hover:text-blue-600 transition-colors">
                            on Rap
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="text-blue-600">
                <p class="mt-5 text-2xl font-medium">K-Drama</p>
                <ul>
                    <li class="ml-3">
                        <NuxtLink to="/noticias" class="text-2xl font-medium hover:text-blue-600 transition-colors">
                            on Rap
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="mt-5">
                <NuxtLink to="/noticias" class="text-2xl font-medium hover:text-blue-600 transition-colors">
                    Edições Online
                </NuxtLink>
            </div>
            <div class="mt-5">
                <NuxtLink to="/noticias" class="text-2xl font-medium hover:text-blue-600 transition-colors">
                    Sobre
                </NuxtLink>
            </div>
            <div class="mt-10">
                <p class="text-2xl font-medium">Tags</p>
                <ul class="ml-8 flex flex-row gap-8 list-disc flex-wrap text-red-600 mt-3 font-medium">
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span class="">K-Pop</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Pop</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Pop</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasasasa</span>
                    </li>
                </ul>
                <ul class="ml-8 flex flex-row gap-8 list-disc flex-wrap mt-14 text-blue-600 font-medium">
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Pop</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Pop</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Pop</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasa</span>
                    </li>
                    <li>
                        <span class="w-1 h-1 bg-black rounded-full"> </span>
                        <span>K-Popasasasasa</span>
                    </li>
                </ul>
            </div>
            <div class="mt-14 w-fit">
                <p class="text-2xl font-medium">Receba nossas publicações</p>
                <div>
                    <label for="nome" class="font-bold text-grey-600 mr-2">Nome:</label>
                    <InputText
                        name="nome"
                        type="text"
                        placeholder="Ex: Noticias"
                        fluid
                        class="border border-gray-400 p-1 text-lg font-bold"
                    />
                </div>
                <div class="mt-2">
                    <label for="email" class="font-bold text-grey-600 mr-2">E-mail: </label>
                    <InputText
                        name="email"
                        type="text"
                        placeholder="Ex: Noticias"
                        fluid
                        class="border border-gray-400 p-1 text-lg font-bold"
                    />
                </div>
                <div class="flex flex-col md:flex-row justify-end mt-2 mr-">
                    <Button 
                        type="submit" 
                        label="Inscrever-se" 
                        icon="pi pi-check" 
                        class="bg-blue-600 border-none hover:bg-blue-700 p-3 text-white"
                    />
                </div>
            </div>
            <div class="mt-10 flex flex-col">
                <NuxtLink to="/noticias" class="text-2xl font-medium hover:text-blue-600 transition-colors">
                    Instagram
                </NuxtLink>
                <NuxtLink to="/noticias" class="text-2xl font-medium hover:text-blue-600 transition-colors">
                    Twitter
                </NuxtLink>
                <NuxtLink to="/noticias" class="text-2xl font-medium hover:text-blue-600 transition-colors">
                    E-mail
                </NuxtLink>
            </div>
        </nav>
    </div>
</template>