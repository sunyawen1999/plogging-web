"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

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
            <p className="font-medium py-5 whitespace-normal leading-6 text-white text-left">
                <span className="text-lg font-bold">
                    Plogging
                </span>
                <span className="italic">
                    {" "}is basically jogging but make it eco-friendly — picking up trash while breaking a sweat.
                </span>
                <br />
                <span className="text-green-400 font-semibold">
                    It’s not just an activity, it’s a vibe.
                </span>  
                {" "}Ploggers are proud trash warriors, saving the planet and staying fit, one jog at a time. 🌍💪
                <br />
                <strong>
                    Over <span className="text-yellow-400">3 million people</span> have joined the plogging squad
                </strong> — from solo missions to epic group clean-ups. 
                <br />
                {" "}Every day, around <span className="text-blue-400">20,000 eco-heroes</span> are out there plogging in 100+ countries. Let’s go! 🚀
            </p>

        </button>
    );
}
 
export default ListItem;