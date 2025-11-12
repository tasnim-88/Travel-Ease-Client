import React from 'react';
import { Link } from 'react-router';


const Error = () => {
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center  px-4 text-center">
                {/* Image */}
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtQ2ZqARUsAFR7kOMGWM7mo2q8kB_HecoNNYN5gnpwROYoixNX0ZC0D6xdo72rFHGx3s6M4uKK8SxQnmAQdo6PrVgE_oqREKUENAoPwhs2uYKWVPs-p2S1K04m9JTm2Ip-5zuGUR7727q0mO9KC34WiEX1Ef6fpGwJX7DdhleB3E69d5IY9OVkEK62XNCdFYKr2QeicaSx_cJu0ZY4HSrGE0LJjkEaY64b1ZRqkSwaCUUU2OxN5mlGnHqH_fDH8gX0WrPnu4EXvGCl"
                    alt="Lost Robot"
                    className="w-64 mb-8"
                />

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold mb-3">
                    Oops! 404
                </h1>

                {/* Description */}
                <p className="text-gray-600 max-w-md mb-8">
                    The page you're looking for can’t be
                    found.
                </p>

                {/* Button */}
                <Link
                    to="/"
                    className="bg-[#FF8A00] hover:bg-[#FF7300] text-white font-medium py-3 px-6 rounded-full shadow-md transition-all duration-200"
                >
                    Back to the Cars
                </Link>
            </div>
        </div>
    );
};

export default Error;