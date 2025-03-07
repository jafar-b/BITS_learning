import { create } from "zustand";
import { Company } from "../models/Company";

type companiesStoreType = {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  storeCompanyInContext: (company: Company) => void;
  updateCompany:(company:Company)=>void;
};

export const useCompaniesStore = create<companiesStoreType>((set) => ({
  companies: [],
  setCompanies: (companiesList) => set({ companies: companiesList }),
  storeCompanyInContext: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
  updateCompany:(editedCompany)=>set((state)=>({companies:state.companies.map((item)=>item.id===editedCompany.id? editedCompany:item)}))
}));
