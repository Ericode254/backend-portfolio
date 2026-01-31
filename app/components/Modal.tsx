import React, { useEffect } from 'react';
import StickyNote from './StickyNote';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    color?: 'yellow' | 'pink' | 'blue' | 'green';
}

export default function Modal({ isOpen, onClose, children, color = 'yellow' }: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content - Reusing Sticky Note aesthetic but larger */}
            <div className="relative z-10 max-w-2xl w-full animate-in fade-in zoom-in-95 duration-200">
                <StickyNote color={color} rotation="rotate-0" className="cursor-default !p-8 md:!p-12 min-h-[300px]">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-full transition-colors"
                    >
                        ✕
                    </button>

                    <div className="mt-2">
                        {children}
                    </div>
                </StickyNote>
            </div>
        </div>
    );
}
