import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type CarouselCoursesProps = {
  items: { id?: string | number; content: React.ReactNode }[]
  className?: string
}

// Generic carousel for course-like cards. Provide an items array to control length & content.
export function CarouselCourses({ items, className }: CarouselCoursesProps) {
  return (
    <Carousel className={"w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl " + (className || "") }>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={item.id ?? index}>
            <div>
              <Card className="border-0">
                <CardContent className="flex aspect-square items-center justify-center p-4 sm:p-6">
                  <span className="text-base sm:text-lg font-medium text-center break-words w-full h-full flex items-center justify-center">
                    {item.content}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="ghost" className="border-0 shadow-sm shadow-black/10 bg-white/80 hover:bg-white" />
      <CarouselNext variant="ghost" className="border-0 shadow-sm shadow-black/10 bg-white/80 hover:bg-white" />
    </Carousel>
  );
}
