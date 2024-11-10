export interface HouseOfFamous {
  code_postal?: number;
  region?: string;
  departement?: string;
  pays?: string;
  nom?: string;
  nom_usuel?: string;
  entite_juridique_de_rattachement?: string;
  adresse_complete?: string;
  adresse_de_l_entree_du_public?: string;
  numero_et_libelle_de_la_voie?: string;
  complement_d_adresse?: string;
  commune?: string;
  autres_communes?: string;
  code_insee?: string;
  code_insee_departement?: string;
  code_insee_region?: number;
  latitude?: string;
  longitude?: string;
  site_internet_et_autres_liens?: string[];
  types?: string[];
  annee_d_obtention?: string;
  description?: string;
  auteur_nom_de_l_illustre?: string;
  identifiant_deps?: string;
  identifiant_origine?: string;
  accessible_au_public?: string[];
  conditions_d_ouverture?: string[];
  date_de_creation?: string;
  date_de_maj?: string;
  coordonnees_geographiques: {
    lon: number;
    lat: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
