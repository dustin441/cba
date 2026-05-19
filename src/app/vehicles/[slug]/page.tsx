import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, CheckCircle2, Camera } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export async function generateStaticParams() {
  return Object.keys(VEHICLES).map((slug) => ({
    slug,
  }));
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = VEHICLES[slug as keyof typeof VEHICLES];

  if (!vehicle) {
    return <div>Vehicle type not found</div>;
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Simple Hero */}
        <section className="section-padding" style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", overflow: "hidden", marginTop: "80px" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src={vehicle.heroImage}
              alt={vehicle.title}
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "var(--gradient-hero)" }} />
          </div>

          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", marginBottom: "var(--space-lg)", fontSize: "var(--text-sm)", fontWeight: 600, padding: '8px 16px', borderRadius: 'var(--radius-full)' }} className="glass-hover">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 style={{ fontSize: "clamp(var(--text-4xl), 8vw, var(--text-7xl))", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text-main)", marginBottom: "var(--space-md)", maxWidth: "900px" }}>
              {vehicle.title} <span className="text-gradient">Glass Excellence</span>
            </h1>
            <p style={{ fontSize: "var(--text-xl)", color: "var(--text-muted)", maxWidth: "800px", lineHeight: 1.6, marginBottom: "var(--space-xl)" }}>
              {vehicle.description}
            </p>
            <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
              <a href="#contact" className="btn-primary">
                <Phone size={18} /> Get a Free Quote
              </a>
              <a href="#gallery" className="btn-secondary">
                <Camera size={18} /> View Gallery
              </a>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding" style={{ background: "var(--bg-deep)", position: "relative" }}>
          <div className="ambient-orb ambient-orb--cyan" style={{ top: "10%", right: "5%", width: "400px", height: "400px" }} />
          
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "var(--space-4xl)", alignItems: "center" }}>
              <div className="glass" style={{ padding: "var(--space-2xl)", position: "relative", zIndex: 1 }}>
                <div className="section-label">Service Excellence</div>
                <h2 style={{ fontSize: "var(--text-4xl)", fontFamily: "var(--font-display)", color: "var(--text-main)", marginBottom: "var(--space-lg)" }}>
                  Precision Repair for {vehicle.title}
                </h2>
                <p style={{ fontSize: "var(--text-lg)", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "var(--space-xl)" }}>
                  {vehicle.content}
                </p>
                
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                  {["OEM-Quality Glass Guaranteed", "Insurance Network Affiliated", "Lifetime Warranty on Workmanship", "Mobile Service to Your Location"].map((benefit, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-main)", fontSize: "var(--text-base)" }}>
                      <CheckCircle2 size={20} color="var(--accent-primary)" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{ position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", minHeight: "500px", boxShadow: "var(--shadow-elevated)" }}>
                <Image
                  src={vehicle.heroImage}
                  alt={`${vehicle.title} Glass Repair`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, border: "1px solid var(--glass-border)", borderRadius: "var(--radius-xl)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="section-padding" style={{ background: "var(--bg-surface)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "var(--space-4xl)" }}>
              <div className="section-label" style={{ justifyContent: "center" }}>Work Showcase</div>
              <h2 className="section-title" style={{ margin: "0 auto var(--space-md)" }}>Recent {vehicle.title} Projects</h2>
              <p className="section-description" style={{ margin: "0 auto" }}>
                Take a look at our recent craftsmanship. We treat every vehicle with the precision and care it deserves.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-lg)" }}>
              {vehicle.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="glass gallery-item"
                >
                  <Image
                    src={img}
                    alt={`${vehicle.title} service photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="gallery-image"
                  />
                  <div className="gallery-overlay" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}


