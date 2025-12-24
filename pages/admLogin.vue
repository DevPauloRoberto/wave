<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="card flex justify-center p-8 bg-white shadow-lg rounded-lg">
            <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-80 items-center">
                <h2 class="text-2xl font-bold text-center mb-4 text-gray-700">Login</h2>
                
                <div class="flex flex-col gap-2">
                    <label for="username" class="font-semibold text-gray-600">Usuário</label>
                    <InputText style="border:solid 1px gray" class="rounded-lg p-2 flex justify-end content-center" autocomplete="name" id="username" name="username" type="text" placeholder="Usuário" fluid />
                    <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.username.error?.message }}
                    </Message>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="pv_id_3" class="font-semibold text-gray-600">Senha</label>
                    <Password
                        id="password"
                        style="border:solid 1px gray"
                        name="password" placeholder="Sua senha" 
                        :feedback="false" 
                        toggleMask
                        fluid
                        class="p-2 rounded-lg"
                      />
                    <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                        {{ $form.password.error?.message }}
                    </Message>
                </div>
                <Button type="submit" label="Entrar" :loading="loading" class="mt-2 bg-sky-600 hover:bg-sky-300 px-4 py-2 rounded-lg text-white" />
            </Form>
            <Toast />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from "primevue/usetoast"
import { z } from 'zod'

const toast = useToast()
const router = useRouter()
const loading = ref(false)

const initialValues = ref({
    username: '',
    password: ''
})

const zodSchema = z.object({
    username: z.string().min(1, { message: 'Usuário é obrigatório.' }),
    password: z.string().min(1, { message: 'Senha é obrigatória.' })
})


type LoginFormSchema = z.infer<typeof zodSchema>

const resolver = ref(zodResolver(zodSchema))

interface FormSubmitEvent {
    valid: boolean;
    values: Record<string, unknown>;
    errors: unknown;
}

const onFormSubmit = async ({ valid, values }: FormSubmitEvent) => {
    if (valid) {
        const formValues = values as LoginFormSchema;
        loading.value = true
        try {
            await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    usuario: formValues.username, 
                    senha: formValues.password
                }
            })

            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado!', life: 3000 })

            setTimeout(() => {
                router.push('/admin')
            }, 1000)

        } catch (error: unknown) {
            const fetchError = error as { data?: { message?: string } };
            toast.add({ 
                severity: 'error', 
                summary: 'Erro de Login', 
                detail: fetchError.data?.message || 'Falha ao autenticar', 
                life: 3000 
            })
        } finally {
            loading.value = false
        }
    }
}
</script>