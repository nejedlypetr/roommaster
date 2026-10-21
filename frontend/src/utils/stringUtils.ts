
export const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

const AVATAR_COLORS = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
] as const;

export const getAvatarColor = (firstName: string, lastName: string): string => {
  const fullName = `${firstName}${lastName}`;
  const hash = fullName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

export const formatTime = (time: number): string => {
  return `${Math.floor(time/4)}:${(time % 4) * 15 || '00'}`;
};

export const formatTimeWithPad = (time: number): string => {
  const hours = Math.floor(time / 4).toString().padStart(2, '0'); // Add leading zero to hours
  const minutes = ((time % 4) * 15).toString().padStart(2, '0'); // Add leading zero to minutes
  return `${hours}:${minutes}`;
};

export const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 4 + Math.floor(minutes / 15);
};
