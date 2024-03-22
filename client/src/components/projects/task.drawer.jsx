import * as React from "react";
import { ResponsiveContainer } from "recharts";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import TaskProgressBar from "./task.progress";
import WeightBar from "./task.weight";
import { Button } from "../ui/button";
import MembersCard from "./see.members";
import SquareClose from "../common/buttons/square.close";

export default function TaskDrawer({
  isOpen,
  onClose,
  progress,
  weight,
  getWeightBackgroundColor,
}) {
  const [showMembersCard, setShowMembersCard] = React.useState(false);
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full grid grid-flow-col grid-cols-3 ">
          <div className="bg-gray-100 flex flex-col items-center">
            <DrawerHeader>
              <DrawerTitle>Assigned members</DrawerTitle>
            </DrawerHeader>
            <div className="mt-3 h-[120px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                Hello
              </ResponsiveContainer>
            </div>
            <DrawerFooter>
              <Button onClick={() => setShowMembersCard(true)}>
                See members
              </Button>
            </DrawerFooter>
          </div>
          <div className="bg-gray-200 flex flex-col items-center">
            <DrawerHeader>
              <DrawerTitle>Task Weight</DrawerTitle>
            </DrawerHeader>
            <div className="mt-3 h-[120px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <WeightBar
                  weight={weight}
                  getWeightBackgroundColor={getWeightBackgroundColor}
                />
              </ResponsiveContainer>
            </div>
            <DrawerFooter>{/* <Button>sample</Button> */}</DrawerFooter>
          </div>
          <div className="bg-gray-300 flex flex-col items-center">
            <DrawerHeader>
              <DrawerTitle>Task Progress</DrawerTitle>
            </DrawerHeader>
            <div className="mt-3 h-[120px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <TaskProgressBar progress={progress} />
              </ResponsiveContainer>
            </div>
            <DrawerFooter>{/* <Button>sample</Button> */}</DrawerFooter>
          </div>
        </div>
      </DrawerContent>
      {showMembersCard && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <MembersCard />
          {/* <button
            className="absolute top-0 right-0 m-4 text-white hover:text-gray-300"
            onClick={() => setShowMembersCard(false)}
          >
            Close
          </button> */}
          <div className="absolute top-0">
            <SquareClose onClick={() => setShowMembersCard(false)} />
          </div>
        </div>
      )}
    </Drawer>
  );
}
