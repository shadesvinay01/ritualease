import { Navbar } from "@/components/ritual/Navbar";
import { Footer } from "@/components/ritual/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, TrendingUp, Users } from "lucide-react";

export default function VendorDashboard() {
  // Mock data
  const metrics = [
    { title: "Total Revenue", value: "₹45,231", icon: <DollarSign className="h-4 w-4 text-muted-foreground" />, trend: "+20.1% from last month" },
    { title: "Active Orders", value: "12", icon: <Package className="h-4 w-4 text-muted-foreground" />, trend: "+3 since yesterday" },
    { title: "Completed Orders", value: "148", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />, trend: "+15% from last month" },
    { title: "Customer Rating", value: "4.8/5", icon: <Users className="h-4 w-4 text-muted-foreground" />, trend: "Based on 89 reviews" },
  ];

  const recentOrders = [
    { id: "ORD-101", customer: "Rahul Sharma", service: "Premium Wedding", date: "2023-11-20", status: "Pending", amount: "₹15,000" },
    { id: "ORD-102", customer: "Priya Patel", service: "Basic Puja Setup", date: "2023-11-21", status: "In Progress", amount: "₹5,000" },
    { id: "ORD-103", customer: "Amit Singh", service: "Catering (50 pax)", date: "2023-11-19", status: "Completed", amount: "₹25,000" },
    { id: "ORD-104", customer: "Neha Gupta", service: "Floral Decoration", date: "2023-11-22", status: "Pending", amount: "₹8,500" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {metrics.map((metric, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'Completed' ? 'default' : (order.status === 'In Progress' ? 'secondary' : 'outline')}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
