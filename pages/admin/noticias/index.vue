<template>
    <div>
        <div class="grid grid-cols-12 my-4 md:mb-6 items-end">
            <div class="col-span-12 md:col-start-2 md:col-span-8 col-start-2">
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">Gerenciar Noticia</h1>
                <p class="text-slate-500 text-sm md:text-base">Visualize e gerencie as noticias do sistema.</p>
            </div>
            
            <div class="col-span-10 col-start-2 md:col-span-2 flex justify-center md:justify-end py-2">
                <Button 
                    label="Nova Noticia" 
                    icon="pi pi-plus" 
                    class="w-full md:w-auto bg-blue-600 border-none hover:bg-blue-700 p-2 text-white" 
                    @click="createNoticia()" 
                />
            </div>
        </div>
        <div class="grid grid-cols-12">
            <div class="col-span-10 col-start-2 md:col-start-3 md:col-span-8">
                <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <DataTable 
                            :value="noticiasResponse?.data || []" 
                            lazy
                            paginator
                            :pageLinkSize="pageLinkSize"
                            :first="first"
                            :rows="rows"
                            :totalRecords="noticiasResponse?.total || 0"
                            :loading="pending"
                            @page="onPage"
                            :rowsPerPageOptions="[5, 10, 20]"
                            class="p-datatable-sm flex justify-center flex-col border-b border-gray-200"
                        >
                            <template #empty>
                                <div class="text-center py-4 text-slate-500">
                                    Nenhuma noticia encontrada.
                                </div>
                            </template>
                            <Column 
                                field="titulo" 
                                header="Titulo" 
                                class="border-b border-gray-200 font-bold"
                                style="width: 40%" 
                            >
                                <template #body="slotProps">
                                    <span 
                                        class="block truncate max-w-[8.5rem] md:max-w-fit px-2 flex justify-center text-slate-700 cursor-default bg-blue-600 rounded text-white" 
                                        v-tooltip.top="slotProps.data.titulo"
                                    >
                                        {{ slotProps.data.titulo }}
                                    </span>
                                </template>
                            </Column>
                            
                            <Column field="categoria" header="Categoria" class="hidden md:table-cell border-b border-gray-200">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.categoria.nome" severity="info" />
                                </template>
                            </Column>

                            <Column field="data" header="Data" class="hidden md:table-cell border-b border-gray-200">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.dataPublicacao" severity="info" />
                                </template>
                            </Column>

                            <Column field="autor" header="Autor" class="hidden md:table-cell border-b border-gray-200">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.autor" severity="info" />
                                </template>
                            </Column>

                            <Column header="Ações" class="flex justify-center border-b border-gray-200">
                                <template #body="slotProps">
                                    <div class="flex gap-2 justify-center">
                                        <Button 
                                            icon="pi pi-pencil" 
                                            severity="secondary"
                                            class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg"
                                            text 
                                            rounded 
                                            v-tooltip.top="'Editar'"
                                            @click="editNoticia(slotProps.data.id)" 
                                        />
                                        <Button 
                                            icon="pi pi-trash"
                                            class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                                            text 
                                            rounded 
                                            v-tooltip.top="'Excluir'"
                                            @click="confirmDelete(slotProps.data)" 
                                        />
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmDialog />
    </div>
</template>

<script setup lang="ts">
    import { useConfirm } from "primevue/useconfirm";
    import { useToast } from "primevue/usetoast";
    import type { ApiResponse } from "~/server/interface/PaginateResponse";
    import type { NoticiaListaAdmin } from "~/server/interface/Noticia";

    const confirm = useConfirm();
    const toast = useToast();
    const page = ref(1);
    const rows = ref(10);
    const first = ref(0);
    const pageLinkSize = ref(5);

    const updatePageLinkSize = () => {
        pageLinkSize.value = window.innerWidth < 768 ? 1 : 5;
    };

    const { data: noticiasResponse, pending, refresh } = await useFetch<ApiResponse>('/api/admin/noticias', {
        query: {
            page: page,
            limit: rows
        },
        key: 'lista-noticias-paginada',
        watch: [page, rows]
    });

    const onPage = (event: any) => {
        first.value = event.first;
        rows.value = event.rows;
        page.value = event.page + 1;
    };

    const editNoticia = (id: number) => {
        navigateTo(`/admin/noticias/edit/${id}`);
    }



    const createNoticia = () => {
        navigateTo('/admin/noticias/create');
    }


    const confirmDelete = (noticia: NoticiaListaAdmin) => {
        confirm.require({
            message: `Tem certeza que deseja excluir a noticia "${noticia.titulo}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            rejectLabel: 'Cancelar',
            acceptLabel: 'Excluir',
            acceptClass: 'p-button-danger',
            accept: async () => {
                try {
                    await $fetch(`/api/admin/noticias/${noticia.id}`, { method: 'DELETE' });
                    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Noticia excluída com sucesso.', life: 3000 });
                    refresh();
                } catch (error) {
                    toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível excluir a noticia.', life: 3000 });
                }
            }
        });
    };

    onUnmounted(() => {
        window.removeEventListener('resize', updatePageLinkSize);
    });
</script>