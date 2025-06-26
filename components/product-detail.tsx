"use client"

import Image from "next/image";
import Stripe from "stripe"
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
    product: Stripe.Product;
}

export const ProductDetail = ({product}: Props) => {
    const { items, addItem, removeItem } = useCartStore();

    const price = product.default_price as Stripe.Price;
    const cartItem = items.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const onAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price.unit_amount as number,
            imageUrl: product.images ? product.images[0] : null,
            quantity: 1,
        })
    }

    return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
        {product.images && product.images[0] && (
            <div className='relative w-full h-96 md:w-1/2 rounded-lg overflow-hidden'>
                <Image 
                    alt={product.name}
                    src={product.images[0]}
                    fill
                    priority
                    style={{objectFit:'cover'}}
                    className='hover:opacity-90 transition duration-300'
                />
            </div>
        )}

        <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            {product.description && <p className="text-gray-500 mb-4">{product.description}</p>}

            {price && price.unit_amount && (<p className='text-lg font-semibold text-gray-800'>  MK{(price.unit_amount / 100).toLocaleString('en-MW', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>)}

            <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => removeItem(product.id)}> -</Button>
                <span className="text-lg font-semibold">{quantity}</span>
                <Button onClick={onAddItem}> +</Button>
            </div>
        </div>
    </div>
    )
}