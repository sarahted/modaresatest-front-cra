import { QueryClient, QueryClientProvider } from "react-query";
import { SchedulerModa } from "./SchedulerModa";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SchedulerModa/>
    </QueryClientProvider>
  );
}

export default App;
