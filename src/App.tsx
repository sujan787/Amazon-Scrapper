import Card from "./components/card";
import CardSkeleton from "./components/card-skeleton";
import { CiSearch } from "react-icons/ci";
import { MdOutlineCleaningServices } from "react-icons/md";
import { trpc } from "./lib/trpc";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<
    Array<{
      name: string,
      star: string,
      price: string,
      url: string,
      image: string
    }>>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const input = (event.target as any).elements.searchInput.value;
    setItems([])
    setIsLoading(true)
    try {
      const response = await trpc.scrapping.amazonItems.query({ searchInput: input });
      setItems(response);
    } catch (error) {
    }
    setIsLoading(false)
  };

  return (
    <>
      <div className=" min-h-screen bg-white">
        <div className="h-[40vh] bg-blue-100 flex justify-center items-center">
          <div className="flex flex-col gap-12">
            <div className="flex justify-center flex-col items-center gap-2">
              <p className="text-blue-400 text-3xl md:text-5xl font-bold uppercase flex gap-2">
                <MdOutlineCleaningServices />Amazon Scrapper</p>
              <p className="md:text-lg text-slate-500">Get a list of the top Amazon products from here.</p>
            </div>

            <form className="relative" onSubmit={(e) => handleSubmit(e)}>
              <input type="text" placeholder="search the item name ex: bat" name="searchInput" id="searchInput"
                className="input input-bordered input-primary w-full max-w-xl bg-white rounded-full pl-12" />
              <CiSearch className=" absolute top-0 bottom-0 left-3 translate-y-3" size={25} />
            </form>
          </div>
        </div>

        {isLoading && <div className="grid md:grid-cols-4 grid-cols-1 p-10 gap-10">
          {Array(4).fill({}).map((e, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>}

        <div className="grid md:grid-cols-4 grid-cols-1 p-10 gap-10">
          {!!items.length && items?.map((item, index) => (
            <Card name={item.name} price={item.price} star={item.star} image={item.image} url={item.url} key={index} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
