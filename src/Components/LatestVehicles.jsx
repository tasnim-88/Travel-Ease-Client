import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    animate
} from "framer-motion"
import { useNavigate } from 'react-router';

const LatestVehicles = () => {
    const [allCars, setAllCars] = useState([]);
    const containerRef = useRef(null);
    const navigate = useNavigate()

    const { scrollXProgress } = useScroll({ container: containerRef });

    const maskImage = useScrollOverflowMask(scrollXProgress);

    useEffect(() => {
        axios.get(`http://localhost:3000/latestVehicle`)
            .then(data => {
                setAllCars(data.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleLatestCar=(id)=>{
        navigate(`/viewDetails/${id}`)
    }

    return (
        <div className="p-6 bg-base-100 relative">
            <h1 className="text-2xl font-bold mb-6 mt-6 ">Latest Vehicles</h1>

            <svg className="w-20 h-20 absolute top-4 right-2 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="stroke-base-300 fill-none stroke-[10%]" />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    className="stroke-primary fill-none stroke-[10%]"
                    style={{ pathLength: scrollXProgress }}
                />
            </svg>

            <motion.div
                ref={containerRef}
                style={{ maskImage }}
                className="flex gap-6 overflow-x-auto py-4 px-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-200"
            >
                {allCars.map((car, index) => (
                    <motion.div
                        key={car._id}
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            transition: {
                                delay: index * 0.1,
                                duration: 0.5,
                                ease: "easeOut"
                            }
                        }}
                        viewport={{ once: true }}
                        whileHover={{
                            scale: 1.05,
                            y: -5,
                            transition: { duration: 0.2 }
                        }}
                        onClick={() => handleLatestCar(car._id)}
                        className="bg-base-200 glass rounded-2xl p-5 min-w-[280px] shadow-md hover:shadow-xl cursor-pointer flex-shrink-0"
                    >
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <motion.img
                                    src={car.coverImage}
                                    alt={car.vehicleName}
                                    className="w-full object-contain h-28 mx-auto mb-4"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <div className="grow">
                                <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                                    {car.vehicleName}
                                </h2>
                                <p className="text-primary font-medium">${car.pricePerDay} /day</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};


const left = `0%`
const right = `100%`
const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`

const useScrollOverflowMask = (scrollXProgress) => {
    const maskImage = useMotionValue(
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    )

    useMotionValueEvent(scrollXProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
            )
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
            )
        } else if (
            scrollXProgress.getPrevious() === 0 ||
            scrollXProgress.getPrevious() === 1
        ) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
            )
        }
    })

    return maskImage
}

export default LatestVehicles;