import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn("animate-pulse bg-muted rounded", className)} />
);

export const CardSkeleton = () => (
  <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
    <Skeleton className="aspect-video" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

export const BlogGridSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export const TeamMemberSkeleton = () => (
  <div className="bg-card border border-border/50 rounded-2xl p-6 text-center space-y-4">
    <Skeleton className="w-24 h-24 rounded-full mx-auto" />
    <Skeleton className="h-5 w-32 mx-auto" />
    <Skeleton className="h-4 w-24 mx-auto" />
    <div className="flex justify-center gap-2">
      <Skeleton className="w-8 h-8 rounded" />
      <Skeleton className="w-8 h-8 rounded" />
    </div>
  </div>
);

export const StatSkeleton = () => (
  <div className="text-center space-y-2">
    <Skeleton className="h-12 w-24 mx-auto" />
    <Skeleton className="h-4 w-32 mx-auto" />
  </div>
);
