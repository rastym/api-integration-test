import PrivateRoute from "@/components/ui/privateRoute";
import SearchByDomainTable from "./table";

// Define the type for a vulnerability record
export type VulnerabilityRecord = {
  id: string;
  stealer_type: string;
  computer_information: {
    ip: string;
    malware_path: string;
    infection_date: string;
    username: string;
  };
  credentials: {
    root_domain: string;
    creds: {
      username: string;
      credential_category: string;
    }[];
  }[];
};

const SearchByDomain = () => {
  return (
    <PrivateRoute>
      <SearchByDomainTable />
    </PrivateRoute>
  );
};

export default SearchByDomain;
