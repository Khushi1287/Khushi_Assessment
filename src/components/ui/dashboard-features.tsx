import { cn } from "@/lib/utils";
import {
  Users,
  FileText,
  FileEdit,
  Sparkles,
  HelpCircle,
  CheckSquare,
  TrendingUp,
  Search,
  Calendar,
  Book,
  Layers,
  Calculator,
  FileQuestion,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Collaboration",
      description:
        "Share memories with friends and family",
      icon: <Users />,
    },
    {
      title: "Memory Archive",
      description:
        "Access your archived memories and entries",
      icon: <FileText />,
    },
    {
      title: "My Diary",
      description:
        "Create, Organize and access your diary entries",
      icon: <FileEdit />,
    },
    {
      title: "Lekh AI",
      description: "Get instant answers to your queries",
      icon: <Sparkles />,
    },
    {
      title: "Biodata Builder",
      description: "Create beautiful biodata profiles",
      icon: <HelpCircle />,
    },
    {
      title: "AI Insights",
      description:
        "Get AI-powered insights from your diary entries",
      icon: <CheckSquare />,
    },
    {
      title: "Progress Tracker",
      description:
        "Track your life journey and milestones",
      icon: <TrendingUp />,
    },
    {
      title: "Memory Analysis",
      description: "Analysis of your diary patterns and trends",
      icon: <Search />,
    },
    {
      title: "Quick Memories",
      description: "Quick access to your favorite memories",
      icon: <FileEdit />,
    },
    {
      title: "Daily Planner",
      description: "Track your daily activities and memories",
      icon: <Calendar />,
    },
    {
      title: "Templates",
      description: "Access beautiful biodata templates",
      icon: <Book />,
    },
    {
      title: "Life Stories",
      description: "Personal insights and memories",
      icon: <Layers />,
    },
    {
      title: "Export & Share",
      description: "Export and share your biodata",
      icon: <Calculator />,
    },
    {
      title: "Privacy & Security",
      description: "Secure storage for your personal data",
      icon: <FileQuestion />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 mx-auto gap-6 px-6">
      {features.map((feature) => (
        <Feature key={feature.title} {...feature} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col relative group/feature bg-white dark:bg-card rounded-lg border border-border p-6",
        "hover:shadow-lg transition-all duration-200 hover:border-primary/20"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-br from-primary/5 dark:from-primary/10 to-transparent pointer-events-none rounded-lg" />
      <div className="mb-4 relative z-10 text-primary">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10">
        <span className="group-hover/feature:text-primary transition-colors duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 relative z-10">
        {description}
      </p>
    </div>
  );
};
