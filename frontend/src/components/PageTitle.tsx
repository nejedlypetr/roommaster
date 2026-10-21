import tw from "twin.macro";

type TPrimaryTextPlacement = 'left' | 'center' | 'right';

type TPageTitleProps = {
  primaryText: string;
  secondaryText?: string;
  primaryTextPlacement?: TPrimaryTextPlacement;
};

const Container = tw.div`flex flex-col items-center justify-center gap-2 my-8`;
const SecondaryText = tw.h4`text-primary-blue font-medium text-lg w-full`;
const PrimaryText = tw.h1`text-black font-bold text-3xl w-full`;

export const PageTitle = ({ primaryText, secondaryText, primaryTextPlacement = 'center' }: TPageTitleProps) => {
  const alignmentClasses = {
    left: 'text-start',
    center: 'text-center', 
    right: 'text-end'
  };

  return (
    <Container className={alignmentClasses[primaryTextPlacement]}>
      {secondaryText && <SecondaryText>{secondaryText}</SecondaryText>}
      <PrimaryText>{primaryText}</PrimaryText>
    </Container>
  );
};