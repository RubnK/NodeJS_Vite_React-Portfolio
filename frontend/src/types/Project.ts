export type Project = {
    id: number;
    title: string;
    description: string;
    repo?: string; // Repository GitHub (optionnel)
    link?: string; // Lien de démonstration (optionnel)
    stack: string[]; // tableau de technologies
    created_at: string;
    updated_at: string;
  };
  