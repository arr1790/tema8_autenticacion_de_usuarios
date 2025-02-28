'use server'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'



//  ------------------------ REPARTIDORES ------------------------


export async function insertarRepartidor(formData) {
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')

    await prisma.repartidor.create({
        data: {
            nombre: nombre,
            telefono: telefono,
        }
    })

    revalidatePath('/repartidores')

}



export async function modificarRepartidor(formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')


    await prisma.repartidor.update({
        where: {
            id: id
        },
        data: {
            nombre: nombre,
            telefono: telefono,
        }
    })

    revalidatePath('/repartidores')
}



export async function eliminarRepartidor(formData) {
    const id = Number(formData.get('id'))

    await prisma.repartidor.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/repartidores')

}


//  ------------------------ PEDIDOS ------------------------


export async function insertarPedido(prevState, formData) {
    const fecha_hora = new Date(formData.get('fecha_hora'))
    const nombre_cliente = formData.get('nombre_cliente')
    const direccion_cliente = formData.get('direccion_cliente')

    const repartidorId = Number(formData.get('repartidorId')) || null

    const pizzasIDs = await prisma.pizza.findMany({
        select: { id: true }
    })
    // console.log(pizzasIDs);
    const connect = pizzasIDs.filter(p => formData.get(`pizza${p.id}`) !== null)
    // console.log(connect);

    await prisma.pedido.create({
        data: {
            fecha_hora: fecha_hora,
            nombre_cliente: nombre_cliente,
            direccion_cliente: direccion_cliente,
            repartidorId: repartidorId,
            pizzas: { connect }
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }

}



export async function modificarPedido(prevState, formData) {
    const id = Number(formData.get('id'))
    const fecha_hora = new Date(formData.get('fecha_hora'))
    const nombre_cliente = formData.get('nombre_cliente')
    const direccion_cliente = formData.get('direccion_cliente')

    const repartidorId = Number(formData.get('repartidorId')) || null

    const pizzasIDs = await prisma.pizza.findMany({
        select: { id: true }
    })
    // console.log(pizzasIDs);
    const connect = pizzasIDs.filter(p => formData.get(`pizza${p.id}`) !== null)
    const disconnect = pizzasIDs.filter(p => formData.get(`pizza${p.id}`) === null)
    // console.log(connect);

    await prisma.pedido.update({
        where: {
            id: id
        },
        data: {
            fecha_hora: fecha_hora,
            nombre_cliente: nombre_cliente,
            direccion_cliente: direccion_cliente,
            repartidorId: repartidorId,
            pizzas: { connect, disconnect }
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }
}



export async function eliminarPedido(prevState, formData) {
    const id = Number(formData.get('id'))

    await prisma.pedido.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }

}

// ------------------------------- PIZZAS -----------------------


export async function insertarPizza(formData) {
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))


    await prisma.pizza.create({
        data: {
            nombre: nombre,
            precio: precio,
        }
    })

    revalidatePath('/pizzas')
    return { success: 'Éxito al realizar la operación' }

}



export async function modificarPizza(formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))
    
    await prisma.pizza.update({
        where: {
            id: id
        },
        data: {
            nombre: nombre,
            precio: precio,
        }
    })

    revalidatePath('/pizzas')
}



export async function eliminarPizza(formData) {
    const id = Number(formData.get('id'))

    await prisma.pizza.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/pizzas')

}

