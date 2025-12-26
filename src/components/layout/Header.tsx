import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Science', href: '/science' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const showTransparent = isHomePage && !isScrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        showTransparent
          ? 'bg-transparent py-5'
          : 'bg-card/95 backdrop-blur-xl shadow-card py-3'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <span className={cn(
              'font-display text-2xl font-bold tracking-tight transition-colors duration-300',
              showTransparent ? 'text-primary-foreground' : 'text-primary'
            )}>
              ASCEND
            </span>
            <span className="font-display text-2xl font-bold text-accent">RX</span>
            <ChevronUp className="absolute -top-1 -right-4 w-4 h-4 text-accent transition-all duration-300 group-hover:translate-y-[-2px]" />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors duration-300 underline-animate',
                showTransparent
                  ? 'text-primary-foreground/90 hover:text-primary-foreground'
                  : 'text-foreground hover:text-accent',
                location.pathname === link.href && 'text-accent'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'transition-colors duration-300',
              showTransparent
                ? 'text-primary-foreground hover:text-accent hover:bg-primary-foreground/10'
                : 'text-foreground hover:text-accent hover:bg-accent/10'
            )}
          >
            <Search className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'hidden sm:flex transition-colors duration-300',
              showTransparent
                ? 'text-primary-foreground hover:text-accent hover:bg-primary-foreground/10'
                : 'text-foreground hover:text-accent hover:bg-accent/10'
            )}
          >
            <User className="w-5 h-5" />
          </Button>

          <Link to="/shop">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'relative transition-colors duration-300',
                showTransparent
                  ? 'text-primary-foreground hover:text-accent hover:bg-primary-foreground/10'
                  : 'text-foreground hover:text-accent hover:bg-accent/10'
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'md:hidden transition-colors duration-300',
              showTransparent
                ? 'text-primary-foreground hover:bg-primary-foreground/10'
                : 'text-foreground hover:bg-accent/10'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground text-lg font-medium py-2 border-b border-border hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
