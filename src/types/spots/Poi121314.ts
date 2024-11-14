export interface Poi121314 {
  identifiant: string;
  adresse?: string;
  code_postal?: string;
  parcours?: string[];
  url_image?: string;
  copyright_image?: string;
  legende?: string;
  categorie?: string;
  nom_poi?: string;
  date_saisie?: string;
  mot_cle?: string[];
  ville?: string;
  texte_intro?: string;
  texte_description?: string;
  url_site?: string | null;
  fichier_image?: {
    exif_orientation?: number;
    thumbnail?: boolean;
    filename?: string;
    width?: number;
    format?: string;
    etag?: string;
    mimetype?: string;
    id?: string;
    last_synchronized?: string;
    color_summary?: string[];
    height?: number;
    url?: string;
  };
  geo_shape: {
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
    properties?: Record<string, any>;
  };
  geo_point_2d: {
    lon: number;
    lat: number;
  };
  createdAt?: string;
  updatedAt?: string;
}
