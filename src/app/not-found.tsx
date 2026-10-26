import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Arrow, Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center pt-24 pb-16">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow mb-5 text-gold-deep">404</p>
        </Reveal>
        <SplitText
          as="h1"
          text="This page has drifted away."
          italic={["drifted"]}
          className="font-display text-h1 max-w-[12ch]"
        />
        <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
          <Button href="/">
            Return home <Arrow />
          </Button>
          <Button href="/products" variant="outline">
            See the scents
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
