"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { VideoPlayerModal } from '@/components/ui/video-player-modal';
import logo from '@/app/assets/logo.png';

export function HeroSection() {
  const videoDemoUrl = "/comercial.mp4";
  return (
    <section className="py-20 md:py-8">
      <div className="container mx-auto px-4 text-center">
        <Image src={logo} alt="MyFitGuide Logo" width={200} height={200} className="mx-auto mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold text-primary">MyFitGuide</h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          La aplicación diseñada para ayudarte a alcanzar tus metas de fitness y bienestar de manera personalizada y sencilla.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <VideoPlayerModal videoUrl={videoDemoUrl}>
            <Button size="lg" variant="default">
               ▷ Ver Demo
            </Button>
          </VideoPlayerModal>
        </div>
      </div>
    </section>
  );
}