import { ReactNode } from "react";
import { Star } from "lucide-react";

type BallProps = {
    children: ReactNode;
    star?: boolean;
};

export function Ball({ children, star = false }: BallProps) {
    return (
        <div
            className={`
        relative flex aspect-square items-center justify-center
        rounded-full font-bold text-black
        shadow-lg shadow-black/20
        w-10 sm:w-14 md:w-16
        ${star ? "bg-yellow-200" : "bg-white"}
      `}>
            {star && (
                <Star className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400 md:h-6 md:w-6" />
            )}

            <span className="text-base sm:text-xl md:text-2xl">{children}</span>
        </div>
    );
}
