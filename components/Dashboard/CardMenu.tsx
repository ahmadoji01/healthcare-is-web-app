import React, { ReactNode } from 'react';

interface CardMenuOverviewProps {
  subtitle?: string;
  title: string;
  total: string;
  children: ReactNode;
}

const CardMenu: React.FC<CardMenuOverviewProps> = ({
  subtitle,
  title,
  total,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="font-bold text-black dark:text-white">
            {total}
          </h4>
          { subtitle && <h5 className="w-full font-small">{subtitle}</h5>}
          <span className="font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardMenu;