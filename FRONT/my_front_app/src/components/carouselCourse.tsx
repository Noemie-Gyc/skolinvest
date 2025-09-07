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
    <Carousel className={"w-full max-w-xs " + (className || "") }>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={item.id ?? index}>
            <div>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-center break-words">
                    {item.content}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
