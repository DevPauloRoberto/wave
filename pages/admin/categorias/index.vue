<template>
    <div>
        <div class="grid grid-cols-12 my-4 md:mb-6 items-end">
            <div class="col-span-12 md:col-start-2 md:col-span-8 col-start-2">
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">Gerenciar Categoria</h1>
                <p class="text-slate-500 text-sm md:text-base">Visualize e gerencie as categorias do sistema.</p>
            </div>
            
            <div class="col-span-10 col-start-2 md:col-span-2 flex justify-center md:justify-end py-2">
                <Button 
                    label="Nova Categoria" 
                    icon="pi pi-plus" 
                    class="w-full md:w-auto bg-blue-600 border-none hover:bg-blue-700 p-2 text-white" 
                    @click="createCategoria()" 
                />
            </div>
        </div>
        <div class="grid grid-cols-12">
            <div class="col-span-10 col-start-2 md:col-start-3 md:col-span-8">
                <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <DataTable 
                            :value="categoriasResponse?.data || []" 
                            lazy
                            paginator
                            :pageLinkSize="pageLinkSize"
                            :first="first"
                            :rows="rows"
                            :totalRecords="categoriasResponse?.total || 0"
                            :loading="pending"
                            @page="onPage"
                            :rowsPerPageOptions="[5, 10, 20]"
                            class="p-datatable-sm flex justify-center flex-col"
                        >
                            <template #empty>
                                <div class="text-center py-4 text-slate-500">
                                    Nenhuma tag encontrada.
                                </div>
                            </template>
                            <Column 
                                field="id" 
                                header="ID" 
                                class="hidden md:table-cell border-b border-gray-200" 
                            ></Column>
                            
                            <Column field="nome" header="Nome" class="border-b border-gray-200">
                                <template #body="slotProps">
                                    <span class="font-bold text-slate-700 text-sm md:text-normal">{{ slotProps.data.nome }}</span>
                                </template>
                            </Column>

                            <Column field="tipo" header="Tipo" class="border-b border-gray-200 text-sm md:text-normal">
                                <template #body="slotProps">
                                    <Tag 
                                        class=""
                                        :value="TipoConteudoLabel[slotProps.data.tipo]" 
                                        :severity="getSeverity(slotProps.data.tipo)" 
                                    />
                                </template>
                            </Column>

                            <Column header="Ações" class="flex justify-center border-b border-gray-200">
                                <template #body="slotProps">
                                    <div class="flex gap-2 justify-center flex-col md:flex-row">
                                        <Button 
                                            icon="pi pi-pencil" 
                                            severity="secondary"
                                            class="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg"
                                            text 
                                            rounded 
                                            v-tooltip.top="'Editar'"
                                            @click="editCategoria(slotProps.data.id)" 
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
    import type { CategoriaItem } from "~/server/interface/Categoria";


    const confirm = useConfirm();
    const toast = useToast();
    const page = ref(1);
    const rows = ref(10);
    const first = ref(0);
    const pageLinkSize = ref(5);

    const updatePageLinkSize = () => {
        pageLinkSize.value = window.innerWidth < 768 ? 1 : 5;
    };

    const { data: categoriasResponse, pending, refresh } = await useFetch<ApiResponse>('/api/admin/categorias', {
        query: {
            page: page,
            limit: rows
        },
        key: 'lista-categorias-paginada',
        watch: [page, rows]
    });

    const onPage = (event: any) => {
        first.value = event.first;
        rows.value = event.rows;
        page.value = event.page + 1;
    };


    const getSeverity = (tipo: number) => {
        switch (tipo) {
            case TipoConteudo.KPOP: return 'info';
            case TipoConteudo.KDRAMA: return 'danger';
        }
    };


    const editCategoria = (id: number) => {
        navigateTo(`/admin/categorias/edit/${id}`);
    }

    const createCategoria = () => {
        navigateTo('/admin/categorias/create');
    }

    const confirmDelete = (categoria: CategoriaItem) => {
        confirm.require({
            message: `Tem certeza que deseja excluir a categoria "${categoria.nome}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            rejectLabel: 'Cancelar',
            acceptLabel: 'Excluir',
            acceptClass: 'p-button-danger',
            accept: async () => {
                try {
                    await $fetch(`/api/admin/categorias/${categoria.id}`, { method: 'DELETE' });
                    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'categoria excluída com sucesso.', life: 3000 });
                    refresh();
                } catch (error) {
                    toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível excluir a categoria.', life: 3000 });
                }
            }
        });
    };

    onUnmounted(() => {
        window.removeEventListener('resize', updatePageLinkSize);
    });
</script>