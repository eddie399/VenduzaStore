import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";





{/** interface Props {
    product: Stripe.Product;
}*/}

const Categories = [
  "All",
  "Electronic",
  "Clothes",
  "Food",
  "Chimanga"
  
];

export default async function Home() {
 
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <section className="rounded-xl bg-gray-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl text-gray-800 font-bold tracking-tight md:text-4xl">
            WELCOME TO VENDUZA LOCAL MARKET
            </h2>
            <p className="text-gray-800">
              Discover the latest products at the best prices.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-orange-500 text-white"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse All Products
              </Link>
            </Button>
          </div>
          <Image
            alt="Hero Image"
            priority
            src={products.data[0].images[0]}
            className="rounded"
            width={450}
            height={450}
          />
        </div>
      </section>

      <section className="container mx-auto overflow-x-hidden">
        <div className="flex flex-col items-center justify-center md:flex-row my-10 gap-4 md:gap-8">
         {Categories.map((cart) =>{
            return (
              <button key={cart} className="bg-gray-500 text-white rounded-md py-2 px-4">
                {cart}
              </button>
            )
          })}
        </div>
      </section>

      <section className="py-8 overflow-x-hidden">
        <Carousel products={products.data} />
      </section>
    </div>
  );
} 