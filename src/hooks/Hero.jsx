import React from "react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden px-16 py-16 md:py-20">
            <div className="mx-auto grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
                {/* LEFT CONTENT */}
                <div className="relative z-10">
                    {/* Tagline pill */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FBE3D5] px-4 py-2 text-lg font-medium text-neutral-800">
                        <span>*</span>
                        <span>Get started with SMITIV-Edu</span>
                        <span>*</span>
                    </div>

                    {/* Heading */}
                    <h1 className="md:text-7xl font-bold md:leading-[1.1] tracking-wide text-neutral-900">
                        Find suitable courses from the best mentors
                    </h1>

                    <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-900">
                        The good gathering doesn't bearing day stars over open behold may
                        male tree replenish don't blessed beast days earth fifth let
                        multiply and he every blessed.
                    </p>

                    <div className="mt-8 flex items-center gap-6">
                        <a
                            href="/courses"
                            className="rounded-md bg-neutral-900 px-7 py-4 text-lg text-white transition hover:bg-neutral-700"
                        >
                            Start Learning
                        </a>
                    </div>
                </div>

                {/* RIGHT IMAGE COLLAGE */}
                <div className="relative mx-auto h-[520px] w-full max-w-[560px] lg:h-[600px]">
                    {/* background green shape */}
                    <div className="absolute -right-6 top-0 h-64 w-56 rounded-3xl bg-[#DCE7DC] sm:h-72 sm:w-64" />

                    {/* dotted decoration */}
                    <div className="absolute right-0 top-0 grid grid-cols-4 gap-1.5 p-3">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <span
                                key={i}
                                className="h-1 w-1 rotate-45 bg-emerald-700/60"
                            />
                        ))}
                    </div>

                    {/* main portrait image */}
                    <div className="absolute z-10 left-1/2 top-8 h-[440px] w-[330px] -translate-x-1/2 overflow-hidden rounded-3xl shadow-xl sm:h-[480px] sm:w-[360px]">
                        <img
                            src="https://cdn.prod.website-files.com/64fed37ef8f0a16c147f2b29/64feefd6e8bce1dce6dfb123_hero-image.jpg"
                            alt="Hero"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* small blurred top-left image */}
                    <div className="absolute left-0 top-0 h-24 w-24 overflow-hidden rounded-2xl shadow-lg sm:h-28 sm:w-28">
                        <img
                            src="https://cdn.prod.website-files.com/64fed37ef8f0a16c147f2b29/650036a25829f695456adff4_hero-image-3.jpg"
                            alt="Hero small top"
                            className="h-full w-full object-cover blur-[1px]"
                        />
                    </div>

                    {/* small image bottom-right */}
                    <div className="absolute -right-4 bottom-8 h-32 w-32 overflow-hidden rounded-2xl shadow-lg sm:h-36 sm:w-36">
                        <img
                            src="https://cdn.prod.website-files.com/64fed37ef8f0a16c147f2b29/65003763d8af464b8a4e7dfe_hero-image-2.jpg"
                            alt="Hero small right"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* floating "UI Design Pattern" card */}
                    <div className="absolute bottom-0 left-0 w-56 rounded-2xl bg-[#FBE3D5] p-4 shadow-lg sm:w-60">
                        <h2 className="mb-3 text-base font-bold text-neutral-900">
                            UI Design Pattern
                        </h2>
                        <div className="flex items-center gap-3">
                            <img
                                src="https://cdn.prod.website-files.com/64fed37ef8f0a16c147f2b29/65003afd76af54cd1e9e498e_avatar-3.jpg"
                                alt="Avatar"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="text-sm">
                                <div className="font-semibold text-neutral-900">
                                    Dennis Barrett
                                </div>
                                <div className="flex items-center gap-1 text-xs text-neutral-500">
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    <span>123 Courses</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}