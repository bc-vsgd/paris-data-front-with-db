export interface RegionalInterestHeritage {
  reference_photo?: string;
  photos_oui_non?: "OUI" | "NON";
  departement?: string;
  nom_du_site?: string;
  adresse?: string;
  label?: string;
  commentaires?: string;
  proprietaire_du_bien_et_ou_de_la_structure_mandatee_par_le_proprietaire?: string;
  latitude?: string;
  longitude?: string;
  gps: {
    lon: number;
    lat: number;
  };
  credits_photographiques?: string;
  photo?: {
    thumbnail?: boolean;
    filename?: string;
    format?: string;
    width?: number;
    mimetype?: string;
    id?: string;
    last_synchronized?: Date;
    height?: number;
    color_summary?: string[];
    url?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
