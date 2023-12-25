import * as React from "react"

import { MdOutlineCurrencyRupee } from "react-icons/md";
import { cn } from "../lib/utils"

interface CardProps extends
    React.HTMLAttributes<HTMLDivElement> {
    name: string,
    price: string,
    star: string,
    image: string,
    url: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ name, price, star, image, url, className, children, ...props }, ref) => (
        <div ref={ref} className={cn("flex justify-center items-center", className)}{...props}>

            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt={image} /></figure>
                <div className="card-body bg-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="card-title">{name.substring(0, 30)}</h2>
                        </div>
                        <div>
                            <span className="badge badge-outline badge-primary text-white text-md">
                            <MdOutlineCurrencyRupee/> {price}
                            </span>
                        </div>
                    </div>
                    <p>{star}</p>
                    <div className="card-actions justify-end">
                        <a href={url} target="__blank" className="btn btn-primary text-white">Buy Now</a>
                    </div>
                </div>

            </div>
        </div>
    ))

Card.displayName = "Card"

export default Card