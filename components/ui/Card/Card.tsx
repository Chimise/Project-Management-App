import React from "react";
import cn from "classnames";
import BoltImg from '../../../assets/bolt.png';
import EnvelopeImg from '../../../assets/envelope.png';
import PencilImg from '../../../assets/pencil.png';
import { StaticImageData } from "next/image";

type Image = 'project'|'report'|'message';

interface Task {
    completed: number;
    ongoing: number;
    created: number;
    projects: number;
}

type CardProps = {
    img: Image,
    className?: string;
    children: React.ReactNode;
}

type Images = {
    [Key in Image]: {
        image: StaticImageData;
        title: string;
    };
}

const types: Images = {
    project: {
        image: BoltImg,
        title: 'Projects'
    },
    report: {
        image: PencilImg,
        title: 'Reports'
    },
    message: {
        image: EnvelopeImg,
        title: "Messages"
    }
}



const Card = ({img, className, children}: CardProps) => {
    const image = types[img]?.image || types.project.image;
    const title = types[img].title;
    return (
        <div className={cn(`flex group overflow-hidden border-t-4 border-gray-300 transition-all hover:border-primary duration-300 ease-in-out relative items-center justify-center`, className)}  >
            <div className="w-full h-full grayscale absolute -z-5 bg-left-top bg-cover bg-no-repeat duration-200 transition-all group-hover:grayscale-0 group-hover:scale-125" style={{backgroundImage: `url(${image.src})`}} />
            <div className="space-y-2 md:space-y-5 relative z-0">
                <h2 className="text-gray-700 text-center font-semibold group-hover:text-black text-2xl md:text-3xl">{title}</h2>
                <ul className="text-left">
                    {children}
                </ul>
            </div>
        </div>
    )
};


export default Card;
