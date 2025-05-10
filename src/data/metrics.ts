export interface Metric {
  title: string;
  value: string;
}

export const fetchMetrics = async (): Promise<Metric[]> => {
  try {
    const [ownersResponse, insuranceResponse] = await Promise.all([
      fetch('/api/owners.php'),
      fetch('/api/insurance.php')
    ]);

    const ownersData = await ownersResponse.json();
    const insuranceData = await insuranceResponse.json();

    const totalOwners = ownersData.total;
    const insuredCount = insuranceData.insured;
    const leviesPaidCount = insuranceData.leviesPaid;

    const insuredPercentage = (insuredCount / totalOwners) * 100;
    const leviesPaidPercentage = (leviesPaidCount / totalOwners) * 100;

    return [
      {
        title: "Current Owners",
        value: totalOwners.toString(),
      },
      {
        title: "Insuranced Owners",
        value: `${insuredPercentage.toFixed(1)}%`,
      },
      {
        title: "Owners' Levies Paid",
        value: `${leviesPaidPercentage.toFixed(1)}%`,
      },
    ];
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return [];
  }
};

// Initial metrics state
export const initialMetrics: Metric[] = [
  {
    title: "Current Owners",
    value: "Loading",
  },
  {
    title: "Insuranced Owners",
    value: "Loading",
  },
  {
    title: "Owners' Levies Paid",
    value: "Loading",
  },
];
