import Link from "next/link";
import Stripe from "stripe"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
    product: Stripe.Product;
}

export const ProductCard = ({ product}: Props) =>{
    const price = product.default_price as Stripe.Price;


    return (
        <Link href={`/products/${product.id}`} className="block h-full">
            <Card className="group hover:shadow-xl transition duration-300 py-0 h-full flex flex-col borders border-[#b3cdd7] mt-4">
                {product.images && product.images[0] && (
                    <div className='relative w-full h-80'>
                        <Image 
                            alt={product.name}
                            src={product.images[0]}
                            fill
                            priority
                            style={{objectFit:'cover'}}
                            className='group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg'
                        />
                    </div>
                )}

                <CardHeader className="p-4">
                 
                    <CardTitle className="text-xl font-bold text-gray-800">{product.name}</CardTitle>
                </CardHeader>
                
                    <CardContent className="p-4 flex-grow flex flex-col justify-between bg-gray-100">
                        {product.description && (
                            <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                        )}
                    {   price && price.unit_amount && (<p className='text-lg font-semibold text-gray-900'>  MK{(price.unit_amount / 100).toLocaleString('en-MW', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>)}
                        <Button className="mt-4 bg-[#19d1e6] text-gray-100">View Details</Button>
                    </CardContent>
               
            </Card>
        </Link>
    )
}