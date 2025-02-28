'use server'

import prisma from "@/lib/prisma"

// ---------------------   REPARTIDORES -----------------------

async function obtenerRepartidores() {
    const repartidores = await prisma.repartidor.findMany()
    return repartidores
}


async function obtenerRepartidor(id) {
    const repartidor = await prisma.repartidor.findUnique({
        where: { id: +id }
    })
    return repartidor
}


// ---------------------   PEDIDOS -----------------------

async function obtenerPedidos() {
    const pedidos = await prisma.pedido.findMany({
        include: {
            repartidor: true,
            pizzas: true,
        }
    })
    return pedidos
}


async function obtenerPedido(id) {
    const pedido = await prisma.pedido.findUnique({
        where: { id: +id },
        include: {
            repartidor: true,
            pizzas: true,
        }
    })
    return pedido
}

// ---------------------   PIZZAS -----------------------

async function obtenerPizzas() {
    const pizzas = await prisma.pizza.findMany()
    return pizzas
}


async function obtenerPizza(id) {
    const pizza = await prisma.pizza.findUnique({
        where: { id: +id }
    })
    return pizza
}


export {
    obtenerRepartidores,
    obtenerRepartidor,
    obtenerPedidos,
    obtenerPedido,
    obtenerPizzas,
    obtenerPizza
}