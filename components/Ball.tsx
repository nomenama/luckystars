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
        relative flex aspect-square w-12 items-center justify-center
        rounded-full font-bold text-black
        shadow-lg shadow-black/20
        sm:w-14 md:w-16
        ${star ? "bg-yellow-300" : "bg-white"}
      `}>
            {star && (
                <Star className="absolute -top-1 -right-1 h-5 w-5 fill-yellow-600 text-yellow-600 md:h-6 md:w-6" />
            )}

            <span className="text-lg sm:text-xl md:text-2xl">{children}</span>
        </div>
    );
}
