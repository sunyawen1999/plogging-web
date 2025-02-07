"use client"

import Header from "@/components/Header";
import Link from 'next/link';
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ListItem from "@/components/ListItem";

export default function Home() {
  const router = useRouter();

  return (
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <Header>
        <div className="mb-2">
          <h1
            className="
              text-white
              text-3xl
              sont-semibold
            "
          >
            Welcome to Plogging the world!
          </h1>

        </div>
      </Header>
      <div>
        <ListItem
          image="/plogging.jpg"
          name="Liked Songs"
          href="/liked"
        />
      </div>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            <Link href="/jogging">
                <Button onClick={() => router.push('/jogging')}>Start Jogging</Button>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
