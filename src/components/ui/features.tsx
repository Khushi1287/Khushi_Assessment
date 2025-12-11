import { cn } from "@/lib/utils"
import { CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};


const CARDS = [
  {
    id: 0,
    name: "Priya Sharma",
    designation: "Life Storyteller",
    content: (
      <p>
        <Highlight>Lekh</Highlight> has completely transformed how I document my life. The AI-powered insights and{" "}
        <Highlight>personalized diary features</Highlight> help me capture and reflect on my memories beautifully.
      </p>
    ),
  },
  {
    id: 1,
    name: "Rahul Kumar",
    designation: "Memory Keeper",
    content: (
      <p>
        The <Highlight>comprehensive biodata features</Highlight> and AI-powered insights from Lekh made all the difference. The platform's{" "}
        <Highlight>memory tracking system</Highlight> helps me organize my life story beautifully.
      </p>
    ),
  },
  {
    id: 2,
    name: "Anjali Patel",
    designation: "Life Storyteller",
    content: (
      <p>
        After joining <Highlight>Lekh</Highlight>, I've captured over 500 memories. The AI-powered features and{" "}
        <Highlight>beautiful biodata templates</Highlight> have made it an essential tool for documenting my life journey.
      </p>
    ),
  },
];


const integrations = [
  {
    name: "Mock Tests",
    desc: "Create beautiful biodata profiles with AI-powered insights and templates",
    icon: "📝",
  },
  {
    name: "Study Planner",
    desc: "Plan your preparation with AI-powered study schedules",
    icon: "📅",
  }
];


export default function PersonaSection() {
  const handleFeatureClick = (featureName: string) => {
    // In a real app, this would navigate to the feature page or show more details
    console.log(`Clicked on ${featureName}`)
  }

  return (
    <section className="mx-auto px-24 md:px-40 py-12 sm:py-16 lg:py-32">
      <div className="mb-16 text-left px-2">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
          The journey to
          <span className="text-primary"> excellence</span>
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl">
          The platform trusted by thousands of users. Document your life journey with AI-powered insights, personalized diary features, and beautiful biodata creation.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Left Block */}
        <div className="flex flex-col items-start justify-center border border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 lg:p-8">
          {/* Card */}
          <div className="relative w-full mb-4 sm:mb-6">
            <div className="absolute inset-x-0 -bottom-2 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-white dark:from-black to-transparent z-10"></div>
            <CardStack items={CARDS} />
          </div>

          {/* Content */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-zinc-900 dark:text-white leading-relaxed">
            Personalized Diary Dashboard <span className="text-primary">Lekh</span>{" "}
            <span className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base lg:text-lg"> Track your memories, analyze your life patterns, and get AI-powered insights to enrich your personal journey.</span>
          </h3>
        </div>

        {/* Right Block */}
        <div className="flex flex-col items-center justify-start border border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 lg:p-8">
          {/* Card with integration list */}
          {/* Content */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-zinc-900 dark:text-white mb-4 sm:mb-6 leading-relaxed">
            Comprehensive Life Tools <span className="text-primary">Lekh</span>{" "}
            <span className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base lg:text-lg"> Access all your diary entries, biodata profiles, and personal memories in one integrated platform designed for life documentation.</span>
          </h3>
          <div
            className={cn(
              "group relative mt-auto w-full inline-flex animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-2 font-medium text-primary-foreground transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

              // before styles
              "before:absolute before:bottom-[8%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
            )}
          >
            {/* Integration List */}
            <CardContent className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-2xl sm:rounded-3xl z-10 w-full">
              {integrations.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 sm:p-3 border border-zinc-200 dark:border-zinc-700 rounded-xl sm:rounded-2xl hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-muted flex items-center justify-center text-sm sm:text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 sm:line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleFeatureClick(item.name)}
                    className="rounded-full border border-zinc-200 dark:border-zinc-700 p-1.5 sm:p-2 text-xs font-semibold flex-shrink-0 ml-2 hover:bg-muted/50 transition-colors cursor-pointer"
                    aria-label={`Add ${item.name} to favorites`}
                  >
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              ))}
            </CardContent>
          </div>
        </div>
      </div>

      {/* Stats and Testimonial Section */}
      <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 w-full text-center sm:text-left">
            <div className="space-y-2 sm:space-y-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white">10K+</div>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-400">Active Students</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white">500+</div>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-400">Active Users</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white">85%</div>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-400">Success Rate</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <blockquote className="border-l-2 border-zinc-200 dark:border-zinc-700 pl-4 sm:pl-6 lg:pl-8 text-zinc-700 dark:text-zinc-400">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed">Lekh has been a game-changer in how I document my life. The AI-powered insights, beautiful templates, and comprehensive features helped me create a meaningful record of my journey.</p>
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <cite className="block font-medium text-sm sm:text-base text-zinc-900 dark:text-white">Sarah Chen, Life Storyteller</cite>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">500+ memories captured</div>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative mx-auto h-48 w-full md:h-48 md:w-96 my-4">

      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-48 w-full md:h-48 md:w-96 rounded-3xl p-4 shadow-xl border border-zinc-200 dark:border-white/[0.1] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="font-normal text-zinc-700 dark:text-zinc-200">
              {card.content}
            </div>
            <div>
              <p className="text-zinc-500 font-medium dark:text-white">
                {card.name}
              </p>
              <p className="text-zinc-400 font-normal dark:text-zinc-200">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
