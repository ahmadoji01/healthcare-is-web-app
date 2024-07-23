import React, { ReactNode } from 'react';

interface CardMenuOverviewProps {
  title: string;
  children: ReactNode;
}

const CardMenu: React.FC<CardMenuOverviewProps> = ({
  title,
  children,
}) => {
  return (
    <div className="flex rounded-md border border-stroke bg-white h-35 py-6 px-7.5 shadow-default
      dark:border-strokedark dark:bg-boxdark hover:border-4 hover:border-black dark:hover:border-white">
      <div className="flex py-3 items-center justify-center w-full">
        <div className="flex-col mr-2 w-1/4 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>

        <div className="flex-col my-auto w-3/4 items-center justify-center">
          <div>
            <h4 className="font-bold text-black dark:text-white">
              {title}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMenu;