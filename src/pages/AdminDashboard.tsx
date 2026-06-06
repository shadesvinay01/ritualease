import { Navbar } from "@/components/ritual/Navbar";
import { Footer } from "@/components/ritual/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Store, FileText } from "lucide-react";

export default function AdminDashboard() {
  const metrics = [
    { title: "Total Users", value: "2,405", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Vendors", value: "142", icon: <Store className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Orders", value: "3,892", icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Revenue", value: "₹1,245,000", icon: <BarChart3 className="h-4 w-4 text-muted-foreground" /> },
  ];

  const vendorData = [
    { id: "V-001", name: "Divine Events", status: "Active", rating: "4.9", orders: 120 },
    { id: "V-002", name: "Shree Decorators", status: "Active", rating: "4.7", orders: 85 },
    { id: "V-003", name: "Pandit Ji Services", status: "Pending", rating: "-", orders: 0 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard (RitualEase)</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {metrics.map((metric, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="vendors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="orders">All Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vendors">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Total Orders</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendorData.map((v) => (
                      <TableRow key={v.id}>
                        <TableCell className="font-medium">{v.id}</TableCell>
                        <TableCell>{v.name}</TableCell>
                        <TableCell>{v.orders}</TableCell>
                        <TableCell>{v.rating}</TableCell>
                        <TableCell>
                          <Badge variant={v.status === 'Active' ? 'default' : 'secondary'}>
                            {v.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Customer management tools will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Global Order Log</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">All system orders will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
