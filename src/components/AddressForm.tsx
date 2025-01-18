import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface AddressFormProps {
  onComplete?: () => void;
}

const AddressForm = ({ onComplete }: AddressFormProps) => {
  const { addAddress } = useApp();
  const [formData, setFormData] = React.useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(value => !value)) {
      toast.error('Please fill in all fields');
      return;
    }

    addAddress(formData);
    toast.success('Address added successfully');
    onComplete?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Address Name</label>
        <Input
          placeholder="e.g., Home, Work"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Street Address</label>
        <Input
          placeholder="Street address"
          value={formData.street}
          onChange={e => setFormData(prev => ({ ...prev, street: e.target.value }))}
        />
      </div>
      <div>
        <label className="text-sm font-medium">City</label>
        <Input
          placeholder="City"
          value={formData.city}
          onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
        />
      </div>
      <div>
        <label className="text-sm font-medium">State</label>
        <Input
          placeholder="State"
          value={formData.state}
          onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))}
        />
      </div>
      <div>
        <label className="text-sm font-medium">ZIP Code</label>
        <Input
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChange={e => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
        />
      </div>
      <Button type="submit" className="w-full">Add Address</Button>
    </form>
  );
};

export default AddressForm;