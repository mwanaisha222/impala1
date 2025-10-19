import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  name: string;
  role: string;
  image?: string;
  bio: string;
}

export default function BoardCard({ name, role, image, bio }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="relative bg-gray-50 h-80 md:h-96 flex items-center justify-center">
        {image && (
          <img src={image} alt={name} className="w-full h-full object-contain" />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-orange-600 font-medium mb-3">{role}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{bio.substring(0, 120)}...</p>
        <Button onClick={() => setOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">View Profile</Button>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg max-w-3xl w-full p-6 mx-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{name}</h3>
                  <p className="text-orange-600">{role}</p>
                </div>
                <button className="text-gray-500" onClick={() => setOpen(false)}>Close</button>
              </div>
              <div className="mt-4 text-gray-700 whitespace-pre-line">
                {bio}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
