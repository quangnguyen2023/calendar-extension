import { lazy, Suspense, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const QuickViewByDate = lazy(() => import('./QuickViewByDate'));

export default function CalendarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical width={18} height={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <PopoverHeader>
          <PopoverTitle>Date view</PopoverTitle>
          <PopoverDescription className="text-xs">
            See lunar and solar dates at a glance
          </PopoverDescription>
        </PopoverHeader>

        <div className="pt-4 w-70">
          <Suspense fallback={null}>
            <QuickViewByDate onClose={() => setOpen(false)} />
          </Suspense>
        </div>
      </PopoverContent>
    </Popover>
  );
}
