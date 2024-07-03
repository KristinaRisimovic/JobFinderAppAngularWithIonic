export interface Job {
    id: string;
    title: string;
    companyName: string;
    location: string;
    workMode: string;
    activeUntil: Date;
    description: string;
    requiredTechnologies: string;
    status: 'Active' | 'Archived';
    userId:string;
    iconName: string;
  }