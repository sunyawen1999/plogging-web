"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({
    image,
    name,
    href
}) => {
    const router = useRouter()

    const onClick = () => {
        // Add authentication before push
        router.push(href);
    }

    return ( 
        <button
          className="
            relative
            group
            flex
            items-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-neutral-100/10
            hover:bg-neutral-100/20
            transition
            pr-4
            w-full
          "
        >
            <div className="
              relative
              min-h-[240px]
              min-w-[240px]
            ">
                <Image 
                  className="object-cover"
                  fill
                  src={image}
                  alt="Image"
                />
            </div>
            <p className="font-medium truncate py-5 whitespace-normal leading-6 text-white">
            Plogging is an association and popular movement where the activity itself is about picking up rubbish while jogging. 
            Plogging is a change of attitude and plowers are proud garbage collectors who do something for our environment and 
            health before it is too late. Over 3 million people have participated in organized or solo ploggas.
            Every day, approximately 20,000 people plog in over 100 countries.
            </p>

        </button>
    );
}
 
export default ListItem;