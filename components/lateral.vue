<template>
    <!-- Wrapper principal -->
    <div class="col-span-12 lg:col-span-3">
        <!-- 
            1. BARRA SUPERIOR MOBILE (Visível apenas em telas menores que LG) 
            Mostra o Logo e o Botão de Menu
        -->
        <div class="lg:hidden flex justify-between items-center p-4 bg-gray-300 shadow-md w-full fixed top-0 left-0 z-[60]">
            <img class="h-10 w-auto" src="/img/wave-logo.png" alt="Wave Logo">
            <button @click="toggleMenu" class="text-slate-800 p-2 focus:outline-none">
                <Icon :name="isMenuOpen ? 'material-symbols:close' : 'material-symbols:menu'" size="2em" />
            </button>
        </div>


        <!-- 
            3. DRAWER / SIDEBAR
            - Desktop: Static, sempre visível, ocupa a coluna do grid (lg:col-span-3).
        -->
        <div 
            class="bg-gray-300 flex flex-col items-center h-full overflow-y-auto transition-transform duration-300 ease-in-out z-50
                   fixed top-0 left-0 w-full shadow-2xl 
                   lg:shadow-none lg:static lg:translate-x-0 lg:w-full lg:flex"
            :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
        >
            <!-- Logo (No Desktop aparece aqui, no mobile já tem na barra superior, mas podemos manter ou esconder) -->
            <img class="pt-8 mb-10 lg:mb-16 w-32 lg:w-auto hidden lg:block" src="/img/wave-logo.png" alt="Wave Logo">
            
            <!-- Conteúdo de Navegação -->
            <nav class="text-left w-3/4 pb-10 mt-28 lg:mt-0">
                
                <!-- Link Home -->
                <div>
                    <NuxtLink to="/" class="underline text-2xl font-medium hover:text-gray-600 transition-colors" @click="closeMenu">
                        Últimas publicações
                    </NuxtLink>
                </div>

                <!-- Lista K-Pop -->
                <div class="text-red-600 mt-5">
                    <p class="text-2xl font-medium">K-Pop</p>
                    <ul>
                        <li v-for="cat in catKpop" :key="cat.id" class="ml-3">
                            <NuxtLink class="hover:underline hover:text-red-800" :to="`/categorias/kpop/${cat.id}`" @click="closeMenu">
                                {{ cat.nome }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Lista K-Drama -->
                <div class="text-blue-600 mt-5">
                    <p class="text-2xl font-medium">K-Drama</p>
                    <ul>
                        <li v-for="cat in catKdrama" :key="cat.id" class="ml-3">
                            <NuxtLink class="hover:underline hover:text-blue-800" :to="`/categorias/kdrama/${cat.id}`" @click="closeMenu">
                                {{ cat.nome }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div class="mt-5">
                    <NuxtLink to="/sobre" class="text-2xl font-medium hover:text-gray-600 transition-colors" @click="closeMenu">
                        Sobre
                    </NuxtLink>
                </div>

                <!-- Tags -->
                <div class="mt-10">
                    <p class="text-2xl font-medium">Tags</p>
                    
                    <!-- Tags K-Pop -->
                    <ul class="ml-4 flex flex-row gap-x-4 gap-y-2 flex-wrap text-red-600 mt-3 font-medium">
                        <li v-for="tag in tagKpop" :key="tag.id" class="flex items-center gap-1">
                            <span class="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                            <NuxtLink class="hover:underline hover:text-red-800" :to="`/tags/kpop/${tag.id}`" @click="closeMenu">
                                {{ tag.nome }}
                            </NuxtLink>
                        </li>
                    </ul>

                    <!-- Tags K-Drama -->
                    <ul class="ml-4 flex flex-row gap-x-4 gap-y-2 flex-wrap text-blue-600 mt-6 font-medium">
                        <li v-for="tag in tagKdrama" :key="tag.id" class="flex items-center gap-1">
                            <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                            <NuxtLink class="hover:underline hover:text-blue-800" :to="`/tags/kdrama/${tag.id}`" @click="closeMenu">
                                {{ tag.nome }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Formulário Newsletter -->
                <div class="mt-14 w-full">
                    <p class="text-2xl font-medium mb-4">Receba nossas publicações</p>
                    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
                        
                        <div class="flex flex-col gap-2">
                            <label for="nome" class="font-bold text-gray-800">Nome:</label>
                            <InputText
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="Digite seu nome"
                                fluid
                                class="border border-gray-400 p-2 text-lg font-bold rounded"
                            />
                            <Message v-if="$form.nome?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.nome.error?.message }}
                            </Message>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="email" class="font-bold text-gray-800">E-mail:</label>
                            <InputText
                                id="email"
                                name="email"
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                fluid
                                class="border border-gray-400 p-2 text-lg font-bold rounded"
                            />
                            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.email.error?.message }}
                            </Message>
                        </div>

                        <div class="flex justify-end mt-2">
                            <Button 
                                type="submit" 
                                label="Inscrever-se" 
                                icon="pi pi-check" 
                                class="bg-blue-600 border-none hover:bg-blue-700 p-3 text-white w-full"
                                :loading="loading"
                            />
                        </div>
                    </Form>
                    <Toast />
                </div>

                <!-- Social Links -->
                <div class="mt-10 flex flex-col gap-2">
                    <NuxtLink to="https://www.instagra.com/paulean___" class="text-2xl font-medium hover:text-gray-600 transition-colors">Instagram</NuxtLink>
                    <NuxtLink to="" class="text-2xl font-medium hover:text-gray-600 transition-colors">Twitter</NuxtLink>
                    <NuxtLink to="mailto:contato@wave.com" class="text-2xl font-medium hover:text-gray-600 transition-colors">E-mail</NuxtLink>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { zodResolver } from '@primevue/forms/resolvers/zod';
    import { useToast } from "primevue/usetoast";
    import { z } from 'zod';
    import { TipoConteudo } from '~/utils/enum'; // Importante para os filtros funcionarem
    import type { CategoriaItem } from '~/server/interface/Categoria';
    import type { TagItem } from '~/server/interface/Tag';

    const toast = useToast();
    const loading = ref(false);
    const isMenuOpen = ref(false); // Estado do menu mobile

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    }

    const closeMenu = () => {
        isMenuOpen.value = false;
    }

    const initialValues = ref({
        nome: '',
        email: ''
    });

    const zodSchema = z.object({
        nome: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
        email: z.string().email({ message: 'Digite um endereço de e-mail válido.' })
    });

    const resolver = ref(zodResolver(zodSchema));

    // Busca de dados
    const [{ data: categoriasResponse }, { data: tagsResponse }] = await Promise.all([
        useFetch<CategoriaItem[]>('/api/admin/categorias/list-all', { key: 'cat-publicas' }),
        useFetch<TagItem[]>('/api/admin/tags/list-all', { key: 'tag-publicas' }),
    ]);

    const todasCategorias = computed(() => categoriasResponse.value || []);
    const todasTags = computed(() => tagsResponse.value || []);

    // Filtros
    const catKpop = computed(() => todasCategorias.value.filter(t => t.tipo === TipoConteudo.KPOP));
    const catKdrama = computed(() => todasCategorias.value.filter(t => t.tipo === TipoConteudo.KDRAMA));
    const tagKpop = computed(() => todasTags.value.filter(t => t.tipo === TipoConteudo.KPOP));
    const tagKdrama = computed(() => todasTags.value.filter(t => t.tipo === TipoConteudo.KDRAMA));

    const onFormSubmit = async (event: any) => {
        const { valid, values } = event;

        if (valid) {
            loading.value = true;
            
            // Aqui você chamaria sua API de newsletter
            setTimeout(() => {
                console.log('Dados enviados:', values);
                toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Inscrição realizada!', life: 3000 });
                loading.value = false;
            }, 1000);
        }
    };
</script>