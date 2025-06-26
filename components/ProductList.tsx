"use client";


import Stripe from "stripe"
import { ProductCard } from "./ProductCard";
import { useState } from "react";

interface Props {
    products: Stripe.Product[];
}

export const ProductList = ({ products}: Props) =>{

    //logic for searching a product based on the term used to search or part of the product description 
    const [searchTerm, setSearchTerm] = useState<string>("")

    const filteredProducts = products.filter((products) => {
        const term = searchTerm.toLowerCase()
        const nameMatch = products.name.toLowerCase().includes(term)
        const descriptionMatch = products.description ? products.description.toLowerCase().includes(term): false;
    
        return nameMatch || descriptionMatch;
    })
    
    return (
        <div>
            <div className="mg-6 flex justify-center">
                <input 
                type="text" 
                placeholder="search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value

                )}
                className=" w-full max-w-md rounded border border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, key) =>{
                    return (
                        <li key={key}>
                            <ProductCard product={product}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}