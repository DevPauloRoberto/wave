import { Admin } from '../../dbModels/index'
import { defineEventHandler, readBody, createError, setCookie } from 'h3'
import jwt from 'jsonwebtoken' // <--- Importamos o JWT

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { usuario, senha } = body

    if (!usuario || !senha) {
        throw createError({ statusCode: 400, message: 'Usuário e senha são obrigatórios.' })
    }

    try {
        const admin = await Admin.findOne({ where: { usuario: usuario } })

        if (!admin || !(await admin.checkPassword(senha))) {
            throw createError({ statusCode: 401, message: 'Usuário ou senha incorretos.' })
        }

        const tokenPayload = {
            id: admin.id,
            usuario: admin.usuario
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
            expiresIn: '2h'
        })

        setCookie(event, 'auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 8,
            path: '/'
        })

        setCookie(event, 'is_logged_in', 'true', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 8,
            path: '/'
        })

        return {
            success: true,
            message: 'Login realizado com sucesso!',
            user: { usuario: admin.usuario }
        }

    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Erro no login:', error)
        throw createError({ statusCode: 500, message: 'Erro interno.' })
    }
})