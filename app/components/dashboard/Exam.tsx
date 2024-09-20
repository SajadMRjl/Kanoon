import { useRouter } from "next/navigation";

interface InputProps {
  title: string;
  description: string;
  id: number;
}

export default function Exam({ title, description, id }: InputProps) {
  const router = useRouter();

  return (
    <ul className="flex flex-col list-none siz">
      <li className="flex flex-row items-center justify-between mx-3">
        <div className="flex flex-row items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={56}
            height={56}
            viewBox="0 0 48 48"
          >
            <g fill="currentColor">
              <path d="M20 15a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zm-1 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"></path>
              <path
                fillRule="evenodd"
                d="M10 27a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm2 1v3h3v-3z"
                clipRule="evenodd"
              ></path>
              <path d="M17.707 15.707a1 1 0 0 0-1.414-1.414L13 17.586l-1.293-1.293a1 1 0 0 0-1.414 1.414L13 20.414z"></path>
              <path
                fillRule="evenodd"
                d="M10 6a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4zm-2 4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2zm28 6a3 3 0 1 1 6 0v20.303l-3 4.5l-3-4.5zm3-1a1 1 0 0 0-1 1v2h2v-2a1 1 0 0 0-1-1m0 22.197l-1-1.5V20h2v15.697z"
                clipRule="evenodd"
              ></path>
            </g>
          </svg>
          <div className="mr-2">
            <div className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
              {title}
            </div>
            <div className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
              {description}
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#9CA3AF] text-[#111418] text-sm font-medium leading-normal w-fit"
            onClick={() => {
              router.push(`/exam/${id}`);
            }}
          >
            <span className="truncate">شروع</span>
          </button>
        </div>
      </li>
    </ul>
  );
}
