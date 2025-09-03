"use client";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, SparklesIcon } from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    TicketIcon,
    CurrencyDollarIcon,
    ArchiveBoxIcon,
    HomeIcon,
    InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

const lotteryGames = [
    {
        name: "EuroMillions",
        description: "Massive European jackpots up to €240 million. Draws every Tuesday & Friday.",
        href: "/euromillions",
        icon: SparklesIcon,
        color: "text-blue-600",
    },
    {
        name: "UK Lotto",
        description: "The UK's original lottery game. Draws every Wednesday & Saturday.",
        href: "/uk-lotto",
        icon: TicketIcon,
        color: "text-purple-600",
    },
];

const quickLinks = [
    { name: "How to Play", href: "/how-to-play", icon: InformationCircleIcon },
    { name: "Donate", href: "/donation", icon: CurrencyDollarIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20"
                aria-label="Global">
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5 group">
                        <div className="relative">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <SparklesIcon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                LuckyStars
                            </h1>
                            <p className="text-xs text-gray-500 -mt-1">Lottery Results</p>
                        </div>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Desktop navigation */}
                <Popover.Group className="hidden lg:flex lg:gap-x-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                        <HomeIcon className="w-4 h-4" />
                        Latest Results
                    </Link>

                    <Popover className="relative">
                        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 ui-open:bg-blue-50 ui-open:text-blue-600">
                            <ArchiveBoxIcon className="w-4 h-4" />
                            Lottery Games
                            <ChevronDownIcon
                                className="h-4 w-4 flex-none text-gray-400 ui-open:rotate-180 transition-transform"
                                aria-hidden="true"
                            />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1">
                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5 border border-gray-100">
                                <div className="p-4">
                                    {lotteryGames.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-4 rounded-xl p-4 text-sm leading-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gray-50 group-hover:bg-white group-hover:shadow-md transition-all">
                                                <item.icon
                                                    className={`h-6 w-6 ${item.color} group-hover:scale-110 transition-transform`}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="flex-auto">
                                                <Link
                                                    href={item.href}
                                                    className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </Link>
                                                <p className="mt-1 text-gray-600 text-xs leading-5">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gradient-to-r from-gray-50 to-blue-50">
                                    {quickLinks.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center justify-center gap-x-2.5 p-4 text-sm font-semibold text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                                            <item.icon
                                                className="h-5 w-5 flex-none text-gray-400"
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <Link
                        href="/statistics"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                        Statistics
                    </Link>
                </Popover.Group>

                {/* CTA Button */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href="/check-numbers"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <TicketIcon className="w-4 h-4" />
                        Check My Numbers
                    </Link>
                </div>
            </nav>

            {/* Mobile menu */}
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10 bg-black bg-opacity-25" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-4 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
                    <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                        <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
                            <div className="relative">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                                    <SparklesIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    LottoHub
                                </h1>
                                <p className="text-xs text-gray-500 -mt-1">Lottery Results</p>
                            </div>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 -mx-3 rounded-xl px-3 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    <HomeIcon className="w-5 h-5 text-blue-600" />
                                    Latest Results
                                </Link>

                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-xl py-3 pl-3 pr-3.5 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <ArchiveBoxIcon className="w-5 h-5 text-purple-600" />
                                                    Lottery Games
                                                </div>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? "rotate-180" : "",
                                                        "h-5 w-5 flex-none text-gray-400 transition-transform"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...lotteryGames, ...quickLinks].map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center gap-3 rounded-xl py-2 pl-8 pr-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                                        onClick={() => setMobileMenuOpen(false)}>
                                                        <item.icon className="w-4 h-4 text-gray-400" />
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                                <Link
                                    href="/statistics"
                                    className="flex items-center gap-3 -mx-3 rounded-xl px-3 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    Statistics
                                </Link>
                            </div>

                            <div className="py-6">
                                <Link
                                    href="/check-numbers"
                                    className="flex items-center justify-center gap-2 -mx-3 rounded-xl px-3 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    <TicketIcon className="w-5 h-5" />
                                    Check My Numbers
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
