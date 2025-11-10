import React from 'react';

const MyBookings = () => {
    return (
        <div>
            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                        <div className="flex min-w-72 flex-col gap-3">
                            <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                                Trips
                            </p>
                            <p className="text-[#9dabb9] text-sm font-normal leading-normal">
                                Your upcoming and completed trips
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="pb-3">
                        <div className="flex border-b border-[#3b4754] px-4 gap-8">
                            <a
                                className="flex flex-col items-center justify-center border-b-[3px] border-b-white text-white pb-[13px] pt-4"
                                href="#"
                            >
                                <p className="text-white text-sm font-bold leading-normal tracking-[0.015em]">
                                    Upcoming
                                </p>
                            </a>
                            <a
                                className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#9dabb9] pb-[13px] pt-4"
                                href="#"
                            >
                                <p className="text-[#9dabb9] text-sm font-bold leading-normal tracking-[0.015em]">
                                    Completed
                                </p>
                            </a>
                        </div>
                    </div>

                    {/* Trip Cards */}
                    {[
                        {
                            name: "2018 Honda Civic",
                            total: "$120",
                            date: "Oct 12 - 15",
                            image:
                                "https://lh3.googleusercontent.com/aida-public/AB6AXuBu7H2vjhhVMcot2jb4_wuUSvYG1Hei3DWltUvNNxt4DN3q6XxgSSkqMzqHr81-jUROvAeDeVfKrgWQWyZAFnRuFgKhBNuzygODXmMN8BMb7Xbve4C-Xv5lfcz-q_DClbI7HAuaetXtxWgVriCgLgkJqTm95KHiW1gkBqEDkzesHC4kyLwe0motlvdyb8vPO-cRzjBBnGI7FZfkU8pE-W6tKQ1ULHD7iuoBlI-iVyOVcy-eEV0WqYbU06FPmutTKGUk1dXyUk5XX9VE",
                        },
                        {
                            name: "2020 Toyota Camry",
                            total: "$250",
                            date: "Nov 20 - 25",
                            image:
                                "https://lh3.googleusercontent.com/aida-public/AB6AXuC3ddkr3jRedrbMi4l1JQIDwrkzjzHqV1BKF3EiXQia_5puw6BdORH9csv-WAFSUsrmVckIYUhTl3ARzQnrQBnzo2Qv2QWkypN8jnoQ81wH3vtxzeNhW2xZ8K6k5p6BPPRvtrhF1SJFjMO7QKo-SVL90UFJswHAWxgxjALXwDQ8xHLd4Cj3w2OkLn3Cjsrf99z1y2teNBnT6Ak6Kt83EUvlxB7yRaY--DKJGZ0sGpqm3PwAbOmtjsC99XpuHbZVxn5asaDcPDyjMBtF",
                        },
                        {
                            name: "2019 Ford Focus",
                            total: "$180",
                            date: "Dec 5 - 10",
                            image:
                                "https://lh3.googleusercontent.com/aida-public/AB6AXuDSnOi85HlqrI50fC8UIv3VSALSCIaRzklXOBnKq1T_8sDLv3MXmwkjU4oqTnj3bwVGd7J1faIgm2rFh_reGUkcUkEJChUjlS22W4CuNIPxdy5y8tYed39ghC720Kyz7HHxQwPEeE0CXzr-kshCdaKBNuQoqyIzCo0wYPMEctDb5ZtauyNC8mcisVrDx93nrjujojbgdwnl-bbC98s5rnpJBPjo_poVxvH-YVPS84OzF1iJum9wNS8yx4kUYsTVJkAQedoqz7STf8Pm",
                        },
                    ].map((trip, idx) => (
                        <div
                            key={idx}
                            className="flex gap-4 bg-[#111418] px-4 py-3 justify-between"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-[70px]"
                                    style={{ backgroundImage: `url(${trip.image})` }}
                                ></div>
                                <div className="flex flex-1 flex-col justify-center">
                                    <p className="text-white text-base font-medium leading-normal">
                                        {trip.name}
                                    </p>
                                    <p className="text-[#9dabb9] text-sm font-normal leading-normal">
                                        Total: {trip.total}
                                    </p>
                                    <p className="text-[#9dabb9] text-sm font-normal leading-normal">
                                        {trip.date}
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0">
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#283039] text-white text-sm font-medium leading-normal w-fit">
                                    <span className="truncate">Contact Owner</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;