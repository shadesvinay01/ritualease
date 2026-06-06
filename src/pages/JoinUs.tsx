import { Navbar } from "@/components/ritual/Navbar";
import { Footer } from "@/components/ritual/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function JoinUs() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We will get back to you within 48 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Partner with RitualEase</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Grow your business by joining India's premier platform for spiritual services and event management. We bring the customers, you provide the service.
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Vendor Application</CardTitle>
                <CardDescription>Fill out the form below and our team will contact you to discuss partnership opportunities.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Rahul" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Sharma" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company / Business Name</Label>
                    <Input id="companyName" placeholder="Divine Events Co." required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="rahul@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Primary Service Offered</Label>
                    <select id="serviceType" className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Select a service...</option>
                      <option value="catering">Catering</option>
                      <option value="decoration">Decoration & Florist</option>
                      <option value="pandit">Pandit / Purohit Services</option>
                      <option value="venue">Venue Provider</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us more about your business</Label>
                    <Textarea 
                      id="message" 
                      placeholder="How long have you been in business? What areas do you serve?" 
                      className="min-h-[100px]" 
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full">Submit Application</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
