import { ReactNode } from "react";

type CardProps = {
  image: ReactNode;
  color?: string;
  title: string;
  description?: string;
  value?: string;
};

export const Card = ({
  image,
  color,
  title,
  description,
  value,
}: CardProps) => {
  return (
    <div
      className="flex rounded-xl h-18 outline-1 outline-light items-center p-3 gap-3"
      style={{
        background: color
          ? `linear-gradient(105.12deg, ${color}4D 0%, ${color}00 24.03%)`
          : undefined,
      }}
    >
      {image}

      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-1 justify-between">
          <p className="text-base font-semibold  capitalize">{title}</p>
          <p className="text-base font-semibold">{value}</p>
        </div>
        <p className="text-sm text-subdued font-medium">{description}</p>
      </div>
    </div>
  );
};
