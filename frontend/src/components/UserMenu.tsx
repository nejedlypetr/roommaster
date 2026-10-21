import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/mainButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useStore } from '@/store';
import { getAvatarColor, getInitials } from '@/utils/stringUtils';
import { useNavigate } from 'react-router-dom';
import { EBasicRoutes } from '@/enums/routes';

type TUserMenuProps = {
  className?: string;
}

export const UserMenu = ({ className }: TUserMenuProps) => {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(`${EBasicRoutes.LOGIN}`);
  };

  if (!currentUser) {
    return (
      <Button variant="default" asChild className={className}>
        <Link to="/login">Log In</Link>
      </Button>
    );
  }
  
  const initials = getInitials(currentUser.firstName, currentUser.lastName);
  const bgColor = getAvatarColor(currentUser.firstName, currentUser.lastName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer max-w-[150px]">
            <Avatar className={`cursor-pointer`}>
                <AvatarFallback className={`text-white ${bgColor}`}>{initials}</AvatarFallback>
            </Avatar>
            <p className="text-[${COLORS.TEXT}] font-roboto text-base font-medium leading-none">{currentUser.firstName} {currentUser.lastName}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};