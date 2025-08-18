
'use client'
import React, { useState } from "react";
import Button from "../ui/button";

export default function PhotoFilter() {
  const [active, setActive] = useState("All");

  const categories = ["All", "Entrainements", "Matchs", "Formation", "Sociales",'Competitions'];

  const photos = [
    { id: 1, src: "/Match/5579737.jpg", alt: "Mountain", category: "Entrainements" },
    { id: 2, src: "/Match/5638482.jpg", alt: "Portrait", category: "Entrainements" },
    { id: 3, src: "/Match/9228935.jpg", alt: "City skyline", category: "Entrainements" },
    { id: 4, src: "/Match/Na__August_15.jpg", alt: "Forest", category: "Entrainements" },
    { id: 5, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80", alt: "Smiling person", category: "People" },
    { id: 6, src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", alt: "Abstract shapes", category: "Abstract" },
    { id: 7, src: "https://images.unsplash.com/photo-1504609813442-a8922a45a62b?w=800&q=80", alt: "Street", category: "City" },
    { id: 8, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Beach", category: "Nature" },
  ];

  const filtered = active === "All" ? photos : photos.filter(p => p.category === active);

  return (
    <div className="px-8 md:py-20 space-y-10  w-full">
      <div className="flex justify-center ">
      <h2 className=" text-6xl md:text-5xl font-serif ">Galerie photo</h2>
      </div>

      {/* buttons */}
      <div className="flex flex-wrap justify-center items-center gap-3 ">
        {categories.map(cat => (
          <Button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2  duration-500 focus:outline-none
              ${active === cat ? 'bg-primary text-white ' : 'bg-white text-slate-700 hover:shadow'}
            `}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(photo => (
          <div key={photo.id} className="relative rounded-xl overflow-hidden shadow hover:scale-[1.02] transition-transform">
            <img src={photo.src} alt={photo.alt} className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-sm text-white font-medium">{photo.alt}</p>
              <p className="text-xs text-white/80">{photo.category}</p>
            </div>
          </div>
        )).slice(0,6)}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-destructive "><div className="flex justify-center items-center"><img src="/2803242.jpg" width={400} alt="" /></div>NOT {active}</div>
        )}
      </div>
    </div>
  );
}
