import { FaultStepper } from './FaultStepper';
import tw from 'twin.macro';
import { TFaultLog } from '@/types/TFaultLog';
import { AddFaultForm } from './AddFaultForm';
import { useRoomFaultMutation } from '@/hooks/useRoomFaultMutation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type TFaultLogProps = {
  faultLogs: Array<TFaultLog>;
  roomId: number;
};

const FaultTitle = tw.h2`text-black font-bold text-lg`;

export const FaultLog = ({ faultLogs, roomId }: TFaultLogProps) => {
  const { mutate: addFault } = useRoomFaultMutation({ roomId });
  const [isExpanded, setIsExpanded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center w-full md:w-[60%] border-b border-gray-200 pb-2">
        <FaultTitle>Fault Log</FaultTitle>
        <div className="flex items-center gap-2">
          <AddFaultForm onSubmit={addFault} />
          {!isDesktop && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2"
            >
              {isExpanded ? (
                <>
                  Hide
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      {(isDesktop || isExpanded) && <FaultStepper faultLogs={faultLogs} />}
    </div>
  );
};