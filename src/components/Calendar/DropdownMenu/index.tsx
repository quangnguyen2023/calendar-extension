import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import QuickViewByDate from '../QuickViewByDate';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

export type MenuOption = {
  id: string;
  label: string;
};

const CalendarDropdownMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-30 hover:opacity-100"
          onClick={() => setOpen(true)}
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="">
        <div className="p-2">
          <QuickViewByDate onClose={() => setOpen(false)} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CalendarDropdownMenu;
