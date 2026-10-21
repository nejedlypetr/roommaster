import { TFaultLog } from '@/types/TFaultLog';
import { arrayToDate } from '@/utils/dateUtils';
import { Stepper, Step, StepLabel, StepContent, Typography } from '@mui/material';
import { useState } from 'react';

type TFaultStepperProps = {
  faultLogs: Array<TFaultLog>;
};

export const FaultStepper = ({ faultLogs }: TFaultStepperProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  const handleStepClick = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };

  if (faultLogs.length === 0) {
    return <p className="text-start text-sm text-gray-500 mt-4">No faults yet!</p>
  }

  const sortedFaults = [...faultLogs].sort((a, b) => 
    arrayToDate(b.created).getTime() - arrayToDate(a.created).getTime()
  );

  return (
    <Stepper 
      orientation="vertical" 
      nonLinear
      activeStep={-1}
      sx={{
        marginTop: "16px",
        '& .MuiStepLabel-root': {
          padding: '0',
        },
        '& .MuiStepLabel-labelContainer': {
          width: '100%',
        },
      }}
    >
      {sortedFaults.map((fault, index) => (
        <Step 
          key={fault.id} 
          active={false}
          expanded={activeStep === index}
          onClick={() => handleStepClick(index)}
        >
          <StepLabel
            StepIconProps={{
              sx: {
                color: fault.resolved ? '#0F62FE' : '#f46060',
                cursor: 'pointer',
                '& .MuiStepIcon-text': {
                  fill: 'white',
                },
              },
            }}
          >
            <div className="flex items-center gap-4 w-full cursor-pointer">
              <span className="font-medium">{fault.cause}</span>
              <span className="text-sm text-gray-500 min-w-[120px]">
                {arrayToDate(fault.created).toLocaleDateString()}
              </span>
            </div>
          </StepLabel>
          <StepContent>
            {activeStep === index ? (
              <>
                <Typography>{fault.description}</Typography>
                <Typography variant="caption" className="mt-2">
                  Status: {fault.resolved ? 'Resolved' : 'Pending'}
                </Typography>
              </>
            ) : (
              <Typography variant="caption">
                Status: {fault.resolved ? 'Resolved' : 'Pending'}
              </Typography>
            )}
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};