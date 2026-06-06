import { Navbar } from "@/components/ritual/Navbar";
import { Footer } from "@/components/ritual/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Truck, Package, PackageCheck } from "lucide-react";
import placedImg from "@/assets/tracker-placed.png";
import preparingImg from "@/assets/tracker-preparing.png";
import transitImg from "@/assets/tracker-transit.png";
import deliveredImg from "@/assets/tracker-delivered.png";

export default function Tracker() {
  // Mock data for order
  const order = {
    id: "ORD-7829-XJ",
    status: "On the Way",
    progress: 75,
    estimatedDelivery: "Today, 5:30 PM",
    items: ["Premium Wedding Package", "Extra Floral Setup"],
    checkpoints: [
      { id: 1, title: "Order Placed", time: "10:00 AM", completed: true, icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, image: placedImg },
      { id: 2, title: "Confirmed by Vendor", time: "10:30 AM", completed: true, icon: <CheckCircle2 className="h-5 w-5 text-green-500" /> },
      { id: 3, title: "Preparing / Packaging", time: "1:00 PM", completed: true, icon: <Package className="h-5 w-5 text-green-500" />, image: preparingImg },
      { id: 4, title: "On the Way", time: "4:00 PM", completed: false, icon: <Truck className="h-5 w-5 text-primary" />, current: true, image: transitImg },
      { id: 5, title: "Delivered", time: "Pending", completed: false, icon: <PackageCheck className="h-5 w-5 text-muted-foreground" />, image: deliveredImg },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Order Tracker</h1>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <CardTitle className="text-xl">{order.id}</CardTitle>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-semibold">{order.estimatedDelivery}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-primary">{order.status}</span>
                <span className="text-muted-foreground">{order.progress}%</span>
              </div>
              <Progress value={order.progress} className="h-2" />
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {order.checkpoints.map((checkpoint) => (
                <div key={checkpoint.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {checkpoint.icon}
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border shadow-sm ${checkpoint.current ? 'bg-primary/5 border-primary' : 'bg-card'}`}>
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <h3 className={`font-semibold ${checkpoint.completed ? 'text-foreground' : (checkpoint.current ? 'text-primary' : 'text-muted-foreground')}`}>{checkpoint.title}</h3>
                      <time className="text-xs text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1" />{checkpoint.time}</time>
                    </div>
                    {checkpoint.image && (
                      <div className="mt-3 rounded-md overflow-hidden h-32 md:h-40 relative">
                        <img src={checkpoint.image} alt={checkpoint.title} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {order.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
