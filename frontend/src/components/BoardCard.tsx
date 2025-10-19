import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Close button - Fixed at top right */}
              <button 
                className="sticky top-0 right-0 float-right m-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors z-10 shadow-md"
                onClick={() => setOpen(false)}
                aria-label="Close profile"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* Content */}
              <div className="p-6 pt-2 clear-both">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
                  <p className="text-orange-600 font-medium">{role}</p>
                </div>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {bio}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
