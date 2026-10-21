import { Link } from 'react-router-dom';
import {maintainerRoutes, navigations} from '../config/routes';
import { COLORS } from '@/constants/colors';
import logo from '@/assets/RoomMasterLogo-removebg-preview.png';
import { UserMenu } from './UserMenu';
import {useStore} from "@/store";
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type TNavigationProps = {
  className?: string;
};

export const Navigation = ({ className }: TNavigationProps) => {
  const { role } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const combinedRoutes = role === "MAINTAINER" ? [...navigations, ...maintainerRoutes] : navigations;

  return (
    <nav className={cn(
      "w-full border-b border-[${COLORS.COOL_GRAY}] bg-[${COLORS.WHITE}]",
      className
    )}>
      <div className="px-4 md:px-20 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="RoomMaster Logo" className="h-12 md:h-16 w-auto" />
              <h1 className={`text-[${COLORS.TEXT}] font-roboto text-xl md:text-2xl font-bold leading-none`}>
                Room Master
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex gap-8 list-none m-0 p-0">
              {combinedRoutes.map((route) => (
                <li key={route.path}>
                  <Link 
                    to={route.url} 
                    className={`text-[${COLORS.TEXT}] font-roboto text-base font-medium leading-none hover:opacity-80`}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex max-w-[150px] justify-end">
            <UserMenu />
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col gap-4 mt-4">
              {combinedRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.url}
                    className={`text-[${COLORS.TEXT}] font-roboto text-base font-medium leading-none hover:opacity-80 block text-center`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pb-4 flex justify-center">
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
