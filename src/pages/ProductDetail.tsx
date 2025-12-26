import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Download, Shield, Truck, RefreshCcw, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedDosage, setSelectedDosage] = useState<string | null>(null);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/shop">Browse Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const dosageOptions = ['2mg', '5mg', '10mg', '15mg'];
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to Cart',
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground pt-16">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-accent transition-colors">{product.category}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary/50 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.originalPrice && (
                <Badge className="absolute top-6 left-6 bg-accent text-accent-foreground text-lg px-4 py-2">
                  Save ${(product.originalPrice - product.price).toFixed(0)}
                </Badge>
              )}
              <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-sm font-medium text-accent">{product.purity} Verified Purity</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className={cn(
                    'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                    i === 1 ? 'border-accent' : 'border-transparent hover:border-accent/50'
                  )}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">{product.category}</Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground">{product.dosage} • Lyophilized Powder</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-5 h-5',
                      i < Math.floor(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-border'
                    )}
                  />
                ))}
              </div>
              <span className="text-foreground font-medium">{product.rating}</span>
              <Link to="#reviews" className="text-accent hover:underline">
                {product.reviews} reviews
              </Link>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-display font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Dosage Selection */}
            <div>
              <h4 className="font-medium mb-3">Select Dosage</h4>
              <div className="flex flex-wrap gap-2">
                {dosageOptions.map((dosage) => (
                  <Button
                    key={dosage}
                    variant={selectedDosage === dosage ? 'default' : 'outline'}
                    onClick={() => setSelectedDosage(dosage)}
                    className={cn(
                      'rounded-full',
                      selectedDosage === dosage && 'bg-accent text-accent-foreground'
                    )}
                  >
                    {dosage}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h4 className="font-medium mb-3">Quantity</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-r-none"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-l-none"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-muted-foreground">
                  {product.inStock ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> In Stock
                    </span>
                  ) : (
                    'Out of Stock'
                  )}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="btn-glow flex-1 text-primary-foreground"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto text-accent mb-2" />
                <p className="text-sm font-medium">3rd Party Tested</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto text-accent mb-2" />
                <p className="text-sm font-medium">Fast Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCcw className="w-8 h-8 mx-auto text-accent mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
              </div>
            </div>

            {/* COA Download */}
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="#" download>
                <Download className="w-5 h-5 mr-2" />
                Download Certificate of Analysis (COA)
              </a>
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 gap-8">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent pb-4"
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="usage"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent pb-4"
              >
                Usage & Storage
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent pb-4"
              >
                Shipping Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">Key Benefits</h3>
                  <ul className="space-y-3">
                    {product.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">Specifications</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Purity</dt>
                      <dd className="font-medium">{product.purity}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Dosage</dt>
                      <dd className="font-medium">{product.dosage}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Form</dt>
                      <dd className="font-medium">Lyophilized Powder</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <dt className="text-muted-foreground">Storage</dt>
                      <dd className="font-medium">-20°C to 2-8°C</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="reconstitution">
                  <AccordionTrigger>Reconstitution Guidelines</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Use bacteriostatic water or sterile water for reconstitution. Add water slowly along the vial wall
                      to avoid damaging the peptide. Gently swirl until fully dissolved - do not shake. Calculate your
                      desired concentration based on your research protocol.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="storage">
                  <AccordionTrigger>Storage Instructions</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Store unreconstituted peptides at -20°C for long-term storage or 2-8°C for short-term.
                      Once reconstituted, store at 2-8°C and use within the recommended timeframe (typically 4-8 weeks).
                      Avoid repeated freeze-thaw cycles.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="handling">
                  <AccordionTrigger>Handling Precautions</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      For research use only. Handle with appropriate laboratory safety protocols. Use sterile technique
                      when reconstituting. Keep vials sealed until ready for use. Document lot numbers and storage
                      conditions for research reproducibility.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">Shipping Methods</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Standard Shipping (3-5 days)</p>
                        <p className="text-sm text-muted-foreground">Free on orders over $100</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Express Shipping (1-2 days)</p>
                        <p className="text-sm text-muted-foreground">$15.00 flat rate</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">International Shipping (5-10 days)</p>
                        <p className="text-sm text-muted-foreground">Varies by location</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-4">Temperature Control</h3>
                  <p className="text-muted-foreground">
                    All peptides are shipped with temperature-controlled packaging including insulated containers
                    and cold packs. We monitor weather conditions and may delay shipments during extreme heat to
                    ensure product integrity upon arrival.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group bg-card rounded-xl overflow-hidden card-lift border border-border/50"
                >
                  <div className="aspect-square bg-secondary/50 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground">{p.name}</h3>
                    <p className="text-accent font-semibold">${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
