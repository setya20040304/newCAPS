import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
        <Globe className="w-5 h-5" />
        <span className="uppercase">{language}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'bg-accent' : ''}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('id')}
          className={language === 'id' ? 'bg-accent' : ''}
        >
          Bahasa Indonesia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
