import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  School,
  Award,  
  BookOpen,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  Camera,
  ChevronRight,
  ChevronLeft,
  Info,
  Sparkles
} from 'lucide-react';

import { useSiteContent } from "@/hooks/useSiteContent";

interface OrgItem {
  name: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  children?: OrgItem[];
}

/**
 * OrgNode Component
 * Renders individual nodes in the organizational hierarchy with recursive children.
 */
const OrgNode = ({ item, isRoot = false, delay = 0 }: { item: OrgItem; isRoot?: boolean; delay?: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`flex flex-col items-center w-full transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Node Card - Width increased to accommodate larger images */}
      <div
        className={`relative p-8 rounded-3xl border transition-all duration-300 shadow-sm
          ${isRoot
            ? 'bg-[#4a3728] border-[#3d2e21] text-white w-80 shadow-xl'
            : 'bg-white border-stone-200 text-[#4a3728] w-72'}
          hover:shadow-2xl hover:-translate-y-1 group cursor-default flex flex-col items-center text-center`}
      >
        {/* Profile Image / Icon Container - Increased sizing for better visibility */}
        <div className={`w-40 h-40 rounded-full mb-6 border-4 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105
          ${isRoot ? 'bg-[#5d4634] border-[#8b7355]' : 'bg-stone-50 border-stone-100'}`}>
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center">
              <Camera size={48} className={isRoot ? 'text-[#8b7355]' : 'text-stone-300'} />
              <span className={`text-[10px] mt-2 font-bold ${isRoot ? 'text-[#8b7355]' : 'text-stone-300'}`}>PHOTO</span>
            </div>
          )}
        </div>

        <div className="w-full">
          <h3 className={`font-serif font-bold text-lg leading-tight mb-1 ${isRoot ? 'text-white' : 'text-[#4a3728]'}`}>
            {item.name || "TBD"}
          </h3>
          <div className={`h-px w-10 mx-auto mb-3 ${isRoot ? 'bg-[#8b7355]' : 'bg-stone-200'}`}></div>
          <p className={`text-[11px] font-bold uppercase tracking-[0.15em] ${isRoot ? 'text-[#c2b2a3]' : 'text-[#8b7355]'}`}>
            {item.title}
          </p>
          {item.subtitle && (
            <p className={`text-[11px] mt-1 italic ${isRoot ? 'text-stone-300 opacity-80' : 'text-stone-400'}`}>
              {item.subtitle}
            </p>
          )}
        </div>
       
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute -bottom-5 left-1/2 -translate-x-1/2 border w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg z-10
              ${isExpanded ? 'bg-[#8b7355] border-[#4a3728] text-white' : 'bg-white border-stone-200 text-[#8b7355] hover:bg-stone-50'}`}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        )}
      </div>

      {/* Vertical Connection Line Below Parent */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center">
           <div className="h-12 w-0.5 bg-gradient-to-b from-[#8b7355] to-stone-300"></div>
        </div>
      )}

      {/* Children Container */}
      {hasChildren && isExpanded && (
        <div className="relative flex flex-row justify-center gap-16 px-6">
          {/* Horizontal connecting line */}
          {item.children.length > 1 && (
            <div
              className="absolute top-0 h-0.5 bg-stone-300 rounded-full"
              style={{
                left: `${100 / (item.children.length * 2)}%`,
                right: `${100 / (item.children.length * 2)}%`
              }}
            ></div>
          )}
         
          {item.children.map((child: OrgItem, index: number) => (
            <div key={index} className="flex flex-col items-center">
              {/* Vertical line above child */}
              <div className="h-8 w-0.5 bg-stone-300 mb-0"></div>
              <OrgNode item={child} delay={150} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Organogram = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { getContent } = useSiteContent("about");

  // Auto-center the organogram on load
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      container.scrollLeft = (scrollWidth - clientWidth) / 2;
      updateArrows();
    }
  }, []);

  const updateArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  // Institutional Data Structure
  const data = {
    name: getContent("organogram", "director_name", "Director's Office"),
    title: "Executive Director",
    subtitle: "Elyon Schools Board",
    imageUrl: getContent("organogram", "director_photo", ""),
    children: [
      {
        name: getContent("organogram", "principal_name", "Principal's Office"),
        title: "Principal",
        subtitle: "Group Management",
        imageUrl: getContent("organogram", "principal_photo", ""),
        children: [
          {
            name: getContent("organogram", "mutungo_headmaster_name", "Mutungo Campus"),
            title: "Headmaster",
            subtitle: "Mutungo Primary",
            imageUrl: getContent("organogram", "mutungo_headmaster_photo", ""),
            children: [
              {
                name: getContent("organogram", "mutungo_admin_name", "Admin Office"),
                title: "Deputy Administrator",
                subtitle: "Ops & Logistics",
                imageUrl: getContent("organogram", "mutungo_admin_photo", ""),
              },
              {
                name: getContent("organogram", "mutungo_curriculum_name", "Curriculum Dept"),
                title: "Head of Curriculum",
                subtitle: "Academic Strategy",
                imageUrl: getContent("organogram", "mutungo_curriculum_photo", ""),
              },
              {
                name: getContent("organogram", "mutungo_academics_name", "Academics Office"),
                title: "Deputy Academics",
                subtitle: "Standards & Exams",
                imageUrl: getContent("organogram", "mutungo_academics_photo", ""),
              }
            ]
          },
          {
            name: getContent("organogram", "nsangi_headmaster_name", "Nsangi Campus"),
            title: "Headmaster",
            subtitle: "Nsangi Primary",
            imageUrl: getContent("organogram", "nsangi_headmaster_photo", ""),
            children: [
              {
                name: getContent("organogram", "nsangi_admin_name", "Admin Office"),
                title: "Deputy Administrator",
                subtitle: "Ops & Logistics",
                imageUrl: getContent("organogram", "nsangi_admin_photo", ""),
              },
              {
                name: getContent("organogram", "nsangi_curriculum_name", "Curriculum Dept"),
                title: "Head of Curriculum",
                subtitle: "Academic Strategy",
                imageUrl: getContent("organogram", "nsangi_curriculum_photo", ""),
              },
              {
                name: getContent("organogram", "nsangi_academics_name", "Academics Office"),
                title: "Deputy Academics",
                subtitle: "Standards & Exams",
                imageUrl: getContent("organogram", "nsangi_academics_photo", ""),
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#fdfcfb] font-sans selection:bg-[#8b7355] selection:text-white overflow-x-hidden py-16">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative">
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12 text-[#4a3728]">Our Organizational Structure</h2>
        
        {/* Organogram Section with Animated Guides */}
        <div className="relative group/scroll mt-8">
         
          {/* Left Navigation Guide */}
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-opacity duration-500 ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`}>
             <div className="flex items-center">
                <div className="bg-gradient-to-r from-[#8b7355]/20 to-transparent w-32 h-64 blur-xl absolute left-0"></div>
                <div className="relative ml-4 flex flex-col items-center animate-pulse">
                  <ChevronLeft size={64} className="text-[#8b7355] drop-shadow-lg" />
                  <span className="text-[10px] font-bold text-[#8b7355] uppercase tracking-tighter -mt-2">Scroll</span>
                </div>
             </div>
          </div>

          {/* Right Navigation Guide */}
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-opacity duration-500 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`}>
             <div className="flex items-center justify-end">
                <div className="bg-gradient-to-l from-[#8b7355]/20 to-transparent w-32 h-64 blur-xl absolute right-0"></div>
                <div className="relative mr-4 flex flex-col items-center animate-pulse">
                  <ChevronRight size={64} className="text-[#8b7355] drop-shadow-lg" />
                  <span className="text-[10px] font-bold text-[#8b7355] uppercase tracking-tighter -mt-2">Scroll</span>
                </div>
             </div>
          </div>

          {/* Tree Container with horizontal scroll */}
          <div
            ref={scrollContainerRef}
            onScroll={updateArrows}
            className="overflow-x-auto pb-48 cursor-grab active:cursor-grabbing scrollbar-hide relative"
          >
            {/* Ambient Lighting Overlay (Shimmer) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#8b7355]/5 to-transparent animate-[shimmer_8s_infinite] skew-x-12 transform scale-150 z-0"></div>

            <div className="inline-flex min-w-full justify-center py-10 relative z-10">
              <OrgNode item={data} isRoot={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind Style Extension for Shimmer Animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-12deg); }
          50% { transform: translateX(150%) skewX(-12deg); }
          100% { transform: translateX(-150%) skewX(-12deg); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Floating Action Hint */}
      <div className="hidden md:flex items-center justify-center gap-3 mt-8">
        <div className="bg-white/90 backdrop-blur-md p-3 px-5 rounded-full border border-stone-200 shadow-xl flex items-center gap-3">
          <Sparkles size={16} className="text-[#8b7355] animate-spin-slow" />
          <span className="text-[10px] font-bold text-[#4a3728] uppercase tracking-wider">Drag or swipe to explore campuses</span>
        </div>
      </div>
    </div>
  );
};
