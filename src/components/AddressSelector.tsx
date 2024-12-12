import React from 'react';
import { MapPin, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

const sampleAddresses: Address[] = [
  {
    id: 1,
    name: "Home",
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    isDefault: true
  },
  {
    id: 2,
    name: "Work",
    street: "456 Market St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103"
  }
];

interface AddressSelectorProps {
  onAddAddress: () => void;
}

const AddressSelector = ({ onAddAddress }: AddressSelectorProps) => {
  const [selectedAddress, setSelectedAddress] = React.useState<Address>(
    sampleAddresses.find(addr => addr.isDefault) || sampleAddresses[0]
  );

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    toast.success(`Delivery address updated to ${address.name}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white/90"
        >
          <MapPin className="w-4 h-4" />
          <span className="hidden sm:inline">{selectedAddress.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] bg-white/95 backdrop-blur-sm">
        {sampleAddresses.map((address) => (
          <DropdownMenuItem
            key={address.id}
            className="flex flex-col items-start py-2 cursor-pointer"
            onClick={() => handleSelectAddress(address)}
          >
            <div className="font-medium">{address.name}</div>
            <div className="text-sm text-gray-500">
              {address.street}, {address.city}, {address.state} {address.zipCode}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="flex items-center gap-2 text-primary cursor-pointer"
          onClick={onAddAddress}
        >
          <Plus className="w-4 h-4" />
          Add New Address
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddressSelector;