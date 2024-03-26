"use client";

import PortfolioDetailsComponents from "@/components/portfolio-details";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PortfolioDetailsPage() {
  const params = useParams();
  return (
    <>
      <div className="ml-8 mt-8">
        <Link href="/">
          <div className="flex text-white hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="24"
              viewBox="0 0 100 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 12H4m0 0l6-6m-6 6l6 6"
              />
            </svg>
            <p>Back</p>
          </div>
        </Link>
        <PortfolioDetailsComponents slug={params.slug} />
      </div>
    </>
  );
}
