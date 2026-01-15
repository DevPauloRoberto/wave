<template>
    <div>
        <div class="grid grid-cols-12 my-4 md:mb-6 items-end">
            <div class="col-span-12 md:col-start-2 md:col-span-8 col-start-2">
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">Gerenciar Autores</h1>
                <p class="text-slate-500 text-sm md:text-base">Visualize e gerencie os autores do sistema.</p>
            </div>
            
            <div class="col-span-10 col-start-2 md:col-span-2 flex justify-center md:justify-end py-2">
                <Button 
                    label="Novo Autor" 
                    icon="pi pi-plus" 
                    class="w-full md:w-auto bg-blue-600 border-none hover:bg-blue-700 p-2 text-white" 
                    @click="createAutor()" 
                />
            </div>
        </div>
        <div class="grid grid-cols-12">
            <div class="col-span-10 col-start-2 md:col-start-3 md:col-span-8">
                <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <DataTable 
                            :value="autoresResponse?.data || []" 
                            lazy
                            paginator
                            :pageLinkSize="pageLinkSize"
                            :first="first"
                            :rows="rows"
                            :totalRecords="autoresResponse?.total || 0"
                            :loading="pending"
                            @page="onPage"
                            :rowsPerPageOptions="[5, 10, 20]"
                            class="p-datatable-sm flex justify-center flex-col border-b border-gray-200"
                        >
                            <template #empty>
                                <div class="text-center py-4 text-slate-500">
                                    Nenhum autor encontrado.
                                </div>
                            </template>
                            <Column 
                                field="id" 
                                header="ID" 
                                class="hidden md:table-cell border-b border-gray-200" 
                            ></Column>
                            
                            <Column field="nome" header="Nome" class="border-b border-gray-200">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.nome" severity="info" />
                                </template>
                            </Column>

                            <Column header="Ações" class="flex justify-center border-b border-gray-200">
                                <template #body="slotProps">
                                    <div class="flex gap-2 justify-center flex-col md:flex-row">
                                        <Button 
                                            icon="pi pi-pencil" 
                                            severity="secondary"
                                            class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg"
                                            text 
                                            rounded 
                                            v-tooltip.top="'Editar'"
                                            @click="editAutor(slotProps.data.id)" 
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
    import type { AutorItem } from "~/server/interface/Autor";


    const confirm = useConfirm();
    const toast = useToast();
    const page = ref(1);
    const rows = ref(10);
    const first = ref(0);
    const pageLinkSize = ref(5);

    const updatePageLinkSize = () => {
        pageLinkSize.value = window.innerWidth < 768 ? 1 : 5;
    };

    const { data: autoresResponse, pending, refresh } = await useFetch<ApiResponse>('/api/admin/autores', {
        query: {
            page: page,
            limit: rows
        },
        key: 'lista-autores-paginada',
        watch: [page, rows]
    });

    const onPage = (event: any) => {
        first.value = event.first;
        rows.value = event.rows;
        page.value = event.page + 1;
    };

    const editAutor = (id: number) => {
        navigateTo(`/admin/autores/edit/${id}`);
    }

    const createAutor = () => {
        navigateTo('/admin/autores/create');
    }

    const confirmDelete = (autor: AutorItem) => {
        confirm.require({
            message: `Tem certeza que deseja excluir o autor "${autor.nome}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            rejectLabel: 'Cancelar',
            acceptLabel: 'Excluir',
            acceptClass: 'p-button-danger',
            accept: async () => {
                try {
                    await $fetch(`/api/admin/autores/${autor.id}`, { method: 'DELETE' });
                    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'autor excluído com sucesso.', life: 3000 });
                    refresh();
                } catch (error) {
                    toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível excluir o autor.', life: 3000 });
                }
            }
        });
    };

    onUnmounted(() => {
        window.removeEventListener('resize', updatePageLinkSize);
    });
</script>