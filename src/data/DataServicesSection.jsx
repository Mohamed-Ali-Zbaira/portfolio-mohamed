// Icônes en JSX
export const PropertyManagementIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h6M9 12h6M9 16h6m-3-9h.01M17 14h-2.5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5H17m-1 2H16m0 0h1m0 0h1m-1 2h.01M20 7l-2-2m0 0l-2 2"/>
  </svg>
);

export const PropertyRentalsIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2-2m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-1 2h.01M12 18h.01M18 10h-2M15 10h-2M12 15a3 3 0 100-6 3 3 0 000 6z"/>
  </svg>
);

export const SalesReadyIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M19 11H5m14 0v-4a1 1 0 00-1-1H6a1 1 0 00-1 1v4m14 0v6a1 1 0 01-1 1H6a1 1 0 01-1-1v-6m0 0h14"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17h6M12 14v6"/>
  </svg>
);

export const OffPlanIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-7 0V4h7v2m-7 0h7"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13H9m0 0v6m6-6v6"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9V6"/>
  </svg>
);

export const services = [
  { icon: PropertyManagementIcon, title: "Property Management", description: "We handle tenant screening, lease agreements, maintenance, and reporting to maximize your returns." },
  { icon: PropertyRentalsIcon, title: "Property Rentals", description: "We connect landlords and tenants with seamless rental solutions in Ras Al Khaimah and Dubai." },
  { icon: SalesReadyIcon, title: "Property Sales – Ready Properties", description: "Buy or sell ready properties with expert guidance and access to premium listings." },
  { icon: OffPlanIcon, title: "Off-Plan Property Sales", description: "Invest in future opportunities with exclusive off-plan property solutions and market insights." },
];

export const sectionHeader = {
  title: "Our Services",
  description: "Enjoy expert knowledge and personalized service with Skyline Estates. Explore our wide range of real estate solutions, from property management and rentals to sales of ready and off-plan properties, tailored to meet your needs in Ras Al Khaimah and Dubai.",
};
