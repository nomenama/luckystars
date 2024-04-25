"use client";

export function Button({ text, className, onClick }) {
    return (
        <button className={className} onClick={onClick} aria-label={text}>
            {text}
        </button>
    );
}
