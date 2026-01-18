import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddButtonProps {
    onClick: () => void;
    label: string;
    className?: string;
    size?: 'sm' | 'lg' | 'default';
}

export function AddButton({ onClick, label, className = '', size = 'lg' }: AddButtonProps) {
    return (
        <div className={`flex justify-center ${className}`}>
            <Button
                variant="outline"
                size={size}
                onClick={onClick}
                className="group hover:bg-primary hover:text-primary-foreground transition-all"
            >
                <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                {label}
            </Button>
        </div>
    );
}
