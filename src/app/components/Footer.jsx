export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-blue-900 p-4 shadow-2xl flex justify-center items-center">
            <p className="text-sm text-center text-white tracking-wide">
                {`All rights reserved ${year}`} &copy;
            </p>
        </footer>
    );
}
