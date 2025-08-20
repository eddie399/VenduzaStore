import Image from "next/image";
import  { stripe }  from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";
import { BellAlertIcon, HomeModernIcon, SparklesIcon } from "@heroicons/react/24/outline";







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
            <h2 data-aos="fade-zoom-in" className="text-3xl text-gray-800 font-bold tracking-tight md:text-4xl">
            WELCOME TO VENDUZA LOCAL MARKET
            </h2>
            <p className="text-gray-800">
              Discover the latest products at the best prices.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#19d1e6] text-white"
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




          {/*grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 my-10 items-center justify-center */}
      <section className="container mx-auto overflow-x-hidden">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 my-10 items-center justify-center">
         {Categories.map((cart) =>{
            return (
              <button key={cart} className="bg-[#614943] text-white rounded-md py-2 px-4">
                {cart}
              </button>
            )
          })}
        </div>
      </section>


      <section className="py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8">
          <div>
            <Image
              alt="about Image"
              priority
              src={products.data[0]?.images?.[1] || "/apple.jpg"}
              className="rounded"
              width={400}
              height={400}
            />
          </div>
          <div className="relative flex flex-col items-start py-4 gap-4">
            <div className="absolute -top-6 left-5">
              <h1 className="text-3xl font-bold text-gray-800">What Are We?</h1>
            </div>
            <div className="absolute left-0 top-2 bg-[#117192] h-12 w-2 text-[#052a3d]"></div>
              <p className="ml-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                 Quo ducimus esse, minima labore ut magni excepturi dignissimos.
                 Quod iste earum neque quasi alias nam cupiditate! Excepturi, fugit!
                 Velit facere incidunt ab iure odit 
                 aspernatur tenetur corrupti error, quo aliquam. Fugiat.
              </p>

              <div className="flex flex-row md:flex-row gap-4 mt-4 pl-6">
                <Link href="/products" className="rounded-md bg-[#19d1e6] text-white py-2 px-4">
                  Advertisement
                </Link>

                 <Link href="/products" className="rounded-md bg-[#19d1e6] items-center justify-center text-white w-full py-2 px-4">
                  Explore
                </Link>
              </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <Carousel products={products.data} />
      </section>


      <section className="bg-gray-50 py-8">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <p className="text-gray-600 mb-6">
            Check out our latest and greatest products.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {products.data.slice(1, 5).map((product) => {
              const price = product.default_price as any;
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="rounded-t-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                  <p className="text-gray-500 mt-1">
                    {price && price.unit_amount && (
                      <span className='text-lg font-semibold text-gray-900'>
                        MK{(price.unit_amount / 100).toLocaleString('en-MW', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    )}
                  </p>
                </div>
              )})}
          </div>

          
          <div className="grid grid-cols-1 mt-8 space-x-4">
            <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-between items-center">
              <Link 
                href="/products"
                className="bg-[#052A3D] rounded-sm text-white py-2 px-4 lg:w-full">
                  <BellAlertIcon 
                  className="items-center h-6 w-6 text-[#19D1E6] rounded-sm justify-center mx-auto"
                  />
                  <p>Advertisement</p>
              </Link>

              <Link 
                href="/products"
                className="bg-[#052A3D] rounded-sm text-white py-2 px-4 lg:w-full">
                  <SparklesIcon 
                  className="items-center h-6 w-6 text-[#19D1E6] justify-center mx-auto"
                  />
                  <p>Purchase</p>
              </Link>

              <Link 
                href="/products"
                className="bg-[#052A3D] rounded-sm text-white py-2 px-4 lg:w-full">
                  <HomeModernIcon 
                  className="items-center h-6 w-6 text-[#19D1E6] justify-center mx-auto"
                  />
                  <p>Rent</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[url('/apple.jpg')] bg-cover bg-center py-12">
          <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>
          <p className="text-gray-600 mb-8 text-center">
            Have questions or feedback? Reach out to us or subscribe to our newsletter!
          </p>
          <form className="bg-gradient-to-tr from-[#052A3D] via-[#117192] to-[#19D1E6] rounded-lg shadow-md text-white p-6 mb-8">
            <div></div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                autoComplete="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#19d1e6] text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
          <div className="bg-[#117192] rounded-lg shadow-md text-white p-6">
            <h3 className="text-xl font-semibold text-[#b3cdd7] mb-2 text-center">Subscribe to our Newsletter</h3>
            <form className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input
                type="email"
                className="w-full sm:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="bg-[#19d1e6] text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
} 