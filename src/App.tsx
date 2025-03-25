import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface Item {
  _id: string;
  name: string;
  description: string;
}

// Fetch function for React Query
const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch("http://localhost:5002/items");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// Items List Component
const ItemsList = () => {
  const { data, error, isLoading } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isLoading) return <p>Loading items...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div>
      <h1>Items from MongoDB</h1>
      <ul>
        {data?.map((item) => (
          <li key={item._id}>{item.name} - {item.description}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/items" element={<ItemsList />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;