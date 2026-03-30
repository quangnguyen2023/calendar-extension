import type { ComponentProps, ReactNode } from 'react';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';

type ComboboxRootProps = Omit<ComponentProps<typeof Combobox>, 'items'>;

export type CustomComboboxProps<TValue extends string | number> = ComboboxRootProps & {
  items: ReadonlyArray<TValue>;
  placeholder?: string;
  emptyMessage?: ReactNode;
  renderItem?: (item: TValue) => ReactNode;
};

export function CustomCombobox<TValue extends string | number>({
  items,
  placeholder = 'Select an option',
  emptyMessage = 'No items found.',
  renderItem,
  ...comboboxProps
}: CustomComboboxProps<TValue>) {
  return (
    <Combobox {...comboboxProps} items={items}>
      <ComboboxInput placeholder={placeholder} className="*:text-sm bg-white" />
      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            const typedItem = item as TValue;
            return (
              <ComboboxItem key={String(typedItem)} value={typedItem}>
                {renderItem ? renderItem(typedItem) : typedItem}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
