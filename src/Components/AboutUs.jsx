import React from "react";
import { ArrowUpRight, CheckCircle, Calendar, Truck } from "lucide-react";

const AboutUs=()=> {
    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left visual */}
                <div className="lg:col-span-6 flex justify-center lg:justify-start">
                    <div className="relative w-[420px] h-[420px]">
                        {/* Big circular image */}
                        <div className="absolute -left-8 top-0 w-96 h-96 rounded-[50%] overflow-hidden border-4 border-white shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
                                alt="driver"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Overlapping smaller circle */}
                        <div className="absolute right-0 bottom-0 w-56 h-56 rounded-[50%] overflow-hidden border-4 border-white shadow-lg">
                            <img
                                src="https://demo.awaikenthemes.com/novaride/wp-content/uploads/2024/08/about-img-2.jpg"
                                alt="agent"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Decorative marks */}
                        <div className="absolute -right-10 top-28 text-orange-500 text-4xl font-black">✳</div>
                        <div className="absolute -left-4 bottom-8 text-slate-800 text-2xl opacity-60">✦</div>
                    </div>
                </div>

                {/* Right content */}
                <div className="lg:col-span-6">
                    <div className="max-w-xl">
                        <p className="text-2xl font-bold mb-3">About Us</p>
                        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                            Your trusted partner in reliable car rental
                        </h2>

                        <p className="text-slate-600 mb-8">
                            At TravelEase, we believe renting or sharing a vehicle should be effortless, transparent, and secure. Our platform empowers individuals and businesses to explore, list, and manage vehicles for rent or travel with confidence. Whether you're a traveler looking for the perfect ride or a vehicle owner aiming to earn extra income, DriveEase offers a seamless experience powered by modern technology.
                        </p>

                        {/* Feature list */}
                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-50 rounded-full p-3 shrink-0">
                                    <Calendar className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold">Easy Booking Process</h4>
                                    <p className="text-sm text-slate-500">Optimized booking process so clients experience the easiest and the safest service.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-orange-50 rounded-full p-3 shrink-0">
                                    <Truck className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold ">Convenient Pick-Up & Return</h4>
                                    <p className="text-sm text-slate-500">Multiple pick-up and return options, with owner-managed schedules and secure handovers.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="inline-flex items-center gap-3 bg-orange-600 text-white px-5 py-3 rounded-full font-semibold shadow hover:bg-orange-700 transition">
                                Contact Us
                                <span className="w-8 h-8 bg-white/10 rounded-full inline-flex items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs
