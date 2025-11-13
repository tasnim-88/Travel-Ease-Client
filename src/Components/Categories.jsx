import React from "react";

const categories = [
  {
    name: "SUVs",
    image:
      "https://static.pakwheels.com/2019/07/2020-audi-q7-91.jpg",
  },
  {
    name: "Electric",
    image:
      "https://www.moveelectric.com/sites/default/files/users/user123747/bmw-ix-xdrive-50-2021-first-drive-review-hero-front.jpg",
  },
  {
    name: "Vans",
    image:
      "https://imgcdn.zigwheels.ph/large/gallery/exterior/22/1734/mercedes-benz-v-class-front-angle-low-view-584909.jpg",
  },
  {
    name: "Sedans",
    image:
      "https://hips.hearstapps.com/mtg-prod/66cd1a9c827e850008aebc76/01-2025-acura-integra-a-spec-front-view.jpg",
  },
];

const Categories = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">
          Top Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((car, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>

              <h3 className="absolute top-4 left-4 text-white text-2xl font-semibold drop-shadow">
                {car.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
