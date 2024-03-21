// TaskDrawer.js
import * as React from "react";
import { ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import TaskProgressBar from "./task.progress";
import WeightBar from "./task.weight";

export default function TaskDrawer({ isOpen, onClose, progress, weight, getWeightBackgroundColor }) {
  
  
  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Lorem ipsum dolor sit amet consectetur.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              {/* Some content here */}
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <TaskProgressBar progress={progress} />
                <WeightBar
                  weight={weight}
                  getWeightBackgroundColor={getWeightBackgroundColor}
                />
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            {/* Buttons here */}
            <Button onClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
