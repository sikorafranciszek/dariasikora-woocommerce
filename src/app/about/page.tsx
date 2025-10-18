import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'About Me - Daria Sikora | My Primitive Dolls',
  description: 'Learn about Daria Sikora - artist and creator of unique primitive dolls. Passion, tradition and handmade craftsmanship.',
};

export default function AboutPage() {
  const photos = [
    '/about/isa_760xN.1116706524908_lerv.webp',
    '/about/isa_760xN.1116707504874_fzis.webp',
    '/about/isa_760xN.1137258983034_iu29.webp',
    '/about/isa_760xN.1137267428514_aej0.webp',
    '/about/isa_760xN.1162857645078_72w3.webp',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About Me</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-primary/5 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <Image
                  src={photos[0]}
                  alt="Daria Sikora"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="mb-4 sm:mb-6 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-tight">
              Daria Sikora
            </h1>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <span className="px-4 py-2 bg-primary/10 rounded-full text-sm sm:text-base font-medium text-foreground">
                Owner
              </span>
              <span className="px-4 py-2 bg-chart-2/20 rounded-full text-sm sm:text-base font-medium text-foreground">
                Artist
              </span>
              <span className="px-4 py-2 bg-chart-3/20 rounded-full text-sm sm:text-base font-medium text-foreground">
                Dollmaker
              </span>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Artist, art teacher, and passionate creator of unique primitive dolls
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-border/50 shadow-xl">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    My Story
                  </h2>
                </div>

                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    My name is <span className="font-semibold text-foreground">Daria Sikora</span>. I live in Poland.
                    I'm an art teacher by profession but my main activities are involved with my real passion -
                    <span className="font-semibold text-foreground"> designing and creating</span>.
                    It makes me happy, but when my creations bring positive emotions to others I'm in heaven :)
                  </p>

                  <div className="py-6 sm:py-8 my-6 sm:my-8 border-y border-border/50">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-center text-primary">
                      "There are things that can happen only once."
                    </p>
                  </div>

                  <p>
                    I love making different <span className="font-semibold text-foreground">doll animals</span>.
                    I design patterns for all of them and each is unique. Illustrations from old books of fairy tales
                    and photographs are my inspiration.
                  </p>

                  <p>
                    My dolls are <span className="font-semibold text-foreground">hand painted and aged</span> to add
                    more primitive, worn and old appearance. I decorate them with many different techniques like
                    embroidery, painting and other textile techniques.
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-border/50">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Follow My Work
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button asChild variant="outline" size="lg" className="flex-1 group">
                      <Link href="https://www.facebook.com/MyPrimitiveDolls/" target="_blank" rel="noopener noreferrer">
                        <Facebook className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                        Facebook
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="flex-1 group">
                      <Link href="https://www.instagram.com/myprimitivedolls/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                        Instagram
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3 sm:mb-4">
                Creating Agnes
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Watch how my unique dolls come to life
              </p>
            </div>

            <Card className="overflow-hidden shadow-2xl border-0">
              <CardContent className="p-0">
                <div className="relative" style={{ padding: '56.25% 0 0 0' }}>
                  <iframe
                    src="https://player.vimeo.com/video/1128527291?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    title="The process of creating agnes"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3 sm:mb-4">
              Gallery
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Examples of my handmade dolls
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {photos.map((photo, index) => (
              <Card
                key={index}
                className="group overflow-hidden transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 bg-card/50 backdrop-blur"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={photo}
                      alt={`Primitive Doll ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-primary/5 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary text-primary-foreground shadow-2xl border-0 overflow-hidden relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            <CardContent className="relative p-6 sm:p-8 lg:p-12 text-center">
              <h2 className="mb-3 sm:mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                Interested in my work?
              </h2>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
                Discover the full collection of unique primitive dolls in my shop
              </p>
              <Button asChild size="lg" variant="secondary" className="shadow-md hover:shadow-lg">
                <Link href="/products">
                  View Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <script src="https://player.vimeo.com/api/player.js" async />
    </div>
  );
}
